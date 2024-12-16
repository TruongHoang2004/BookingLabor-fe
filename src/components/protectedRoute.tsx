'use client';

import { useAppSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const { isTasker } = useAppSelector((state) => state.auth);


  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    }
    else {
      const path = window.location.pathname;
      if (!isTasker) {
        if (['/tasks', '/taskmanage'].includes(path)) {
          router.replace('/becometasker');
        }
      }
    }





  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // or a loading spinner
  }

  return children;
}