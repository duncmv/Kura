import { h3, h2, button } from '../../../components/styleVar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircleRight, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import Question from './question';
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import Link from 'next/link';

/**
 * Renders a poll component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {any} props.pollData - The data for the poll.
 * @param {boolean} props.isInst - Indicates whether the user is an institution.
 * @returns {JSX.Element} The rendered Poll component.
 */
export default function Poll({ pollData, isInst } : { pollData?: any, isInst: boolean}): JSX.Element  {
    const time = getTime(pollData.created_at); // Get the formatted time since the poll was created (for the time element in the header)
    const userId = JSON.parse(sessionStorage.getItem('user')!) as string; // Get the user ID from session storage
    const [inst, setInst] = useState(Object); // State for storing institution data
    const [data, setData] = useState(Array); // State for storing user's selected answers
    const [marked, setMarked] = useState(false); // State for tracking if the poll is bookmarked
    const date = new Date(pollData.created_at); // Convert the poll's creation date to a Date object
    const userLocale = navigator.language || 'en-US';  // use the user's locale, or 'en-US' if it's not available
    const formattedDate = new Intl.DateTimeFormat(userLocale, { dateStyle: 'full', timeStyle: 'short' }).format(date); // Format the date according to the user's locale (for the title attribute of the time element)
    const [showIndicator, setShowIndicator] = useState(false); // State for showing a voting indicator
    const [leftQuestions, setLeftQuestions] = useState(pollData.questions.length); // State for tracking the number of unanswered questions
    const [answered, setAnswered] = useState<any[]>([]); // State for storing the user's answered questions
    const [loading, setLoading] = useState(true); // State for tracking the loading state of the poll
    const [deleted, setDeleted] = useState(false); // State for tracking if the poll is deleted

    useEffect(() => {
        // Fetch institution data
        axios.get('http://18.207.112.170/api/v1/institutions/' + pollData.institution.id).then((res) => {
            setInst(res.data);
        });

        if (!isInst) {
            // Check if the poll is bookmarked by the user
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

        // Get the user's old answers and check them on the poll
        if (!isInst) {
            const pollAnswers = pollData.questions.map((question: any) => question.answers.map((answer: any) => answer.id)).flat();
            axios.get(`http://18.207.112.170/api/v1/users/${userId}/choices`)
            .then ((res) => {
                const answers = res.data;
                setAnswered(answers.filter((answer: any) => pollAnswers.includes(answer)));
                setLoading(false);
            })
        } else { setLoading(false); }
    }, []);

    useEffect (() => {
        // Update the number of unanswered questions when the page mounts
        setLeftQuestions(pollData.questions.length - answered.length);
    }, [answered]);

    function handleDelete () {
        // Delete the poll if the user is the owner
        if (pollData.institution.id !== userId) { alert("idk how u got here, but u can't delete this post cuz it isn't yours!"); return; }
        if (confirm("Are you sure you want to delete this poll?")) {
            axios.delete('http://18.207.112.170/api/v1/polls/' + pollData.id)
            .then((res) => {
                setDeleted(true);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    function handleBookmark () {
        // Toggle the bookmark status of the poll
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
            // Submit the user's selected answers
            axios.post(`http://18.207.112.170/api/v1/users/${userId}/${answer}/`)
            .then((res) => {
                setShowIndicator(true);
                setLeftQuestions(leftQuestions - answers.length);
                setData([]);
                setTimeout(() => {
                    setShowIndicator(false);
                }, 1000);
            })
            .catch((err) => {
                console.log(err);
            });
        }        
    }

    return (
        <div className='w-[100%]'>
            <div className={( deleted ? 'hidden ' : 'bg-white ') + '--poll-wrapper-- sm:w-[70%] w-[95%] my-5 mx-auto py-4  flex flex-col items-center justify-around bg-gray-200 min-h-[200px]'} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <div className='--poll-header-- flex flex-row justify-between items-center w-[90%] relative'>
                    <div className="--publisher-- basis-3/4">
                        <Link href={'/inst/' + pollData.institution.id}>
                            <span className='w-10 h-10 inline-block float-left border rounded-full mr-4 ' style={{backgroundImage: `url(${inst.pic ? inst.pic : '/inst-place-holder.svg'})`, backgroundPosition: 'center', backgroundSize: 'cover'}}></span>
                            <h3 className={h3}>{inst.name}</h3>
                        </Link>
                        <p className="--time--" title={formattedDate}>{time}</p>
                    </div>
                    {((!isInst) || (isInst && userId === pollData.institution.id)) && (
                        <button className="--settings--" onClick={(e) => {document.getElementsByClassName(pollData.id + '--poll-dropdown--')[0].classList.toggle('hidden'); e.stopPropagation()}}>
                            <FontAwesomeIcon icon={faEllipsisH} />
                        </button>
                    )}
                    <div onClick={(e) => e.stopPropagation()} className={pollData.id + "--poll-dropdown-- -poll-dropdown- text-left absolute right-2 bottom-0 hidden"}>
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
                    {loading && (
                        <>
                            <div className="--question-- p-6 sm:w-[90%] mx-auto my-2 flex flex-col justify-center items-center">
                                <div className="--options-- w-[100%] sm:w-[90%] mx-auto flex flex-col justify-center items-center">
                                    <div className="w-full sm:w-[90%] mx-auto">
                                    <h3 className={h3 + " mb-2 animate-pulse text-xl font-medium text-neutral-900 w-[90%] mx-auto my-2 border py-3 px-2"}>
                                        <span className="block h-4 animate-pulse bg-neutral-400 mb-2"></span>
                                    </h3>
                                    <h3 className={h3 + " mb-2 animate-pulse text-xl font-medium text-neutral-900 w-[90%] mx-auto my-2 border py-3 px-2"}>
                                        <span className="block h-4 animate-pulse bg-neutral-400 mb-2"></span>
                                    </h3>
                                    <h3 className={h3 + " mb-2 animate-pulse text-xl font-medium text-neutral-900 w-[90%] mx-auto my-2 border py-3 px-2"}>
                                        <span className="block h-4 animate-pulse bg-neutral-400 mb-2"></span>
                                    </h3>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    {!loading && (
                        <div className="--questions--">
                            {pollData.questions?.map((question: any) => {
                                return <Question questionData={question} isInst={isInst} answered={answered} setData={setData} key={question.id} />;
                            })}
                        </div>
                    )}
                    {!isInst &&  userId && leftQuestions !== 0 && (
                        <div className="--poll-footer--">
                            {!showIndicator ? (
                                <button onClick={handleVote} className={button + ' float-right'}>
                                    Vote
                                </button>
                            ) : (
                                <button onClick={handleVote} className={button + ' float-right bg-blue-200'}>
                                    &nbsp;<FontAwesomeIcon icon={faCheckCircle} className='text-blue-500' />&nbsp;&nbsp;
                                </button>
                            )}
                        </div>
                    )}
                    {!userId && (
                        <p className='text-center text-red-400 text-bold'>Login or Signup to vote</p>
                    )}
                    {leftQuestions === 0 && (
                        <p className='text-center text-blue-400 text-bold'>Voted</p>
                    )}
                </div>
            </div>
        </div>
    )
}

function getTime(date: string) {
    // Calculate the time difference between the current time and the given date
    const now = new Date();
    const then = new Date(date);
    const userOffset = then.getTimezoneOffset();
    const diff = now.getTime() - then.getTime() + userOffset * 60 * 1000; // Add user's offset to compensate for the time difference
    const diffInMinutes = Math.floor(diff / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInMonths / 12);

    if (diffInMinutes < 1) {
        return 'Just now';
    } else if (diffInMinutes === 1) {
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
