import { h3, h2 } from '@/components/styleVar';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import Question from './question';

export default function Poll ()  {
    return (
        <div className='w-[100%]'>
            <div className='--poll-wrapper-- bg-white sm:w-[70%] w-[95%] my-5 mx-auto py-4  flex flex-col items-center justify-around bg-gray-200 min-h-[200px]' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <div className='--poll-header-- flex flex-row justify-between items-center w-[90%] relative'>
                    <div className="--publisher-- basis-3/4">
                        <button className='w-10 h-10 inline-block float-left border rounded-full mr-4 ' style={{backgroundImage: 'url(/user-place-holder.png)', backgroundPosition: 'center', backgroundSize: 'cover'}}></button>
                        <h3 className={h3}>John Doe</h3>
                        <p className="--time--">30 minutes ago</p>
                    </div>
                    <button className="--settings--">
                        <FontAwesomeIcon icon={faEllipsisH} />
                    </button>
                    <div className="--poll-dropdown-- text-left absolute right-2 bottom-0 hidden">
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
                        <h2 className={h2}>Title</h2>
                        <p className="--description-- overflow-ellipsis overflow-hidden max-h-[75px] line-clamp-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quod.</p>
                    </div>
                    <div className="--questions--">
                        <Question />
                    </div>
                </div>
            </div>
        </div>
    )
}