import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Settings ({userData}: {userData: any}) {
    console.log(Object.keys(userData))
    const [districts, setDistricts] = useState([]);
    const isInst = userData.__class__ === 'Institution';

    useEffect(() => {
        axios.get('http://18.207.112.170/api/v1/countries/000daded-1a7c-4ca7-8f16-6aa4026fa0e7/districts')
        .then((response) => {
            setDistricts(response.data)
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const disabledStyle = 'border border-gray-300 rounded-md px-2 py-1 w-[60%] bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent cursor-not-allowed';
    const enabledStyle = 'border border-gray-300 rounded-md px-2 py-1 w-[60%] bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent';
    return (
        <div className='flex flex-col items-center w-full pb-[90px]'>
            <h2 className='font-bold mt-2'>Your Information</h2>
            {!isInst && (
                <div className='relative my-4 w-28 h-28 rounded-full bg-white' style={{backgroundImage: `url(${userData.pic ?? '/user-place-holder.svg'})`, backgroundPosition: 'center', backgroundSize: 'cover'}}>
                    <label htmlFor="fileInput" className='absolute top-1 right-1 text-sm cursor-pointer bg-white w-5 h-5 border-black rounded-full'>
                        <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                    </label>
                    <input id="fileInput" type='file' accept="image/*" className="hidden"/>
                </div>
            )}
                <div className='flex flex-col justify-center items-around w-[80%] mt-10'>
                    {!isInst && (
                        <>
                            <div className='flex flex-row justify-between mb-4'>
                                <p className='text-gray-600'>First Name:</p>
                                <input type='text' value={userData.first_name} readOnly className={disabledStyle} />
                            </div>
                            <div className='flex flex-row justify-between mb-4'>
                                <p className='text-gray-600'>Middle Name:</p>
                                <input type='text' value={userData.middle_name} readOnly className={disabledStyle} />
                            </div>
                            <div className='flex flex-row justify-between mb-4'>
                                <p className='text-gray-600'>Last Name:</p>
                                <input type='text' value={userData.last_name} readOnly className={disabledStyle} />
                            </div>
                            <div className='flex flex-row justify-between mb-4'>
                                <p className='text-gray-600'>Birth Date:</p>
                                <input type='date' value={formatDate(userData.date_of_birth)} readOnly className={disabledStyle} />
                            </div>
                            <div className='flex flex-row justify-between mb-4'>
                                <p className='text-gray-600'>District:</p>
                                <select id='district' autoComplete="address-level1" className={enabledStyle} defaultValue={userData.district_id}>
                                    {districts?.map((district: any) => (
                                        <option key={district.id} value={district.id}>{district.name}</option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )}
                    <div className='flex flex-row justify-between mb-4'>
                        <p className='text-gray-600'>Phone:</p>
                        <input type='tel' defaultValue={userData.mobile_number} className={enabledStyle} />
                    </div>
                    <div className='flex flex-row justify-between mb-4'>
                        <p className='text-gray-600'>Email:</p>
                        <input type='email' defaultValue={userData.email} className={enabledStyle} />
                    </div>
                    <div className='flex flex-row justify-between mb-4'>
                        <p className='text-gray-600'>Password:</p>
                        <input type='password' defaultValue='        ' className={enabledStyle} />
                    </div>
                    <div className='flex flex-row justify-between mb-4'>
                        <p className='text-gray-600'>Confirm:</p>
                        <input type='password' defaultValue='        ' className={enabledStyle} />
                    </div>
                </div>
        </div>
    );
}


const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
};
