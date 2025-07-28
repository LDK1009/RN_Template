import { Dimensions, ViewStyle } from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

///// 컨테이너 믹스인
export const mixinContainer = (): ViewStyle => ({ 
  minHeight: screenHeight,
  padding: 24,
});

///// Flex 믹스인
export const mixinFlex = (
  direction: 'row' | 'column' = 'row',
  justifyContent: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' = 'center',
  alignItems: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline' = 'center',
  gap?: number
): ViewStyle => ({
  display: 'flex',
  flexDirection: direction,
  justifyContent: justifyContent,
  alignItems: alignItems,
  ...(gap && { gap }),
});
