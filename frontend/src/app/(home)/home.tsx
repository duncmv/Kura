import Image from 'next/image';
import React, { ReactNode, useEffect } from 'react';
import Header from '@/components/header';
import Nav from './(components)/nav';
import Publish from './(pages)/publish';
import Main from './(pages)/main';
import History from './(pages)/history';
import Bookmarks from './(pages)/bookmarks';
import Settings from './(pages)/settings';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

export default function HombePage({userData}: {userData: any}) {
  const isInst = userData.__class__ === 'Institution';
  const [tab, setTab] = useState('home');
  const [page, setPage] = useState<ReactNode>([<Main key={uuidv4()} userData={userData} />]);
  const router = useRouter();

  useEffect(() => {
    if (isInst) {
      if (tab === 'home') {
        setPage([<Main key={uuidv4()} userData={userData} />]);
      } else if (tab === 'publish') {
        setPage([<Publish key={uuidv4()} userData={userData} setTab={setTab}/>]);
      } else if (tab === 'profile') {
        router.push(`/inst/${userData.id}`);
      } else if (tab === 'settings') {
        setPage([<Settings key={uuidv4()} userData={userData}/>]);
      }
    } else {
      if (tab === 'home') {
        setPage([<Main key={uuidv4()} userData={userData} />]);
      } else if (tab === 'history') {
        setPage([<History key={uuidv4()} userData={userData}/>]);
      } else if (tab === 'bookmark') {
        setPage([<Bookmarks key={uuidv4()} />]);
      } else if (tab === 'settings') {
        setPage([<Settings key={uuidv4()} userData={userData}/>]);
      }
    }
  }, [tab, isInst]);

  // ...

  return (
    <>
      <Header userData={userData} />
      <div onClick={() => {document.getElementsByClassName('--dropdown--')[0].classList.add('hidden'); Array.from(document.getElementsByClassName('-poll-dropdown-')).forEach(e => e.classList.add('hidden'));}} 
      className='--wrapper-- relative lg:w-[80vw] mx-auto flex flex-col items-center pb-[90px] bg-gray-100 overflow-y-scroll max-h-[100vh] h-[90vh] scrollbar-hide'>
          {page}
        <div className="--nav-wrapper-- fixed bottom-0 min-[410px]:bottom-[5vh] w-[400px]">
          <Nav isInst={isInst} setTab={setTab}/>
        </div>
      </div>
    </>
  );
}