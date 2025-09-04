import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import 'react-native-url-polyfill/auto'

export default function RootLayout() {
  return (
    <>
      <StatusBar style='auto' />
      <Stack
        screenOptions={{
          headerShown: false, // 기본 헤더 숨기기
          navigationBarHidden: true, // // OS 바텀내비게이션바 숨기기
          statusBarHidden: true, // OS 상태바는 숨기기
        }}
      >
        <Stack.Screen name='index' />
        <Stack.Screen name='news' />
      </Stack>
    </>
  )
}
