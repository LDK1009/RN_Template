import styled from '@emotion/native'
import React from 'react'
import { View } from 'react-native'

import { HomeScreen, LoginScreen } from '../src/screens/_EX'
import { useAuthStore } from '../src/stores/_EX'
import { theme } from '../src/styles/_EX'

// 전체 앱 컨테이너 스타일 (웹의 App.tsx와 유사한 패턴)
const AppContainer = styled(View)`
  flex: 1;
  background-color: ${theme.colors.background.default};
`

// 메인 앱 컴포넌트 (웹의 라우터 역할과 유사)
export default function App() {
  const { isAuthenticated, isLoading } = useAuthStore()

  // 로딩 중일 때 (웹의 Suspense fallback과 유사)
  if (isLoading) {
    return (
      <AppContainer>
        {/* 여기에 로딩 스피너나 스플래시 화면 추가 가능 */}
      </AppContainer>
    )
  }

  // 인증 상태에 따른 화면 렌더링 (웹의 라우터 가드와 유사)
  return (
    <AppContainer>
      {isAuthenticated ? (
        <HomeScreen navigation={null as any} route={null as any} />
      ) : (
        <LoginScreen navigation={null as any} route={null as any} />
      )}
    </AppContainer>
  )
} 