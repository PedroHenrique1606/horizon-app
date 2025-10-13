import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/hooks/useTheme';
import { router, useSegments } from 'expo-router';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export function AuthNavigator({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const { colors } = useTheme();

  React.useEffect(() => {
    if (isLoading) return;

    const protectedRoutes = ['dashboard', 'transactions', 'analytics', 'profile', '(tabs)'];
    const testRoutes = ['test-nativewind'];
    const isProtectedRoute = protectedRoutes.includes(segments[0] || '');
    const isTestRoute = testRoutes.includes(segments[0] || '');

    if (isAuthenticated && !isProtectedRoute && !isTestRoute) {
      router.replace('/dashboard');
    } else if (!isAuthenticated && isProtectedRoute) {
      router.replace('/login');
    }
  }, [isAuthenticated, isLoading, segments]);

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
