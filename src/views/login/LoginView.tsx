//////////////////////////////////////// 로그인 화면 ////////////////////////////////////////
// Presentation 레이어. 데이터/로직은 useAuth 훅을 통해서만 사용합니다.

import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Snackbar, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuth } from '@/shared/hooks/useAuth';
import { spacing } from '@/shared/theme';

export function LoginView() {
  const insets = useSafeAreaInsets();
  const { signIn, isSigningIn } = useAuth();
  const [error, setError] = useState<string | null>(null);

  ////////// 소셜 로그인 핸들러
  const handleSignIn = async () => {
    try {
      await signIn('google');
    } catch (e) {
      setError(e instanceof Error ? e.message : '로그인에 실패했습니다.');
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          RN Template
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          시작하려면 로그인하세요
        </Text>

        <Button
          mode="contained"
          icon="google"
          loading={isSigningIn}
          disabled={isSigningIn}
          onPress={handleSignIn}
          style={styles.button}
        >
          Google 로 계속하기
        </Button>
      </View>

      <Snackbar visible={!!error} onDismiss={() => setError(null)} duration={4000}>
        {error}
      </Snackbar>
    </View>
  );
}

//////////////////////////////////////// 스타일 ////////////////////////////////////////
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: spacing.xl,
    opacity: 0.7,
  },
  button: {
    marginTop: spacing.md,
  },
});
