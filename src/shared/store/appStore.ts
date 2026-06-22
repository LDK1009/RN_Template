//////////////////////////////////////// 앱 전역 설정 스토어 ////////////////////////////////////////
// zustand persist + MMKV 사용 예시. 테마 모드·온보딩 여부 등 비민감 클라이언트 상태를 영구 저장합니다.
// (민감한 세션 정보는 여기 두지 말 것 — supabase + SecureStore 가 담당)

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { mmkvStorage } from '@/shared/lib/storage';

export type ThemeMode = 'system' | 'light' | 'dark';

type AppState = {
  themeMode: ThemeMode;
  hasOnboarded: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  setHasOnboarded: (value: boolean) => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      themeMode: 'system',
      hasOnboarded: false,
      setThemeMode: (themeMode) => set({ themeMode }),
      setHasOnboarded: (hasOnboarded) => set({ hasOnboarded }),
    }),
    {
      name: 'app-store',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
