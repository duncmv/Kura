'use client';
import { getUserData } from '@/api/auth';
import HombePage from './(home)/home';
import LandingPage from './landing';

export default function Home () {
  const userData = getUserData();
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
