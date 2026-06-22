//////////////////////////////////////// 인증 상태 스토어 ////////////////////////////////////////
// 세션/유저의 단일 진실 소스는 supabase(+SecureStore)입니다.
// 이 스토어는 supabase 의 인증 상태를 앱 전역에서 동기적으로 읽기 위한 인메모리 캐시입니다.
// (zustand persist 미사용 — 영구 저장은 supabase 가 담당, 중복 저장 시 staleness 위험)

import type { Session, User } from '@supabase/supabase-js';
import { create } from 'zustand';

type AuthState = {
  session: Session | null;
  user: User | null;
  ////////// 부트스트랩(앱 시작 시 세션 복원) 완료 여부 — 라우팅 게이트에 사용
  initialized: boolean;
  setSession: (session: Session | null) => void;
  setInitialized: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  initialized: false,
  setSession: (session) => set({ session, user: session?.user ?? null }),
  setInitialized: (initialized) => set({ initialized }),
}));
