import Image from 'next/image';
import React, { ReactNode, useEffect } from 'react';
import Header from '@/components/header';
import Nav from './(components)/nav';
import Publish from './(pages)/publish';
import Main from './(pages)/main';
import History from './(pages)/history';
import Bookmarks from './(pages)/bookmarks';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HombePage({userData}: {userData: any}) {
  const isInstitution = userData.__class__ === 'Institution';
  const [tab, setTab] = useState('home');
  const [page, setPage] = useState<ReactNode>([<Main userData={userData} />]);
  const router = useRouter();

  if (isInstitution) {
    useEffect(() => {
      if (tab === 'home') {
        setPage([<Main userData={userData} />]);
      } else if (tab === 'publish') {
        setPage([<Publish userData={userData} setTab={setTab}/>]);
      } else if (tab === 'profile') {
        router.push(`/inst/${userData.id}`);
      }
    }, [tab, isInstitution]);

  } else {
      useEffect(() => {
        if (tab === 'home') {
          setPage([<Main userData={userData} />]);
        } else if (tab === 'history') {
          setPage([<History userData={userData}/>]);
        } else if (tab === 'bookmark') {
          setPage([<Bookmarks />]);
        }
      }, [tab, isInstitution]);
  }

  // ...

  return (
    <>
      <Header userData={userData} />
      <div onClick={() => {document.getElementsByClassName('--dropdown--')[0].classList.add('hidden');}} 
      className='--wrapper-- relative lg:w-[80vw] mx-auto flex flex-col items-center bg-gray-100 overflow-y-scroll max-h-[100vh] h-[90vh] scrollbar-hide'>
          {page}
        <div className="--nav-wrapper-- fixed bottom-0 min-[410px]:bottom-[5vh] w-[400px]">
          <Nav isInst={isInstitution} setTab={setTab}/>
        </div>
      </div>
    </>
  );
}