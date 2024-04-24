import Link from 'next/link';
import React from 'react';
import { card, h2, h3 } from '../components/styleVar';

export default function LandingPage () {
  const pStyles = 'lg:w-2/3 ';
  return (
    <div className='*:border-b *:p-5 *:pl-7 md:*:p-10'>
      <div className='basis-1/4 flex flex-col justify-start'>
        <h2 className={h2}>What Is Kura?</h2>
        <p className={pStyles}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam aut nihil quaerat, repellat odit impedit officia? Ipsam itaque, molestias voluptatum mollitia sed laborum amet non exercitationem, earum, aliquid nemo? Pariatur?</p>
      </div>
      <div className='basis-1/2 flex flex-col justify-around gap-5'>
        <h2 className={h2}>How it helps</h2>
        <div className='<--cards-wrapper--> flex flex-col md:flex-row items-center justify-center gap-5'>
          <div className={card}>
            <h3 className={h3}>Individuals</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero nesciunt ab, dolor velit iure impedit facilis fugit omnis, commodi doloribus maiores illo inventore laborum ducimus distinctio magnam, non laboriosam eaque.</p>
          </div>
          <div className={card}>
            <h3 className={h3}>Institiutions</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero nesciunt ab, dolor velit iure impedit facilis fugit omnis, commodi doloribus maiores illo inventore laborum ducimus distinctio magnam, non laboriosam eaque.</p>
          </div>
        </div>
        <p className={pStyles}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet fugiat qui ratione ad, repellendus sed quaerat corporis minima vel odio? Perferendis placeat accusantium aperiam harum laboriosam cupiditate reprehenderit culpa modi!</p>
      </div>
      <div className='basis-1/4 border-none flex justify-center'>
        <Link href='/register'>
          <button className='px-10 py-2 sm:px-16 sm:py-4 font-bold text-lg hover:bg-blue-300 active:bg-blue-400 rounded-md focus:outline-none focus:ring focus:ring-blue-200 border transition duration-300 ease-in-out relative'>
            Join
          </button>
        </Link>
      </div>
    </div>
  );
}
