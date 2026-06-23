//////////////////////////////////////// 홈 화면 ////////////////////////////////////////
// 로그인 후 진입하는 보호 화면. 유저 정보 + 데이터 흐름 예시(usePosts) + 로그아웃.

import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuth } from '@/shared/hooks/useAuth';
import { spacing } from '@/shared/theme';

import { usePosts } from './hooks/usePosts';

export function HomeView() {
  const insets = useSafeAreaInsets();
  const { user, signOut, isSigningOut } = useAuth();

  ////////// 데이터 흐름 예시: service → useQuery → view
  const { data: posts, isLoading, isError } = usePosts();

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.lg }]}>
      <Text variant="headlineSmall">환영합니다 👋</Text>
      <Text variant="bodyMedium" style={styles.email}>
        {user?.email ?? '익명 사용자'}
      </Text>

      {/* 데이터 패칭 패턴 데모 */}
      <Card mode="outlined" style={styles.card}>
        <Card.Title title="데이터 예시 (posts)" subtitle="service → useQuery → view" />
        <Card.Content style={styles.cardContent}>
          {isLoading && <ActivityIndicator />}
          {isError && (
            <Text variant="bodySmall">
              posts 테이블이 없으면 에러가 표시됩니다. 생성 방법은 README 를 참고하세요.
            </Text>
          )}
          {posts?.length === 0 && <Text variant="bodySmall">데이터가 없습니다.</Text>}
          {posts?.map((post) => (
            <Text key={post.id} variant="bodyMedium">
              • {post.title}
            </Text>
          ))}
        </Card.Content>
      </Card>

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
  );
}

//////////////////////////////////////// 스타일 ////////////////////////////////////////
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  email: {
    opacity: 0.7,
    marginTop: spacing.xs,
  },
  card: {
    marginTop: spacing.xl,
  },
  cardContent: {
    gap: spacing.xs,
  },
  button: {
    marginTop: spacing.xl,
    alignSelf: 'flex-start',
  },
});
