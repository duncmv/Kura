'use client';
import React, { useEffect, useState } from 'react';
import { button, input, a, h2, h3, form, formContainer, container, card} from '../../../components/styleVar';
import { getCurrentUser } from '../../../api/auth';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const pureCard = card + ' cursor-pointer';
    const chosen = pureCard + ' border-blue-500';
    const [type, setType] = useState('individual');
    const [card1, setCard1] = useState(chosen);
    const [card2, setCard2] = useState(pureCard);
    const [showContent, setShowContent] = useState(false);
    const [showInitialContent, setShowInitialContent] = useState(true);
    const router = useRouter();

    // Check if user is already logged in
    getCurrentUser().then(() => {
        router.push("/");
    }).catch(() => {
        console.log('Not logged in');
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
        <div className={container + ' py-20'}>
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
                </>
            )}
            {showContent && ( // Render content if showContent is true
                <>
                    {type === 'individual' ? <Individual setShowContent={setShowContent} setShowInitialContent={setShowInitialContent} /> : <Institution setShowContent={setShowContent} setShowInitialContent={setShowInitialContent} />}
                </>
            )}
        </div>
    );
}

function Individual(props: { setShowContent: React.Dispatch<React.SetStateAction<boolean>>, setShowInitialContent: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [selectedFiles, setSelectedFiles] = useState(Object.create({}));
    const [info, setInfo] = useState(Object.create({}));

    useEffect(() => {
        if (sessionStorage.getItem('info')) {
            setInfo(JSON.parse(sessionStorage.getItem('info') as string));
        } else {
            setInfo({
                fname: '',
                email: '',
                date: '',
                district: '',
                city: '',
                nationalID: ''
            });
        }
    }, []);

    const handleFileChange = (event: { target: { id: any; files: any; }; }) => {
        const files = event.target.files;
        const key = event.target.id;
        const selectedFilesShadow = selectedFiles;
        selectedFilesShadow[key] = files[0];
        setSelectedFiles(selectedFilesShadow);
        alert(`Selected ${files[0].name}`);
    };

    const handleInfoChange = (event: { target: { id: any; value: any; }; }) => {
        const { id, value } = event.target;
    setInfo((prevInfo: any) => ({
        ...prevInfo,
        [id]: value
    }));
        
    const { password, confirm, ...infoWithoutPassword } = info;
    sessionStorage.setItem('info', JSON.stringify(infoWithoutPassword));
    }

    const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (info.password !== info.confirm) {
            alert('Passwords do not match');
            return;
        } else if (info.password.length < 8) {
            alert('Password must be at least 8 characters');
            return;
        }

        if (currentForm + 1 > 2) {
            sessionStorage.removeItem('info');
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
            <label htmlFor='fname'>Full Name (as in id card)</label>
            <input required type="name" id='fname' className={input} value={info.fname} onChange={handleInfoChange} autoComplete="name" />
        </div>
        <div className='min-[989px]:w-[49%] min-[989px]:float-right min-[989px]:inline-block'>
            <label htmlFor='email'>Email</label>
            <input required type="email" id='email' className={input} value={info.email} onChange={handleInfoChange} autoComplete="email" />
        </div>
        <div className='min-[989px]:w-[49%] min-[989px]:inline-block'>
            <label htmlFor='password'>Password</label>
            <input required type="password" id='password' className={input} value={info.password} onChange={handleInfoChange} autoComplete="new-password" />
        </div>
        <div className='min-[989px]:w-[49%] min-[989px]:float-right min-[989px]:inline-block'>
            <label htmlFor='confirm'>Confirm Password</label>
            <input required type="password" id='confirm' className={input} value={info.confirm} onChange={handleInfoChange} autoComplete="new-password" />
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
        <h3 className={h3}>Personal Info</h3>
        <p className='pb-10'>All fields are required</p>
        <div>
            <label htmlFor='date'>Date of birth</label>
            <input required type="date" id='date' value={info.date} className={input} onChange={handleInfoChange} autoComplete="bday" />
        </div>
        <div className='min-[989px]:w-[49%] min-[989px]:inline-block'>
            <label htmlFor='district'>district</label>
            <select required id='district' className={input} value={info.district} onChange={handleInfoChange} autoComplete="address-level1">
                <option value=''>Select district</option>
                <option value='district1'>District 1</option>
                <option value='district2'>District 2</option>
                <option value='district3'>District 3</option>
            </select>
        </div>
        <div className='min-[989px]:w-[49%] min-[989px]:float-right min-[989px]:inline-block'>
                <label htmlFor='city'>City</label>
                <input required type="text" id='city' className={input} value={info.city} onChange={handleInfoChange} autoComplete="address-level2" />
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
        <h3 className={h3 + ' pb-10'}>Personal Info</h3>
        <div className='w-[76%] inline-block'>
            <label htmlFor='nationalID'>*National ID Number</label>
            <input required type="text" id='nationalID' className={input} value={info.nationalID} onChange={handleInfoChange} />
        </div>
        <div className='w-[19%] float-right inline-block mb-10'>
            <label htmlFor='profilePicture' className='block mb-4'>Picture</label>
            <div className='relative'>
                <input type="file" id='profilePicture' className={input + ' hidden'}
                onChange={handleFileChange} />
                <label htmlFor='profilePicture' className={button + ' w-full h-full text-center cursor-pointer'}>+</label>
            </div>
        </div>
        <div className='w-full'>
            <label htmlFor='idCard' className='block mb-4'>*ID Card</label>
            <div className='relative'>
            <input required type="file" id='idCard' className={input} style={{ position: 'absolute', left: '-9999px' }} 
            onChange={handleFileChange} />
                <label htmlFor='idCard' className={button + ' w-full h-full text-center cursor-pointer'}>Upload ID Card</label>
            </div>
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
            <h2 className={h2 + ' mx-auto'}>Create Individual Account</h2>
            <div className='flex flex-col gap-5 py-2 md:flex-row justify-center'>
                <form className={form} onSubmit={handleNext}>
                    {forms[currentForm]}
                </form>
            </div>
        </div>
    );
}


function Institution(props: { setShowContent: React.Dispatch<React.SetStateAction<boolean>>, setShowInitialContent: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [selectedFiles, setSelectedFiles] = useState(Object.create({}));
    const [info, setInfo] = useState(Object.create({}));

    useEffect(() => {
        if (sessionStorage.getItem('institutionInfo')) {
            setInfo(JSON.parse(sessionStorage.getItem('institutionInfo') as string));
        } else {
            setInfo({
                email: '',
                name: '',
                regNumber: '',
                legalEntity: '',
                industryClass: '',
                phone: '',
                contactEmail: '',
                district: '',
                postal: ''
            });
        }
    }, []);

    const handleInfoChange = (event: { target: { id: any; value: any; }; }) => {
        const { id, value } = event.target;
    setInfo((prevInfo: any) => ({
        ...prevInfo,
        [id]: value
    }));

    const { password, confirm, ...infoWithoutPassword } = info;
    sessionStorage.setItem('institutionInfo', JSON.stringify(infoWithoutPassword));
    }

    const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
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
            <input required type="email" id='email' className={input} value={info.email} onChange={handleInfoChange} autoComplete="email" />
        </div>
        <div className='min-[989px]:w-[49%] min-[989px]:float-right min-[989px]:inline-block'>
            <label htmlFor='name'>Company Name</label>
            <input required type="text" id='name' className={input} value={info.name} onChange={handleInfoChange} autoComplete="organization" />
        </div>
        <div className='min-[989px]:w-[49%] min-[989px]:inline-block'>
            <label htmlFor='password'>Password</label>
            <input required type="password" id='password' className={input} value={info.password} onChange={handleInfoChange} autoComplete="new-password" />
        </div>
        <div className='min-[989px]:w-[49%] min-[989px]:float-right min-[989px]:inline-block'>
            <label htmlFor='confirm'>Confirm Password</label>
            <input required type="password" id='confirm' className={input} value={info.confirm} onChange={handleInfoChange} autoComplete="new-password" />
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
        <p className='pb-10'>All required fields are marked with *</p>
        <div>
            <label htmlFor='regNumber'>Registration Number</label>
            <input type="text" id='regNumber' className={input} value={info.regNumber} onChange={handleInfoChange} />
        </div>
        <div>
            <label htmlFor='legalEntity'>* Legal Entity</label>
            <select required id='legalEntity' className={input} value={info.legalEntity} onChange={handleInfoChange}>
                <option value=''>Select Legal Entity</option>
                <option value='entity1'>entity 1</option>
                <option value='entity2'>entity 2</option>
                <option value='entity3'>entity 3</option>
            </select>
        </div>
        <div>
            <label htmlFor='industryClass'>* Industry Classification</label>
            <select required id='industryClass' className={input} value={info.industryClass} onChange={handleInfoChange}>
                <option value=''>Select Industry Classification</option>
                <option value='class1'>class 1</option>
                <option value='class2'>class 2</option>
                <option value='class3'>class 3</option>
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
            <input type="tel" id='phone' className={input} value={info.phone} onChange={handleInfoChange} autoComplete="tel" />
        </div>
        <div className='min-[989px]:w-[49%] min-[989px]:float-right min-[989px]:inline-block'>
            <label htmlFor='contactEmail'>Email</label>
            <input type="email" id='contactEmail' className={input} value={info.contactEmail} onChange={handleInfoChange} autoComplete="email" />
        </div>
        <div className='min-[989px]:w-[49%] min-[989px]:inline-block'>
            <label htmlFor='district'>district</label>
            <select id='district' className={input} value={info.district} onChange={handleInfoChange}>
                <option value=''>Select district</option>
                <option value='district1'>District 1</option>
                <option value='district2'>District 2</option>
                <option value='district3'>District 3</option>
            </select>
        </div>
        <div className='min-[989px]:w-[49%] min-[989px]:float-right min-[989px]:inline-block'>
            <label htmlFor='postal'>Postal Code</label>
            <input type="tel" id='postal' className={input} value={info.postal} onChange={handleInfoChange} autoComplete="postal-code" />
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