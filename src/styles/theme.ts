/**
 * STYLES 폴더
 * 
 * 앱에서 사용하는 스타일들을 정의하는 곳입니다.
 * 색상, 크기, 간격 등을 일관되게 관리합니다.
 */

// 색상
export const colors = {
  primary: {
    dark: '#2a2ac7',     
    main: '#3f3ff3',     
    light: '#7a7af5',
  },
  secondary: {
    dark: '#e91e63',     
    main: '#ff4081',     
    light: '#ff79b0',    
  },
  background: {
    default: '#222222',  
    paper: '#FFFFFF',    
  },
  black: {
    100: '#000000',
    200: '#1C1C1E',
    300: '#2C2C2E',
    400: '#3A3A3C',
    500: '#48484A',
    600: '#636366',
    700: '#8E8E93',
    800: '#C7C7CC',
    900: '#E5E5EA',
  },
  status: {
    info: '#0A84FF',     // 정보/버튼 강조
    success: '#34C759',  // 성공 (iOS 스타일)
    warning: '#FF9500',  // 경고
    error: '#FF3B30',    // 에러
  },
  core: {
    white: '#FFFFFF',
    black: '#000000',
  },
};

// 폰트 사이즈
export const fontSizes = {
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

// 간격 (padding, margin)
export const spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

// 테두리
export const border = {
  radius: {
    sm: 4,
    md: 8,
    lg: 12,
    full: 9999,
  },
  width: {
    thin: 1,
    thick: 2,
  },
};

// 아이콘 크기
export const iconSizes = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 40,
};

// zIndex 계층
export const zIndices = {
  background: -1,
  base: 0,
  dropdown: 10,
  modal: 100,
  toast: 200,
};

// 쉐도우
export const shadow = {
  light: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heavy: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
};

// 폰트 weight
export const fontWeights = {
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
};

// 통합 테마
export const theme = {
  colors,
  fontSizes,
  fontWeights,
  spacing,
  border,
  iconSizes,
  zIndices,
  shadow,
};
