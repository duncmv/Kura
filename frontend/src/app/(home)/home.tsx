import Image from 'next/image';
import React, { ReactNode, useEffect } from 'react';
import Header from '@/components/header';
import Poll from './poll';
import Nav from './nav';
import InstProfile from './inst-profile';
import Publish from './publish';
import { useState } from 'react';

export default function HombePage({userData}: {userData: any}) {
  const isInstitution = userData.__class__ === 'Institution';
  const [tab, setTab] = useState('home');
  const [content, setContent] = useState<ReactNode[]>([]);

  useEffect(() => { // This is the initial fetch of the polls.
    if (isInstitution && tab === 'home') {
      setContent([
        <Poll />,
        <Poll />
      ]);
    } else if (!isInstitution && tab === 'home') {
      setContent([
        <Poll />,
        <Poll />
      ]);
    }
  }, []);


  if (isInstitution) {
    useEffect(() => {
      if (tab === 'home') {
        const err = 'No polls yet, create one to get started.'
        console.log('home');
        setContent([<Poll />, <Poll />]);
        // TODO: fetch the institution's polls.
      } else if (tab === 'publish') {
        console.log('publish');
        // TODO: Show the publish page.
        setContent([<Publish userData={userData} setTab={setTab}/>]);
      } else if (tab === 'profile') {
        console.log('profile');
        // TODO: Show the profile page.
        setContent([<InstProfile userData={userData}/>]);
      }
    }, [tab]);

  } else {
      useEffect(() => {
        if (tab === 'home') {
          const err = 'No polls yet, check back later.'
          console.log('home');
          // TODO: fetch the polls for the individual.
        } else if (tab === 'history') {
          const err = 'No history yet, poll to get started.'
          console.log('history');
          // TODO: Show the polls from the history.
        } else if (tab === 'bookmark') {
          const err = 'No bookmarks yet, bookmark a poll to get started.'
          console.log('bookmark');
          // TODO: Show the bookmarked polls.
        }
      }, [tab]);
  }

  // ...

  return (
    <>
      <Header userData={userData} />
      <div onClick={() => {document.getElementsByClassName('--dropdown--')[0].classList.add('hidden');}} 
      className='--wrapper-- relative max-h-[100%] lg:w-[80vw] mx-auto flex flex-col items-center bg-gray-100 overflow-y-scroll h-[100%] scrollbar-hide'>
          {content}
        <div className="--nav-wrapper-- fixed bottom-0 min-[410px]:bottom-[5vh]  w-full">
          <Nav isInst={isInstitution} setTab={setTab}/>
        </div>
      </div>
    </>
  );
}