import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import 'react-native-url-polyfill/auto'

export default function RootLayout() {
  return (
    <>
      <StatusBar style='auto' />
      <Stack>
        <Stack.Screen
          name='index'
          options={{
            title: 'Speed Battle',
            headerShown: false,
          }}
        />
      </Stack>
    </>
  )
}
