'use client';
import { getCurrentUser } from '@/api/auth';
import { useEffect, useState } from 'react';
import HombePage from './home';
import LandingPage from './landing';

export default function Home () {
  const [userData, setUserData] = useState(Object.create(null));

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (user) {
        setUserData(user);
      }
    }).catch((e) => {
      console.log('Not logged in');
      setUserData(null);
    });
  }, []);

  if (userData) {
    return (
      <HombePage userData={userData} />
    );
  } else {
    return (
      <LandingPage />
    );
  }
}
