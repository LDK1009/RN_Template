import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import 'react-native-url-polyfill/auto'

import { useAuthStore } from '../src/stores/_EX'
import { theme } from '../src/styles/_EX'

export default function RootLayout() {
  const { checkAuth } = useAuthStore()

  // 앱 시작 시 인증 상태 확인 (웹의 useEffect 패턴과 동일)
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primary.main,
          },
          headerTintColor: theme.colors.primary.contrastText,
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'Speed Battle',
            headerShown: false 
          }} 
        />
      </Stack>
    </>
  )
}
