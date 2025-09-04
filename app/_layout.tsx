import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as SystemUI from 'expo-system-ui'
import React, { useEffect } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import 'react-native-url-polyfill/auto'

export default function RootLayout() {
  useEffect(() => {
    // 시스템 UI 색상 설정
    SystemUI.setBackgroundColorAsync(theme.colors.background.default)
  }, [])

  return (
    <SafeAreaProvider>
      <Container>
        <StatusBar style='light' translucent />
        <StyledTabs
          screenOptions={{
            tabBarStyle: StyledTabBar,
            tabBarActiveTintColor: '#FFFFFF',
            tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.1)',
            tabBarShowLabel: false,
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name='index'
            options={{
              title: 'Home',
              tabBarIcon: ({ color }) => (
                <TabIcon>
                  <Ionicons name='home-outline' size={theme.iconSizes.md} color={color} />
                </TabIcon>
              ),
            }}
          />
          <Tabs.Screen
            name='news'
            options={{
              title: 'News',
              tabBarIcon: ({ color }) => (
                <TabIcon>
                  <MaterialIcons name='article' size={theme.iconSizes.md} color={color} />
                </TabIcon>
              ),
            }}
          />
        </StyledTabs>
      </Container>
    </SafeAreaProvider>
  )
}

const Container = styled(SafeAreaView)`
  flex: 1;
`

const StyledTabs = styled(Tabs)``

const StyledTabBar = {
  backgroundColor: theme.colors.background.default,
  height: theme.iconSizes.md * 2, // 아이콘 크기의 2배 (위아래 여백 포함)
  paddingTop: 12,
  elevation: 0, // 안드로이드 그림자 제거
  shadowOpacity: 0, // iOS 그림자 제거
  borderTopWidth: 0,
}

const TabIcon = styled.View`
  width: ${theme.iconSizes.md};
  height: ${theme.iconSizes.md};
`
