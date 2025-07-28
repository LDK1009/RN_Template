/**
 * SCREENS 폴더
 *
 * 앱의 각 화면들을 만드는 곳입니다.
 * 사용자가 보는 페이지들을 정의합니다.
 */

import { CommonButton } from '@/components/common/input/Button'
import InputText from '@/components/common/input/InputText'
import { mixinContainer, mixinFlex } from '@/styles/mixins'
import styled from '@emotion/native'
import React, { useState } from 'react'
import { SafeAreaView, Text } from 'react-native'

// 홈 화면 예시
export const HomeScreen = () => {
  const [text, setText] = useState('')

  const handlePress = () => {
    alert(`입력한 텍스트: ${text}`)
  }

  return (
    <Container>
      <Text>{text}</Text>
      <InputText placeholder='InputText' onChangeText={setText} value={text} />
      <CommonButton title='Click me' onPress={handlePress} />
    </Container>
  )
}

const Container = styled(SafeAreaView)`
  ${mixinContainer};
  ${mixinFlex('column', 'center', 'center')};
`
