//////////////////////////////////////// 인증 부트스트랩 리스너 ////////////////////////////////////////
// 앱 시작 시 1회 세션을 복원하고, 이후 supabase 인증 상태 변화를 authStore 에 동기화합니다.
// 루트 레이아웃에서 한 번만 호출하세요.

import { useEffect } from 'react';

import { supabase } from '@/shared/lib/supabase';
import { useAuthStore } from '@/shared/store/authStore';

export function useAuthListener() {
  const setSession = useAuthStore((s) => s.setSession);
  const setInitialized = useAuthStore((s) => s.setInitialized);

  useEffect(() => {
    ////////// 초기 세션 복원
    supabase.auth
      .getSession()
      .then(({ data }) => {
        setSession(data.session);
      })
      .finally(() => {
        setInitialized(true);
      });

    ////////// 이후 로그인/로그아웃/토큰갱신 구독
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.subscription.unsubscribe();
  }, [setSession, setInitialized]);
}
