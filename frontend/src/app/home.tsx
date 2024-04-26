import Image from 'next/image';
import React from 'react';
import Header from '../components/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

export default function HombePage({userData}: {userData: any}) {
  return (
    <>
      <Header userData={userData} />
      <div className='--wrapper-- min-h-[83vh] md:w-[80vw] mx-auto flex flex-col items-center bg-gray-200 overflow-y-scroll' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      </div>
    </>
  );
}

function Poll ()  {
  return ('poll');
}

function Nav () {
  return (
    <FontAwesomeIcon icon={faHome} className='text-3xl' />
  );
}