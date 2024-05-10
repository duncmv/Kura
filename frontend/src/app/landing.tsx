import Link from 'next/link';
import React from 'react';
import { card, h2, h3 } from '../components/styleVar';
import Header from '../components/header';

export default function LandingPage () {
  const pStyles = 'lg:w-2/3 ';
  return (
    <>
      <Header />
      <div className='*:border-b *:p-5 *:pl-7 md:*:p-10'>
        <div className='basis-1/4 flex flex-col justify-start'>
          <h2 className={h2}>What Is Kura?</h2>
          <p className={pStyles}>
            Kura is a platform that connects individuals and institutions by providing access to statistical polling data. Individuals can express their opinions, stay informed, and engage with institutions transparently. Institutions benefit from access to public opinion data for informed decision-making, transparent engagement, and service tailoring.
          </p>
        </div>
        <div className='basis-1/2 flex flex-col justify-around gap-5'>
          <h2 className={h2}>How it helps</h2>
          <div className='<--cards-wrapper--> flex flex-col md:flex-row items-center justify-center gap-5'>
            <div className={card}>
              <h3 className={h3}>Individuals</h3>
              <p>
              As an individual user, Kura gives you a voice in public opinion, keeps you informed, lets you contribute to decision-making, and allows you to engage directly with institutions. By participating in polls, you&apos;re not just expressing your views; you&apos;re influencing the decisions that affect you and your community. Whether it&apos;s about local policies, national issues, or global trends, your input matters.
<br></br><br></br>
Through Kura, you have access to a wealth of information about what&apos;s happening around you and how others feel about it. You can stay up-to-date on current events, explore different perspectives, and understand the pulse of society.
              </p>
            </div>
            <div className={card}>
              <h3 className={h3}>Institiutions</h3>
              <p>
              As an institution, Kura provides you with invaluable access to public opinion data, empowering you to make informed decisions, engage transparently with the community, and tailor your services to better meet the needs of your audience.
<br></br><br></br>
By creating and publishing polls on Kura, you have the opportunity to gauge public sentiment on various topics, ensuring that your decisions and actions are in line with the preferences and expectations of the community you serve. Whether it&apos;s about policy decisions, service improvements, or understanding public perception of your organization, Kura offers insights that help you make better choices.
              </p>
            </div>
          </div>
          <p className={pStyles}>
          Individuals voice opinions, stay informed, and connect with institutions. Institutions gain valuable data for informed decisions and community engagement. Together, we shape a better society.
          </p>
        </div>
        <div className='basis-1/4 border-none flex justify-center'>
          <Link href='/register'>
            <button className='px-10 py-2 sm:px-16 sm:py-4 font-bold text-lg hover:bg-blue-300 active:bg-blue-400 rounded-md focus:outline-none focus:ring focus:ring-blue-200 border transition duration-300 ease-in-out relative'>
              Join
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
