/*
'use client';

import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { useEffect } from 'react';
import { initializeAuth } from '@/redux/slices/authSlice';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize auth from localStorage when app starts
    store.dispatch(initializeAuth());
  }, []);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
*/

'use client';

import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { useEffect, useState } from 'react';
import { initializeAuth } from '@/redux/slices/authSlice';
import LoadingSpinner from '@/components/LoadingSpinner';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      try {
        store.dispatch(initializeAuth());
      } catch (error) {
        console.error("Failed to initialize auth:", error);
      } finally {
        setIsLoading(false);
      }
  }, []);

  return (
    <Provider store={store}>
      {isLoading ? <LoadingSpinner /> : children}
    </Provider>
  );
}