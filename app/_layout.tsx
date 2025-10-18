import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { DockNavbar } from '@/components/DockNavbar';
import { SplashScreen } from '@/components/SplashScreen';
import { AuthProvider } from '@/contexts/AuthContext';
import { BiometricAuthProvider } from '@/contexts/BiometricAuthContext';

function RootLayoutContent() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  const customDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: '#228B22',
      background: '#000000',
      card: '#111827',
      text: '#FFFFFF',
      border: '#374151',
      notification: '#228B22',
    },
  };

  return (
    <ThemeProvider value={customDarkTheme}>
      <View style={styles.container}>
        <StatusBar 
          style="light" 
          backgroundColor="#000000"
          translucent={false} 
        />
        <Stack 
          screenOptions={{ 
            headerShown: false,
            animation: 'fade',
            animationDuration: 150,
            contentStyle: {
              backgroundColor: '#000000',
            },
          }}
        >
          <Stack.Screen name="login" />
          <Stack.Screen name="dashboard" />
          <Stack.Screen name="transactions" />
          <Stack.Screen name="analytics" />
          <Stack.Screen name="profile" />
          <Stack.Screen name="settings" />
          <Stack.Screen 
            name="accounts" 
            options={{ 
              animation: 'slide_from_right',
              animationDuration: 300,
              gestureEnabled: true,
              contentStyle: {
                backgroundColor: '#000000',
              },
            }} 
          />
          <Stack.Screen name="test-nativewind" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          </Stack>
          <DockNavbar />
        </View>
      <Toast />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <BiometricAuthProvider>
        <RootLayoutContent />
      </BiometricAuthProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});
