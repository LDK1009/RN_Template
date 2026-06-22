//////////////////////////////////////// useAuth ////////////////////////////////////////
// 인증 상태 조회 + 로그인/로그아웃 액션을 묶어 반환합니다.
// 컴포넌트는 service 를 직접 호출하지 않고 이 훅을 통해 사용합니다.

import type { Provider } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';

import * as authService from '@/shared/service/auth.service';
import { useAuthStore } from '@/shared/store/authStore';

export function useAuth() {
  const session = useAuthStore((s) => s.session);
  const user = useAuthStore((s) => s.user);
  const initialized = useAuthStore((s) => s.initialized);

  ////////// 소셜 로그인
  const signInMutation = useMutation({
    mutationFn: (provider: Provider) => authService.signInWithOAuth(provider),
  });

  ////////// 로그아웃
  const signOutMutation = useMutation({
    mutationFn: () => authService.signOut(),
  });

  return {
    session,
    user,
    initialized,
    isAuthenticated: !!session,
    signIn: signInMutation.mutateAsync,
    signOut: signOutMutation.mutateAsync,
    isSigningIn: signInMutation.isPending,
    isSigningOut: signOutMutation.isPending,
  };
}
