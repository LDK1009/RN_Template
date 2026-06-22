//////////////////////////////////////// 홈 화면 ////////////////////////////////////////
// 로그인 후 진입하는 보호 화면. 유저 정보 표시 + 로그아웃.

import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuth } from '@/shared/hooks/useAuth';
import { spacing } from '@/shared/theme';

export function HomeView() {
  const insets = useSafeAreaInsets();
  const { user, signOut, isSigningOut } = useAuth();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        <Text variant="headlineSmall">환영합니다 👋</Text>
        <Text variant="bodyMedium" style={styles.email}>
          {user?.email ?? '익명 사용자'}
        </Text>

        <Button
          mode="outlined"
          loading={isSigningOut}
          disabled={isSigningOut}
          onPress={() => signOut()}
          style={styles.button}
        >
          로그아웃
        </Button>
      </View>
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
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  email: {
    opacity: 0.7,
  },
  button: {
    marginTop: spacing.xl,
  },
});
