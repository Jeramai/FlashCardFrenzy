import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    material: require('../assets/fonts/material.ttf')
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;
  return (
    <ThemeProvider value={DarkTheme}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
            <Stack.Screen name='+not-found' options={{ headerShown: false }} />
            <Stack.Screen name='group' options={{ headerShown: false }} />
          </Stack>
          <StatusBar backgroundColor='#f3ffe0' style='dark' />
        </SafeAreaView>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
