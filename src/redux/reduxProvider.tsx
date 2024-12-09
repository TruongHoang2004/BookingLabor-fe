'use client';

import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { useEffect, useState } from 'react';
import { initializeAuth } from '@/redux/slices/authSlice';
import LoadingSpinner from '@/components/LoadingSpinner';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Add timeout safety
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Authentication initialization timed out')), 5000);
        });

        // Race between auth initialization and timeout
        await Promise.race([
          store.dispatch(initializeAuth()),
          timeoutPromise
        ]);

        console.log('Auth initialization completed');
        setIsLoading(false);
      } catch (err) {
        console.error('Auth initialization failed:', err);
        setError(err instanceof Error ? err.message : 'Failed to initialize');
        setIsLoading(false);
      }
    };

    initAuth();

    // Cleanup timeout on unmount
    return () => {
      setIsLoading(false);
    };
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <Provider store={store}>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner />
        </div>
      ) : (
        children
      )}
    </Provider>
  );
}