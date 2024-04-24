import React from 'react';
import Link from 'next/link';

export default function header () {
  return (
    <header className='w-full p-1.5 sm:p-2 md:p-5 border-b shadow-sm relative'>
      <div className='w-[100px]'>
        <Link href='/'>
          <h1 className={`text-blue-500 text-3xl sm:text-3xl md:text-4xl font-bold ml-5 w-10
                                before:content-[''] before:absolute before:left-1.5 before:top-1 min-[639px]:before:left-2 min-[767px]:before:top-3 min-[767px]:before:left-5 before:h-5 before:w-5 before:border-2 before:border-black before:rounded-full before:hover:bg-blue-300`}
          >
            Kura
          </h1>
        </Link>
      </div>
    </header>
  );
}
