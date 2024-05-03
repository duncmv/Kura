'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import Header from '../../../../components/header';
import { getUserData, getUserById } from '../../../../api/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEllipsisH, faPen, faSave } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Poll from '../../(components)/poll';

export default function InstProfile({ params }: { params: { instId: string } }) {
    const instId = params.instId;
    const userData = getUserData();
    const [instData, setInstData] = useState(Object.create(null));
    const [polls, setPolls] = useState(Array);
    const [pollsNum, setPollsNum] = useState(0);
    const same = userData?.id === instId;
    const [editing, setEditing] = useState(false);

    async function fetchData() {
        if (same) {
            setInstData(userData);
        } else {
            const data = await getUserById(instId);
            setInstData(data);
        }
    }

    useEffect(() => {
        fetchData();
    }, [same, instId]);

    useEffect(() => {
        document.title = instData?.name ?? 'Institution';
        document.title += ' | Kura';
    
        axios.get(`http://18.207.112.170/api/v1/institutions/${instId}/polls`)
        .then((res) => {
            setPollsNum(res.data.length);
            const pollPromises = res.data.map((id: any) =>
                axios.get(`http://18.207.112.170/api/v1/polls/${id}`)
                    .then((res) => res.data)
                    .catch((e) => {
                        console.log(e);
                        return null;
                    })
            );
            Promise.all(pollPromises)
                .then((pollData) => {
                    setPolls(pollData.filter(Boolean)); // Filter out null values
                });
        }).catch((e) => {
            console.log(e);
        });
    }, [instData]);

    function getSince(): ReactNode {
        let date: any;
        if (instData?.date_of_establishment) {
            date = new Date(instData.date_of_establishment);
        } else if (instData?.created_at) {
            date = new Date(instData.created_at);
        }
        if (!date) {
            return 'Unknown';
        } else {
            return date.getFullYear();
        }
    }

    function handleSave() {
        axios.put(`http://18.207.112.170/api/v1/institutions/${instId}`, instData)
        .then ((res) => {
            setEditing(false);
            alert('Saved!');
        }).catch((e) => {
            console.log(instData)
            console.log(e);
        });
    }

    return (
        <>
            <Header userData={userData} />
            <div onClick={() => {document.getElementsByClassName('--dropdown--')[0]?.classList.add('hidden');}} 
                className='--profile-wrapper-- relative gap-20 flex flex-col items-center bg-gray-100 overflow-y-scroll scrollbar-hide'>
                <div className='--profile-header-- w-[100vw] h-[150px] relative'>
                    <div className='--profile-header-- bg-gray-300 h-[100%] w-[100vw]'></div>
                    <div className='--profile-header-content-- flex flex-row gap-5 items-center absolute bottom-[-50px] left-[20px]'>
                        <div className='--profile-header-img-- bg-gray-300 rounded-full w-20 h-20' style={{ backgroundImage: `url(${instData?.pic ?? '/inst-place-holder.svg'})`, backgroundPosition: 'center', backgroundSize: 'cover' }}></div>
                        {!editing && 
                            <h1 className='--profile-header-name-- text-2xl font-bold mt-2'>{instData?.name ?? 'Institution'}
                                <p className='font-normal text-sm'>Since {getSince()}</p>
                            </h1>
                        }
                        {editing && 
                            <input type='text' className='--profile-header-name-- text-2xl px-2 w-[150px] border border-gray-500 font-bold mt-2 bg-transparent' value={instData?.name} onChange={(e) => setInstData({ ...instData, name: e.target.value })} />
                        }
                    </div>
                    {same && !editing &&
                        <button onClick={() => {setEditing(true)}} className="--settings-- absolute right-[20px] bottom-[-35px]">
                            <FontAwesomeIcon icon={faPen} />
                        </button>
                    }
                    {same && editing &&
                        <button onClick={handleSave} className="--settings-- absolute right-[20px] bottom-[-35px]">
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    }
                    <p className='absolute bottom-[-75px] left-[40px]'>Polls: {pollsNum}</p>
                </div>
                <div className='--profile-body-- w-[100%] basis:3/4 min-h-[51vh] mb-20'>
                    {pollsNum === 0 && same && <p className='text-center'>No polls available, Start by creating one</p>}
                    {pollsNum === 0 && !same && <p className='text-center'>No polls available</p>}
                    {polls.map((poll: any) => (
                        <Poll key={poll.id} pollData={poll} isInst={same}/>
                    ))}
                </div>
            </div>
        </>
    );
}
