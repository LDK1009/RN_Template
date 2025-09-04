import { CommonButton } from '@/components/input/Button'
import InputText from '@/components/input/InputText'
import { mixinContainer, mixinFlex } from '@/styles/mixins'
import styled from '@emotion/native'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { SafeAreaView, Text } from 'react-native'

// 홈 화면 예시
export const HomeScreen = () => {
  const [text, setText] = useState('')

  const handlePress = () => {
    alert(`입력한 텍스트: ${text}`)
  }

  const goToNews = () => {
    router.push('/news')
  }

  return (
    <Container>
      <Text>{text}</Text>
      <InputText placeholder='InputText' onChangeText={setText} value={text} />
      <CommonButton title='Click me' onPress={handlePress} />
      <CommonButton title='Go to News' onPress={goToNews} />
    </Container>
  )
}

const Container = styled(SafeAreaView)`
  ${mixinContainer};
  ${mixinFlex('column', 'center', 'center')};
`
