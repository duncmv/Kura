'use client';
import React, { useEffect, useState } from 'react';
import { button, input, a, h2, h3, form, formContainer, container, card} from '../../../components/styleVar';
import { getCurrentUser, signup } from '../../../api/auth';
import { useRouter } from 'next/navigation';
import Header from '../../../components/header';
import Link from 'next/link';
import crypto from 'crypto';
import axios from 'axios';
// @ is an alias to /src


export default function RegisterPage() {
    const pureCard = card + ' cursor-pointer';
    const chosen = pureCard + ' border-blue-500';
    const [type, setType] = useState('individual');
    const [card1, setCard1] = useState(chosen);
    const [card2, setCard2] = useState(pureCard);
    const [showContent, setShowContent] = useState(false);
    const [showInitialContent, setShowInitialContent] = useState(true);
    const [districts, setDistricts] = useState(Array());
    let distList = [];
    const router = useRouter();

    // Get districts
    useEffect(() => {
        axios.get('http://18.207.112.170/api/v1/countries/000daded-1a7c-4ca7-8f16-6aa4026fa0e7/districts')
            .then((res) => {
                setDistricts(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    
    distList = districts.map((dist) => {
        return <option key={dist.id} value={dist.id}>{dist.name}</option>
    })


    // Check if user is already logged in
    getCurrentUser().then(() => {
        router.push("/");
    }).catch(() => {
        // Do nothing
    });

    const handleType = (type: string) => {
        setType(type);
        if (type === 'individual') {
            setCard1(chosen);
            setCard2(pureCard);
        } else {
            setCard2(chosen);
            setCard1(pureCard);
        }
        setShowContent(false);
        setShowInitialContent(true); // Reset initial content when type changes
    };

    const handleNext = () => {
        setShowContent(true);
        setShowInitialContent(false); // Hide initial content when "Next" button is clicked
    }

    return (
        <>
            <Header/>
            <div className={container}>
                {showInitialContent && ( // Render initial content if showInitialContent is true
                    <>
                        <h2 className={h2 + ' min-[1024px]:pl-[14.5vw]'}>Choose account type</h2>
                        <div className={formContainer}>
                            <div className={card1}
                                onClick={() => handleType('individual')}
                            >
                                <h2 className={h3}>Individual</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi facilis doloribus non eaque temporibus adipisci at. Minima maiores tempora enim. Animi deleniti laboriosam unde provident perspiciatis nostrum voluptatum tempore tenetur!</p>
                            </div>
                            <div className={card2}
                                onClick={() => handleType('institution')}
                            >
                                <h2 className={h3}>Institution</h2>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias recusandae vel soluta alias eveniet vitae hic temporibus dignissimos rem aliquid totam unde illum, fuga accusantium dolorum minima quo labore amet!</p>
                            </div>
                        </div>
                        <button className={button + ' w-1/2 sm:w-1/4 m-auto max-w-[200px]'} onClick={handleNext}>Next</button>
                        <p className='text-center mt-4'>
                            Already have an account? <Link className={a} href='/login'>Login</Link>
                        </p>
                    </>
                )}
                {showContent && ( // Render content if showContent is true
                    <>
                        {type === 'individual' ? <Individual distList={distList} setShowContent={setShowContent} setShowInitialContent={setShowInitialContent} /> : <Institution distList={distList} setShowContent={setShowContent} setShowInitialContent={setShowInitialContent} />}
                    </>
                )}
            </div>
        </>
    );
}

function Individual(props: { distList: JSX.Element[], setShowContent: React.Dispatch<React.SetStateAction<boolean>>, setShowInitialContent: React.Dispatch<React.SetStateAction<boolean>> 
}) {
    const [selectedFiles, setSelectedFiles] = useState(Object.create({}));
    const [info, setInfo] = useState(Object.create({}));
    const router = useRouter();

    // Get stored data from sessionStorage
    useEffect(() => {
        if (sessionStorage.getItem('info')) {
            setInfo(JSON.parse(sessionStorage.getItem('info') as string));
        } else {
            setInfo({
                email: '',
                password: '',
                confirm: '',
                district_id: '',
            });
        }
    }, []);

    // Handle file change
    const handleFileChange = (event: { target: { name: any; files: any; }; }) => {
        // Get the file and store in state
        const files = event.target.files;
        const key = event.target.name;
        const selectedFilesShadow = selectedFiles;
        selectedFilesShadow[key] = files[0];
        setSelectedFiles(selectedFilesShadow);

        // Check if file is an image
        const isImage = (file: File) => {
            return file.type?.startsWith('image/');
        };

        if (!isImage(files[0])) {
            alert(`${files[0].name} is not an image file`);
        } else {
            alert(`Selected ${files[0].name}`);

            setInfo((prevInfo: any) => ({
                ...prevInfo,
                [key]: files[0]
            }));
        }
    };

    // Handle input change
    const handleInfoChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        setInfo((prevInfo: any) => ({
            ...prevInfo,
            [name]: value
        }));

        // Store data in sessionStorage
        const newInfo = { ...info, [name]: value };
        const { password, confirm, ...infoWithoutPassword } = newInfo;
        sessionStorage.setItem('info', JSON.stringify(infoWithoutPassword));
    }

    // Handle form submission
    const handleNext = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (info.password !== info.confirm) {
            alert('Passwords do not match');
            return;
        } else if (!info.password) {
            alert('Password must be at least 8 characters');
            return;
        } else if (currentForm > 0 && 'id_snippet' in info === false) {
            alert('Please upload your ID card');
            return
        }

        // Submit form
        if (currentForm + 1 > 1) {
            sessionStorage.removeItem('info');
            const { confirm, ...restInfo } = info;
            restInfo.password = crypto.createHash('md5').update(restInfo.password).digest('hex');
            restInfo.email = restInfo.email.toLowerCase();
            
            const { id_snippet, ...rest} = restInfo;
            const out = new FormData();
            out.append('json', new Blob([JSON.stringify({...rest, 'class': 'user'})], {
                type: 'application/json'
            }));
            out.append('id_snippet', new Blob([id_snippet], {
                type: 'image/*'
            }));
            const res = await signup(out);
            if (res) {
                router.push("/");
            }
        } else {
            setCurrentForm(currentForm + 1);
        }
    }

    const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (currentForm - 1 < 0) {
            props.setShowContent(false);
            props.setShowInitialContent(true);
        }
        setCurrentForm(currentForm - 1);
    }

    const form1 = <>
        <h3 className={h3}>Account Information</h3>
            <p className='pb-10'>All fields are required</p>
            <div className=''>
                <label htmlFor='email'>Email</label>
                <input required type="email" id='email' name='email' className={input} value={info.email} onChange={handleInfoChange} autoComplete="email" />
            </div>
            <div className='min-[989px]:w-[49%] min-[989px]:inline-block'>
                <label htmlFor='password'>Password</label>
                <input required type="password" id='password' name='password' className={input} value={info.password} onChange={handleInfoChange} autoComplete="new-password" />
            </div>
            <div className='min-[989px]:w-[49%] min-[989px]:float-right min-[989px]:inline-block'>
                <label htmlFor='confirm'>Confirm</label>
                <input required type="password" id='confirm' name='confirm' className={input} value={info.confirm} onChange={handleInfoChange} autoComplete="new-password" />
            </div>
            <div className='pt-10'>
                <button className={button + ' float-right relative'} >
                    Register
                    <div className='absolute top-[-25px] left-[65px] min-[640px]:left-[75px] w-[15px] h-[15px] rounded-full border'></div>
                    <div className='absolute top-[-25px] left-[40px] min-[640px]:left-[50px] w-[15px] h-[15px] rounded-full border bg-blue-300'></div>
                </button>
                <button className={button } onClick={handleBack}>
                    Back
                </button>
            </div>
        </>

    const form2 = <>
        <h3 className={h3}>Personal Information</h3>
            <p className='pb-10'>All fields are required</p>
            <div className=''>
                <label htmlFor='name'>Name</label>
                <input required type="text" id='name' name='name' className={input} onChange={handleInfoChange} autoComplete="name" />
            </div>
            <div className='min-[989px]:w-[49%] min-[989px]:inline-block '>
                <label htmlFor='district'>district</label>
                <select required id='district' className={input} name='district_id' value={info.district_id} onChange={handleInfoChange} autoComplete="address-level1">
                    <option value=''>Select district</option>
                    {props.distList}
                </select>
            </div>
            <div className='min-[989px]:w-[49%] min-[989px]:float-right min-[989px]:inline-block'>
                <label htmlFor='idCard' className='block mb-4'>ID Card</label>
                <div className='relative'>
                <input required type="file" id='idCard' name='id_snippet' className={input} style={{ position: 'absolute', left: '-9999px' }} 
                onChange={handleFileChange} accept="image/*" />
                    <label htmlFor='idCard' className={button + ' w-full h-full text-center cursor-pointer'}>Upload ID Card</label>
                </div>
            </div>
            <div className='pt-10'>
                <button className={button + ' float-right relative'} >
                    Register
                    <div className='absolute top-[-25px] left-[65px] min-[640px]:left-[75px] w-[15px] h-[15px] rounded-full border bg-blue-300'></div>
                    <div className='absolute top-[-25px] left-[40px] min-[640px]:left-[50px] w-[15px] h-[15px] rounded-full border bg-blue-300'></div>
                </button>
                <button className={button } onClick={handleBack}>
                    Back
                </button>
            </div>
        </>


    const forms = [form1, form2];
    const [currentForm, setCurrentForm] = useState(0);
    return (
        <div className={container}>
            <h2 className={h2 + ' mx-auto'}>Create Individual Account</h2>
            <div className='flex flex-col gap-5 py-2 md:flex-row justify-center'>
                <form className={form} onSubmit={handleNext}>
                    {forms[currentForm]}
                </form>
            </div>
        </div>
    );
}


function Institution(props: { distList: JSX.Element[], setShowContent: React.Dispatch<React.SetStateAction<boolean>>, setShowInitialContent: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [selectedFiles, setSelectedFiles] = useState(Object.create({}));
    const [info, setInfo] = useState(Object.create({}));
    const [entities, setEntities] = useState(Array());
    const [industries, setIndustries] = useState(Array());
    let industryList = [];
    let entityList = [];
    const router = useRouter();

    useEffect(() => {
        // Get stored data from sessionStorage
        if (sessionStorage.getItem('institutionInfo')) {
            setInfo(JSON.parse(sessionStorage.getItem('institutionInfo') as string));
        } else {
            setInfo({
                class: 'institution',
                email: '',
                name: '',
                password: '',
                registration_number: '',
                legal_entity_id: '',
                industry_id: '',
                phone: '',
                contactEmail: '',
                district_id: '',
                postal: ''
            });
        }

        // Get entities and industries
        axios.get('http://18.207.112.170/api/v1/entities')
        .then((res) => {
            setEntities(res.data);
        })

        axios.get('http://18.207.112.170/api/v1/industries')
        .then((res) => {
            setIndustries(res.data);
        })
    }, []);

    entityList = entities.map((entity) => {
        return <option key={entity.id} value={entity.id}>{entity.name}</option>
    });

    industryList = industries.map((industry) => {
        return <option key={industry.id} value={industry.id}>{industry.name}</option>
    });


    const handleInfoChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
    setInfo((prevInfo: any) => ({
        ...prevInfo,
        [name]: value
    }));

    const newInfo = { ...info, [name]: value };
    const { password, confirm, ...infoWithoutPassword } = newInfo;
    sessionStorage.setItem('institutionInfo', JSON.stringify(infoWithoutPassword));
    }

    const handleNext = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (info.password !== info.confirm) {
            alert('Passwords do not match');
            return;
        } else if (info.password.length < 8) {
            alert('Password must be at least 8 characters');
            return;
        }

        if (currentForm + 1 > 2) {
            sessionStorage.removeItem('institutionInfo');
            const { confirm, ...restInfo } = info;
            restInfo.password = crypto.createHash('md5').update(restInfo.password).digest('hex');
            restInfo.email = restInfo.email.toLowerCase();

            const out = new FormData();
            out.append('json', new Blob([JSON.stringify(restInfo)], {
                type: 'application/json'
            }));
            const res = await signup(out);
            if (res) {
                router.push("/");
            }
        } else {
            setCurrentForm(currentForm + 1);
        }
    }

    const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        if (currentForm - 1 < 0) {
            props.setShowContent(false);
            props.setShowInitialContent(true);
        }
        setCurrentForm(currentForm - 1);
    }

    const form1 = <>
        <h3 className={h3}>Account Information</h3>
        <p className='pb-10'>All fields are required</p>
        <div className='min-[989px]:w-[49%] min-[989px]:inline-block'>
            <label htmlFor='email'>Email</label>
            <input required type="email" id='email' name='email' className={input} value={info.email} onChange={handleInfoChange} autoComplete="email" />
        </div>
        <div className='min-[989px]:w-[49%] min-[989px]:float-right min-[989px]:inline-block'>
            <label htmlFor='name'>Company Name</label>
            <input required type="text" id='name' name='name' className={input} value={info.name} onChange={handleInfoChange} autoComplete="organization" />
        </div>
        <div className='min-[989px]:w-[49%] min-[989px]:inline-block'>
            <label htmlFor='password'>Password</label>
            <input required type="password" id='password' name='password' className={input} value={info.password} onChange={handleInfoChange} autoComplete="new-password" />
        </div>
        <div className='min-[989px]:w-[49%] min-[989px]:float-right min-[989px]:inline-block'>
            <label htmlFor='confirm'>Confirm Password</label>
            <input required type="password" id='confirm' name='confirm' className={input} value={info.confirm} onChange={handleInfoChange} autoComplete="new-password" />
        </div>
        <div className='pt-10'>
            <button className={button + ' float-right relative'} >
                Next
                <div className='absolute top-[-25px] left-[65px] min-[640px]:left-[75px] w-[15px] h-[15px] rounded-full border'></div>
                <div className='absolute top-[-25px] left-[40px] min-[640px]:left-[50px] w-[15px] h-[15px] rounded-full border'></div>
                <div className='absolute top-[-25px] left-[15px] min-[640px]:left-[25px] w-[15px] h-[15px] rounded-full border bg-blue-300'></div>
            </button>
            <button className={button } onClick={handleBack}>
                back
            </button>
        </div>
    </>;
    
    const form2 = <>
        <h3 className={h3}>Legal Details</h3>
        <p className='pb-10'>All fields are required</p>
        <div>
            <label htmlFor='registration_number'>Registration Number</label>
            <input type="text" id='registration_number' name='registration_number' className={input} value={info.registration_number} onChange={handleInfoChange} />
        </div>
        <div>
            <label htmlFor='legal_entity_id'>Legal Entity</label>
            <select required id='legal_entity_id' name='legal_entity_id' className={input} value={info.legal_entity_id} onChange={handleInfoChange}>
                <option value=''>Select Legal Entity</option>
                {entityList}
            </select>
        </div>
        <div>
            <label htmlFor='industry_id'>Industry Classification</label>
            <select required id='industry_id' name='industry_id' className={input} value={info.industry_id} onChange={handleInfoChange}>
                <option value=''>Select Industry Classification</option>
                {industryList}
            </select>
        </div>
        <div className='pt-10'>
            <button className={button + ' float-right relative'} >
                Next
                <div className='absolute top-[-25px] left-[65px] min-[640px]:left-[75px] w-[15px] h-[15px] rounded-full border'></div>
                <div className='absolute top-[-25px] left-[40px] min-[640px]:left-[50px] w-[15px] h-[15px] rounded-full border bg-blue-400'></div>
                <div className='absolute top-[-25px] left-[15px] min-[640px]:left-[25px] w-[15px] h-[15px] rounded-full border bg-blue-300'></div>
            </button>
            <button className={button } onClick={handleBack}>
                back
            </button>
        </div>
    </>;

    const form3 = <>
        <h3 className={h3}>Contact Information</h3>
        <p className='pb-10'>All fields are <b>optional</b></p>
        <div className='min-[989px]:w-[49%] min-[989px]:inline-block'>
            <label htmlFor='phone'>Phone Number</label>
            <input type="tel" id='phone' name='phone' className={input} value={info.phone} onChange={handleInfoChange} autoComplete="tel" />
        </div>
        <div className='min-[989px]:w-[49%] min-[989px]:float-right min-[989px]:inline-block'>
            <label htmlFor='contactEmail'>Email</label>
            <input type="email" id='contactEmail' name='contactEmail' className={input} value={info.contactEmail} onChange={handleInfoChange} autoComplete="email" />
        </div>
        <div className='min-[989px]:w-[49%] min-[989px]:inline-block'>
            <label htmlFor='district'>district</label>
            <select id='district' name='district_id' className={input} value={info.district} onChange={handleInfoChange}>
                <option value=''>Select district</option>
                {props.distList}
            </select>
        </div>
        <div className='min-[989px]:w-[49%] min-[989px]:float-right min-[989px]:inline-block'>
            <label htmlFor='postal'>Postal Code</label>
            <input type="tel" id='postal' name='postal' className={input} value={info.postal} onChange={handleInfoChange} autoComplete="postal-code" />
        </div>
        <div className='pt-10'>
            <button className={button + ' float-right relative'} >
                Next
                <div className='absolute top-[-25px] left-[65px] min-[640px]:left-[75px] w-[15px] h-[15px] rounded-full border bg-blue-500'></div>
                <div className='absolute top-[-25px] left-[40px] min-[640px]:left-[50px] w-[15px] h-[15px] rounded-full border bg-blue-400'></div>
                <div className='absolute top-[-25px] left-[15px] min-[640px]:left-[25px] w-[15px] h-[15px] rounded-full border bg-blue-300'></div>
            </button>
            <button className={button } onClick={handleBack}>
                back
            </button>
        </div>
    </>;

    const forms = [form1, form2, form3];
    const [currentForm, setCurrentForm] = useState(0);

    return (
        <div className={container}>
            <h2 className={h2 + ' mx-auto'}>Create Institution Account</h2>
            <div className='flex flex-col gap-5 py-2 md:flex-row justify-center'>
                <form className={form} onSubmit={handleNext}>
                    {forms[currentForm]}
                </form>
            </div>
        </div>
    );
}