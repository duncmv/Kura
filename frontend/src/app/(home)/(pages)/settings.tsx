import { button } from "@/components/styleVar";
import { faPen, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import crypto from 'crypto'
import { logout } from "@/api/auth";

/**
 * Component for managing user settings.
 * @param userData - User data object.
 */
export default function Settings ({userData}: {userData: any}) {
    const [districts, setDistricts] = useState([]);
    const isInst = userData.__class__ === 'Institution';
    const [sure, setSure] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [wrong, setWrong] = useState(false);
    const [done, setDone] = useState(false);
    const data = { ...userData };

    useEffect(() => {
        // Fetch districts data from API
        axios.get('http://18.207.112.170/api/v1/countries/000daded-1a7c-4ca7-8f16-6aa4026fa0e7/districts')
        .then((response) => {
            setDistricts(response.data)
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];

        if (!file?.type?.startsWith('image')) { alert('Please select an image'); return; }

        const picElement = document.getElementsByClassName('--pic--')[0] as HTMLElement;
        picElement.style.backgroundImage = `url(${URL.createObjectURL(file)})`;

        data.pic = file;
    };

    const handleChange = (e: any) => {
        let {name, value} = e.target;
        if (!data.hasOwnProperty('confirm')) {data.confirm = data.password};
        if (['old_password', 'confirm', 'password'].includes(name)) {
            value = crypto.createHash('md5').update(value).digest('hex');
        }
        data[name] = value;
    };

    const handleSumbit = () => {
        if (data.old_password === userData.password) {
            if (deleting) {
                const path = isInst ? `http://18.207.112.170/api/v1/institutions/${userData.id}` : `http://18.207.112.170/api/v1/users/${userData.id}`;
                // Delete user account
                axios.delete(path)
                .then((res) => {
                    sessionStorage.removeItem('user');
                    document.location.reload();
                }).catch((err) => {
                    console.log(err);
                })
            } else {
                const passwordInput = document.getElementsByName('password')[0] as HTMLInputElement;
                const confirmInput = document.getElementsByName('confirm')[0] as HTMLInputElement;
                const {pic, ...rest} = data;  
                const out = new FormData();
                if (passwordInput.value !== confirmInput.value) { alert('Passwords do not match'); return; }
                if (passwordInput.value.length < 8) { alert('Password Should be more than 8 character'); return; }
                out.append('json', new Blob([JSON.stringify({...rest, 'class': data.__class__.toLowerCase()})], {
                    type: 'application/json'
                }));
                out.append('pic', new Blob([pic], {
                    type: 'image/*'
                }));

                // Update user information
                axios.post(`http://18.207.112.170/api/v1/update/${userData.id}`, out)
                .then((res) => {
                    setDone(true);
                    setTimeout(() => {
                        setDone(false);
                    }, 2000);
                    document.location.reload();
                }).catch((err) => {
                    console.log(err);
                });
            }
        } else {
            setWrong(true);
            setTimeout(() => {
                setWrong(false);
            }, 2000);
        }
    };

    const disabledStyle = 'border border-gray-300 rounded-md px-2 py-1 w-[60%] bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent';
    const enabledStyle = 'border border-gray-300 rounded-md px-2 py-1 w-[60%] bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent';
    return (
        <div className='flex flex-col items-center w-full pb-[90px]'>
            <h2 className='font-bold mt-2'>Your Information</h2>
            {!isInst && (
                <div className=' --pic-- relative my-4 w-28 h-28 rounded-full bg-white' style={{backgroundImage: `url(${userData.pic ?? '/user-place-holder.svg'})`, backgroundPosition: 'center', backgroundSize: 'cover'}}>
                    <label htmlFor="fileInput" className='absolute top-1 right-1 text-sm cursor-pointer bg-white w-5 h-5 border-black rounded-full'>
                        <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                    </label>
                    <input onChange={handleFileChange} id="fileInput" type='file' accept="image/*" className="hidden"/>
                </div>
            )}
            <div className='flex flex-col justify-center items-around w-[80%] mt-10'>
                {!isInst && (
                <>
                    <div className='flex flex-row justify-between mb-4'>
                        <p className='text-gray-600'>First Name:</p>
                        <input type='text' name="first_name" value={userData.first_name} readOnly className={disabledStyle} />
                    </div>
                    <div className='flex flex-row justify-between mb-4'>
                        <p className='text-gray-600'>Middle Name:</p>
                        <input type='text' name="middle_name" value={userData.middle_name} readOnly className={disabledStyle} />
                    </div>
                    <div className='flex flex-row justify-between mb-4'>
                        <p className='text-gray-600'>Last Name:</p>
                        <input type='text' name="last_name" value={userData.last_name} readOnly className={disabledStyle} />
                    </div>
                    <div className='flex flex-row justify-between mb-4'>
                        <p className='text-gray-600'>Birth Date:</p>
                        <input type='date' name="date_of_birth" value={formatDate(userData.date_of_birth)} readOnly className={disabledStyle} />
                    </div>
                    <div className='flex flex-row justify-between mb-4'>
                        <p className='text-gray-600'>District:</p>
                        <select onChange={handleChange} id='district' name="district_id" autoComplete="address-level1" className={enabledStyle} defaultValue={userData.district_id}>
                            {districts?.map((district: any) => (
                                <option key={district.id} value={district.id}>{district.name}</option>
                            ))}
                        </select>
                    </div>
                </>
                )}
                <div className='flex flex-row justify-between mb-4'>
                    <p className='text-gray-600'>Phone:</p>
                    <input onChange={handleChange} name="mobile_number" type='tel' defaultValue={userData.mobile_number} className={enabledStyle} />
                </div>
                <div className='flex flex-row justify-between mb-4'>
                    <p className='text-gray-600'>Email:</p>
                    <input onChange={handleChange} name='email' type='email' defaultValue={userData.email} className={enabledStyle} />
                </div>
                <div className='flex flex-row justify-between mb-4'>
                    <p className='text-gray-600'>Password:</p>
                    <input onChange={handleChange} name="password" type='password' defaultValue='        ' className={enabledStyle} />
                </div>
                <div className='flex flex-row justify-between mb-4'>
                    <p className='text-gray-600'>Confirm:</p>
                    <input onChange={handleChange} name="confirm" type='password' defaultValue='        ' className={enabledStyle} />
                </div>
                <button onClick={() => {document.getElementsByClassName('--enter-old-pass-popup--')[0].classList.remove('hidden')}} className={button + ' w-[250px] mx-auto'}>Save</button>
                <button onClick={() => logout()} className={button + ' w-[250px] mx-auto'}>Log Out</button>
                {!sure ? (
                <button onClick={(() => {setSure(true); setTimeout(() => {
                    setSure(false);
                }, 2000)})} className={button + ' w-[250px] mx-auto bg-red-200 hover:bg-red-300 focus:ring-red-200'}>Delete My Account</button>
                ): (
                <button onClick={() => {setDeleting(true); document.getElementsByClassName('--enter-old-pass-popup--')[0].classList.remove('hidden')}} className={button + ' w-[250px] mx-auto bg-red-200 hover:bg-red-300 focus:ring-red-200'}>Sure <FontAwesomeIcon icon={faQuestionCircle}></FontAwesomeIcon></button>
                )}
            </div>
            <div onClick={(e) => {setDeleting(false); e.currentTarget.classList.add('hidden'); (document.getElementsByName('old_password')[0] as HTMLInputElement).value = ''}} className='--enter-old-pass-popup-- hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50'>
                <div onClick={(e) => e.stopPropagation()} className=' bg-white p-2 max-w-[500px] w-[90%] h-[200px] flex  flex-col justify-evenly items-center rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <h2>Please Enter Your Password</h2>
                    <input onChange={handleChange} type='password' name='old_password' className='border border-gray-300 rounded-md px-2 py-1 w-[60%] bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent' />
                    <button className={!wrong ? button + ' w-[250px] mx-auto' : button + ' w-[250px] mx-auto hover:bg-red-300 bg-red-300 focus:ring-red-200'} onClick={handleSumbit} onBlur={() => (document.getElementsByName('old_password')[0] as HTMLInputElement).value = ''}>{wrong ? 'Wrong' : done ? 'Done' : 'Confirm'}</button>
                </div>
            </div>
        </div>
    );
}

/**
 * Formats a date string to 'YYYY-MM-DD' format.
 * @param dateString - Date string to be formatted.
 * @returns Formatted date string.
 */
const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
};