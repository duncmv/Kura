'use client';
import React from 'react';
import Link from 'next/link';
import { useEffect } from 'react';


/**
 * Gets the required header component based on the user data.
 * @param {Object} userData - The user data object.
 * @returns {JSX.Element} the HomeHeader component if the user is logged in, otherwise the DefaultHeader component.
 */
export default function header ({userData = null}: {userData?: any}): JSX.Element{  
  if (userData) {
    return <HomeHeader userData={userData} />;
  } else {
    return <DefaultHeader />;
  }
}


/**
 * Renders the default header component.
 * @returns {JSX.Element} The rendered header component.
 */
function DefaultHeader (): JSX.Element {
  const [showButtons, setShowButtons] = React.useState(true);

  useEffect (() => {
    const currentPath = window.location.pathname;
    setShowButtons(!(['/login', '/register'].includes(currentPath)));
  }), [];

  return (
    <header className='w-full p-1.5 relative sm:p-2 md:p-5 border-b shadow-sm relative z-50 bg-white sticky top-0'>
      <div className='w-[100px]'>
        <Link href='/'>
          <h1 className={`text-blue-500 text-3xl sm:text-3xl md:text-4xl font-bold ml-5 w-10
                                before:content-[''] before:absolute before:left-1.5 before:top-1 min-[639px]:before:left-2 min-[767px]:before:top-3 min-[767px]:before:left-5 before:h-5 before:w-5 before:border-4 before:border-blue-500 before:rounded-full before:hover:bg-blue-300`}
          >
            Kura
          </h1>
        </Link>
      </div>
      {showButtons && (
        <div className='flex flex-row absolute right-[20px] top-[1vh] md:top-[3vh]'>
          <Link href='/login' className='bg-blue-500 text-white px-3 py-1.5 rounded-md mr-2'>
            Login
          </Link>
          <Link href='/register' className='bg-blue-500 text-white px-3 py-1.5 rounded-md'>
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
}

/**
 * Renders the header component for the home page.
 * @param {Object} userData - The user data object.
 * @returns {JSX.Element} The rendered header component.
 */
function HomeHeader({ userData }: { userData: any }): JSX.Element {
  // Check if the user is an institution
  const isInst = userData?.__class__ === 'Institution';

  return (
    <header className='w-full p-1.5 sm:p-2 md:p-5 border-b shadow-sm relative flex flex-row justify-between z-50 bg-white sticky top-0'>
      <div className='w-[100px]'>
        {/* Link to the home page */}
        <Link href='/'>
          <h1
            className={`text-blue-500 text-3xl sm:text-3xl md:text-4xl font-bold ml-5 w-10
                                before:content-[''] before:absolute before:left-1.5 before:top-1 min-[639px]:before:left-2 min-[767px]:before:top-3 min-[767px]:before:left-5 before:h-5 before:w-5 before:border-4 before:border-blue-500 before:rounded-full before:hover:bg-blue-300`}
          >
            Kura
          </h1>
        </Link>
      </div>
      {/* Search input */}
      <input
        type="text"
        placeholder="Search"
        className="mr-3 sm:mr-0 px-1 py-1 h-10 w-[40vw] rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        onChange={(e) => {
          const searchQuery = e.target.value;
          // TODO: Perform search logic
        }}
      />
      {/* User profile button */}
      <button
        onClick={() => document.getElementsByClassName('--dropdown--')[0].classList.toggle('hidden')}
        className='w-10 h-10 inline-block float-left border rounded-full mr-4 '
        style={{ backgroundImage: `url(${userData?.pic ?? (isInst ? '/inst-place-holder.svg' : '/user-place-holder.svg')})`, backgroundPosition: 'center', backgroundSize: 'cover' }}
      ></button>
      {/* User dropdown menu */}
      <div className="--dropdown-- text-left absolute right-2 bottom-0 hidden z-50">
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {/* Display user name */}
            <p className='block w-full text-left px-4 py-2 text-sm text-gray-700 text-center'>Logged in as {isInst ? userData.name : userData.first_name}</p>
            {/* Log out button */}
            <button
              type="submit"
              onClick={() => { sessionStorage.removeItem('user'); window.location.reload(); }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
