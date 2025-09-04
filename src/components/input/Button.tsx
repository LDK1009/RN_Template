import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

// 간단한 버튼 컴포넌트
interface ButtonProps {
  title: string
  onPress: () => void
}

export const CommonButton = ({ title, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  )
}
