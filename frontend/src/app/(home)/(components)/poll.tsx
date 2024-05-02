import { h3, h2, button } from '../../../components/styleVar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import Question from './question';
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import Link from 'next/link';

export default function Poll ({ pollData, isInst} : { pollData?: any, isInst: boolean})  {
    const time = getTime(pollData.created_at);
    const userId = JSON.parse(sessionStorage.getItem('user')!) as string;
    const [inst, setInst] = useState(Object);
    const [data, setData] = useState(Array);
    const [marked, setMarked] = useState(false);
    const date = new Date(pollData.created_at);
    const formattedDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short' }).format(date);

    useEffect(() => {
        axios.get('http://18.207.112.170/api/v1/institutions/' + pollData.institution.id).then((res) => {
            setInst(res.data);
        });

        if (!isInst) {
            axios.get(`http://18.207.112.170/api/v1/user/${userId}/tags`)
            .then ((res) => {
                const bookmarks = res.data.map((bookmark: any) => bookmark.id);
                if (bookmarks.includes(pollData.id)) {
                    setMarked(true);
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }, []);

    function handleDelete () {
        if (pollData.institution.id !== userId) { alert("idk how u got here, but u can't delete this post cuz it isn't yours!"); return; }
        if (confirm("Are you sure you want to delete this poll?")) {
            axios.delete('http://18.207.112.170/api/v1/polls/' + pollData.id)
            .then((res) => {
                alert('Successfully deleted');
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    function handleBookmark () {
        if (!marked) {
            axios.post(`http://18.207.112.170/api/v1/user/${userId}/tags/${pollData.id}`)
            .then((res) => {
                setMarked(true);
            }).catch((err) => {
                console.log(err);
            })
        } else {
            axios.delete(`http://18.207.112.170/api/v1/user/${userId}/tags/${pollData.id}`)
            .then((res) => {
                setMarked(false);
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    function handleVote () {
        const answers = Object.values(data);

        if (!answers) { return; }

        for (let answer of answers) {
            axios.post(`http://18.207.112.170/api/v1/users/${userId}/${answer}/`)
            .then((res) => {
                console.log('Successfully voted');
            })
            .catch((err) => {
                console.log(err);
            });
        }        
    }

    return (
        <div className='w-[100%]'>
            <div className='--poll-wrapper-- bg-white sm:w-[70%] w-[95%] my-5 mx-auto py-4  flex flex-col items-center justify-around bg-gray-200 min-h-[200px]' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <div className='--poll-header-- flex flex-row justify-between items-center w-[90%] relative'>
                    <div className="--publisher-- basis-3/4">
                        <Link href={'/inst/' + pollData.institution.id}>
                            <span className='w-10 h-10 inline-block float-left border rounded-full mr-4 ' style={{backgroundImage: 'url(/inst-place-holder.png)', backgroundPosition: 'center', backgroundSize: 'cover'}}></span>
                            <h3 className={h3}>{inst.name}</h3>
                        </Link>
                        <p className="--time--" title={formattedDate}>{time}</p>
                    </div>
                    {((!isInst) || (isInst && userId === pollData.institution.id)) && (
                        <button className="--settings--" onClick={() => document.getElementsByClassName(pollData.id + '--poll-dropdown--')[0].classList.toggle('hidden')}>
                            <FontAwesomeIcon icon={faEllipsisH} />
                        </button>
                    )}
                    <div className={pollData.id + "--poll-dropdown-- text-left absolute right-2 bottom-0 hidden"}>
                        <div className="origin-top-right absolute top-[-20px] right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                {isInst && (
                                    <>
                                        <button title='Stop taking votes' className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                            Disable
                                        </button>
                                        <button onClick={handleDelete} title='Delete the poll' className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-100 hover:text-gray-900" role="menuitem">
                                            Delete
                                        </button>
                                    </>
                                )}
                                {!isInst && !marked && (
                                    <>
                                        <button onClick={handleBookmark} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                            Bookmark
                                        </button>
                                    </>
                                )}
                                {!isInst && marked && (
                                    <>
                                        <button onClick={handleBookmark} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                            Remove Bookmark
                                        </button>
                                    </>
                                )}
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
                        {pollData.questions?.map((question: any) => {
                            return <Question questionData={question} isInst={isInst} setData={setData} key={question.id} />;
                        })}
                    </div>
                    {!isInst &&  userId && (
                        <div className="--poll-footer--">
                            <button onClick={handleVote} className={button + ' float-right'}>
                                Vote
                            </button>
                        </div>
                    )}
                    {!userId && (
                        <p className='text-center text-red-400 text-bold'>Login or Signup to vote</p>
                    )}
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