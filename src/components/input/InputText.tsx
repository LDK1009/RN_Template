import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import React from 'react'
import { TextInput } from 'react-native'

type PropsType = {
  placeholder: string
  onChangeText: (text: string) => void
  value: string
}

const InputText = ({ placeholder, onChangeText, value }: PropsType) => {
  return <StyledTextInput placeholder={placeholder} onChangeText={onChangeText} value={value} />
}

export default InputText

const StyledTextInput = styled(TextInput)`
  width: 100%;
  height: 40px;
  border: 1px solid ${theme.colors.primary.main};
`
