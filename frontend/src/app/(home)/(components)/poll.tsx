import { h3, h2 } from '../../../components/styleVar';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import Question from './question';
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';

export default function Poll ({ pollData } : { pollData?: any })  {
    console.log(pollData);
    const time = getTime(pollData.created_at);
    const [inst, setInst] = useState(Object);
    useEffect(() => {
        axios.get('http://18.207.112.170/api/v1/institutions/' + pollData.institution_id).then((res) => {
            setInst(res.data);
        });
    }, []);

    console.log(inst);
    return (
        <div className='w-[100%]'>
            <div className='--poll-wrapper-- bg-white sm:w-[70%] w-[95%] my-5 mx-auto py-4  flex flex-col items-center justify-around bg-gray-200 min-h-[200px]' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <div className='--poll-header-- flex flex-row justify-between items-center w-[90%] relative'>
                    <div className="--publisher-- basis-3/4">
                        <button className='w-10 h-10 inline-block float-left border rounded-full mr-4 ' style={{backgroundImage: 'url(/user-place-holder.png)', backgroundPosition: 'center', backgroundSize: 'cover'}}></button>
                        <h3 className={h3}>{inst.name}</h3>
                        <p className="--time--">{time}</p>
                    </div>
                    <button className="--settings--">
                        <FontAwesomeIcon icon={faEllipsisH} />
                    </button>
                    <div className={pollData.id + "--poll-dropdown-- text-left absolute right-2 bottom-0 hidden"}>
                        <div className="origin-top-right absolute top-[-20px] right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">   
                                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                Sign out
                                </button>
                                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                Sign out
                                </button>
                                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                Sign out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="--poll-body-- w-[88%]">
                    <div className="--body-header-- my-2">
                        <h2 className={h2}>{pollData.title}</h2>
                        <p className="--description-- overflow-ellipsis overflow-hidden max-h-[75px] line-clamp-3">{pollData.description}</p>
                    </div>
                    <div className="--questions--">
                        {pollData.questions.map((question: any) => {
                            return <Question questionData={question} key={question.id} />;
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

function getTime (date: string) {
    const now = new Date();
    const then = new Date(date);
    const diff = now.getTime() - then.getTime();
    const diffInMinutes = Math.floor(diff / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInMonths / 12);
    if (diffInMinutes === 1) {
        return `${diffInMinutes} minute ago`;
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes} minutes ago`;
    } else if (diffInHours === 1) {
        return `${diffInHours} hour ago`;
    } else if (diffInHours < 24) {
        return `${diffInHours} hours ago`;
    } else if (diffInDays === 1) {
        return `${diffInDays} day ago`;
    } else if (diffInDays < 30) {
        return `${diffInDays} days ago`;
    } else if (diffInMonths === 1) {
        return `${diffInMonths} month ago`;
    } else if (diffInMonths < 12) {
        return `${diffInMonths} months ago`;
    } else if (diffInYears === 1) {
        return `${diffInYears} year ago`;
    } else {
        return `${diffInYears} years ago`;
    }
}