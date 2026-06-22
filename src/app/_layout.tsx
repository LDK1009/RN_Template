//////////////////////////////////////// 루트 레이아웃 ////////////////////////////////////////
// Provider 트리 마운트 + 인증 부트스트랩 + 인증 기반 라우팅 가드.

import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { useAuthListener } from '@/shared/hooks/useAuthListener';
import { initSentry } from '@/shared/lib/sentry';
import { AppProviders } from '@/shared/providers/AppProviders';
import { useAuthStore } from '@/shared/store/authStore';

////////// Sentry (DSN 설정 시에만 활성)
initSentry();

////////// 세션 복원이 끝날 때까지 스플래시 유지
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  ////////// 앱 시작 시 세션 복원 + 인증 상태 구독
  useAuthListener();

  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
}

//////////////////// 인증 가드 네비게이터 ////////////////////
function RootNavigator() {
  const initialized = useAuthStore((s) => s.initialized);
  const session = useAuthStore((s) => s.session);
  const segments = useSegments();
  const router = useRouter();

  ////////// 세션 복원 완료 후 스플래시 숨김
  useEffect(() => {
    if (initialized) SplashScreen.hideAsync();
  }, [initialized]);

  ////////// 인증 상태에 따라 (auth) ↔ (app) 그룹으로 리다이렉트
  useEffect(() => {
    if (!initialized) return;
    const inAuthGroup = segments[0] === '(auth)';

    if (!session && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (session && inAuthGroup) {
      router.replace('/(app)/home');
    }
  }, [initialized, session, segments, router]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(app)" />
    </Stack>
  );
}
