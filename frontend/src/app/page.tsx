'use client';
import { getCurrentUser } from '@/api/auth';
import HombePage from './(home)/home';
import LandingPage from './landing';
import { useEffect, useState } from 'react';
import React from 'react';


/**
 * Renders the Home page component.
 * Fetches user data and displays different components based on the loading state and user data availability.
 */
export default function Home() {
  const [userData, setUserData] = useState(null); // Holds the user data
  const [loading, setLoading] = useState(true); // Indicates if the data is being loaded

  useEffect(() => {
    /**
     * Fetches the current user data asynchronously.
     * Sets the user data and updates the loading state accordingly.
     */
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

  if (loading) {
    // Show the loading while the data is being fetched
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex h-2.5 w-full max-w-xs bg-gray-300 rounded-full overflow-hidden">
          <div className="h-full w-9/10 bg-blue-500 animate-progress"></div>
        </div>
      </div>
    );
  } else if (userData) {
    // Render the Home page with the user data
    return <HombePage userData={userData} />;
  } else {
    // Render the Landing page if no user data is available
    return <LandingPage />;
  }
}
