//////////////////////////////////////// Paper 테마 ////////////////////////////////////////
// MUI 의 ThemeProvider 패턴에 대응. light/dark MD3 테마에 브랜드 색상을 주입합니다.

import { MD3DarkTheme, MD3LightTheme, type MD3Theme } from 'react-native-paper';

import { brand } from './colors';

export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: brand.primary,
    secondary: brand.secondary,
    error: brand.error,
  },
};

export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: brand.primary,
    secondary: brand.secondary,
    error: brand.error,
  },
};

export { brand } from './colors';
export { spacing, type Spacing } from './spacing';
