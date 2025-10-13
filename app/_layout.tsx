import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { AuthNavigator } from '@/components/AuthNavigator';
import { DockNavbar } from '@/components/DockNavbar';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { SplashScreen } from '@/components/SplashScreen';
import { AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }
  const customDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: '#10B981',
      background: '#000000',
      card: '#111827',
      text: '#FFFFFF',
      border: '#374151',
      notification: '#10B981',
    },
  };

  return (
    <AuthProvider>
      <ThemeProvider value={customDarkTheme}>
        <View style={styles.container}>
          <AuthNavigator>
            <Stack 
              screenOptions={{ 
                animation: 'slide_from_right',
                animationDuration: 300,
              }}
            >
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen 
                name="dashboard" 
                options={{ 
                  headerShown: false,
                  animation: 'fade',
                }} 
              />
              <Stack.Screen 
                name="transactions" 
                options={{ 
                  headerShown: false,
                  animation: 'fade',
                }} 
              />
              <Stack.Screen 
                name="analytics" 
                options={{ 
                  headerShown: false,
                  animation: 'fade',
                }} 
              />
              <Stack.Screen 
                name="profile" 
                options={{ 
                  headerShown: false,
                  animation: 'fade',
                }} 
              />
              <Stack.Screen 
                name="add-transaction" 
                options={{ 
                  headerShown: false,
                  animation: 'slide_from_bottom',
                }} 
              />
              <Stack.Screen 
                name="accounts" 
                options={{ 
                  headerShown: false,
                  animation: 'slide_from_right',
                }} 
              />
              <Stack.Screen name="test-nativewind" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
            </Stack>
          </AuthNavigator>
          <FloatingActionButton />
          <DockNavbar />
        </View>
        <StatusBar style="light" translucent={false} />
        <Toast />
      </ThemeProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
