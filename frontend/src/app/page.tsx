'use client';
import { getCurrentUser } from '@/api/auth';
import HombePage from './(home)/home';
import LandingPage from './landing';
import { useEffect, useState } from 'react';
import React from 'react';

export default function Home () {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const data = await getCurrentUser();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  console.log(userData)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex h-2.5 w-full max-w-xs bg-gray-300 rounded-full overflow-hidden">
          <div className="h-full w-9/10 bg-blue-500 animate-progress"></div>
        </div>
      </div>
    )
  } else if (userData) {
    return (
      <HombePage userData={userData} />
    );
  } else {
    return (
      <LandingPage />
    );
  }
}
