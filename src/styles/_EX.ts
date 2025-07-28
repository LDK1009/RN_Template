/**
 * STYLES 폴더
 * 
 * 앱에서 사용하는 스타일들을 정의하는 곳입니다.
 * 색상, 크기, 간격 등을 일관되게 관리합니다.
 */

// 색상
export const colors = {
  primary: '#007AFF',
  secondary: '#34C759',
  background: '#F2F2F7',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#8E8E93',
  red: '#FF3B30',
};

// 크기
export const sizes = {
  small: 12,
  medium: 16,
  large: 20,
  xlarge: 24,
};

// 간격
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// 공통 스타일
export const commonStyles = {
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    margin: spacing.sm,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  button: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: spacing.xs,
  },

  buttonText: {
    color: colors.white,
    fontSize: sizes.medium,
    fontWeight: '600',
  },

  title: {
    fontSize: sizes.xlarge,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: spacing.sm,
  },
}; 