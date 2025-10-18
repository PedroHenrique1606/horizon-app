import { useAuth } from '@/contexts/AuthContext';
import { navigateAndReset } from '@/utils/navigation';
import { usePathname } from 'expo-router';
import { useEffect } from 'react';

export function useProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    const protectedRoutes = ['/dashboard', '/transactions', '/analytics', '/profile', '/accounts'];
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    if (!isAuthenticated && isProtectedRoute) {
      navigateAndReset('/login');
    } else if (isAuthenticated && pathname === '/login') {
      navigateAndReset('/dashboard');
    }
  }, [isAuthenticated, isLoading, pathname]);
}


