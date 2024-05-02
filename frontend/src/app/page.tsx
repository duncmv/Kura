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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900">
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
