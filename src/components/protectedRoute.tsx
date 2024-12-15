'use client';

import { useAppSelector } from '@/redux/store';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({ children}: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const pathname = usePathname();

  const adminRoutes = ['/admin','/admin/users', '/admin/tasks', '/admin/monitor'];

  useEffect(() => {
    // Check authentication first
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }

    // Check admin routes access
    const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
    if (isAdminRoute && user?.role !== 'ADMIN') {
      router.replace('/');
      return;
    }

    // Redirect admin to admin dashboard
    if (user?.role === 'ADMIN' && pathname === '/') {
      router.replace('/admin');
      return;
    }
  }, [isAuthenticated, user, router, pathname]);

  // Show loading state while checking auth
  if (!isAuthenticated) {
    return <LoadingSpinner />;
  }

  // Block non-admin users from admin routes
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
  if (isAdminRoute && user?.role !== 'ADMIN') {
    return <LoadingSpinner />;
  }

  return children;
}