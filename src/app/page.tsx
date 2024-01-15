'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getSession, useSession } from 'next-auth/react';
import FetchUser from './FetchUser';
import { CircularProgress } from '@mui/material';
import Logout from '@/components/Logout';
import { NextRequest } from 'next/server';

interface User {
  name: string;
  email: string;
}
export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const userSession = await getSession();
      if (!userSession) {
        router.push('/auth/login');
      }
    };
    fetchData();
  }, [router]);

  if (status === 'loading') {
    return (
    <center className='mt-64'>
      <CircularProgress/>
    </center>
    )
  }

  if (!session) {
    return (
      <center className='mt-64'>
        <CircularProgress/>
      </center>
      );
  }

  const currentUserArr: User[] = Object.values(session);
  
  return (
    <>
      <div className="mt-6">
        <div className="flex justify-center items-center flex-col">
          <h1 className="bg-purple-500  text-3xl font-bold mb-6">
            Welcome in Admin page
          </h1>
          <div className="font-bold">
            Hello MR : {currentUserArr[0].name}
            <br />
            Email ID : {currentUserArr[0].email}
          </div>
          <Logout />
            <FetchUser />
        </div>
      </div>
    </>
  );
}
