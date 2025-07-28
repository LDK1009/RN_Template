import { HomeScreen } from '@/pages/Home'
import { theme } from '@/styles/theme'
import React from 'react'
import { StyleSheet, View } from 'react-native'

// 전체 앱 컨테이너 스타일 (웹의 App.tsx와 유사한 패턴)

// 메인 앱 컴포넌트 (웹의 라우터 역할과 유사)
export default function App() {
  return (
    <View style={styles.container}>
      <HomeScreen />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.paper,
  },
})
