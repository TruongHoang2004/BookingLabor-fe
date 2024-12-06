'use client';

import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { useEffect, useState } from 'react';
import { initializeAuth } from '@/redux/slices/authSlice';
import LoadingSpinner from '@/components/LoadingSpinner';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      await store.dispatch(initializeAuth());
      setIsLoading(false);
    };
    initAuth();
  }, []);

  return (
    <Provider store={store}>
      {isLoading ? <LoadingSpinner /> : children}
    </Provider>
  );
}