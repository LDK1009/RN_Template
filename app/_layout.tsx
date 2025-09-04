import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import 'react-native-url-polyfill/auto'

export default function RootLayout() {
  return (
    <>
      <StatusBar style='auto' />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='index' />
        <Stack.Screen name='news' />
      </Stack>
    </>
  )
}
