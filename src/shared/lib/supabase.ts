//////////////////////////////////////// Supabase 클라이언트 ////////////////////////////////////////
// 인증 세션은 expo-secure-store(OS 보안 저장소)에 저장합니다.
// 모바일 앱 권장 설정: PKCE flow, 자동 토큰 갱신, URL 세션 감지 비활성화.

import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';

import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import { AppState } from 'react-native';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    'Supabase 환경변수가 없습니다. .env 의 EXPO_PUBLIC_SUPABASE_URL / EXPO_PUBLIC_SUPABASE_ANON_KEY 를 확인하세요.',
  );
}

//////////////////// SecureStore 어댑터 ////////////////////
// supabase-js 의 StorageAdapter 인터페이스(getItem/setItem/removeItem)를 SecureStore 로 구현합니다.
// 주의: SecureStore 는 키당 약 2KB 제한이 있습니다. 세션이 커지면 README 의 안내대로
//       암호화된 대용량 어댑터(LargeSecureStore)로 교체하세요.
const SecureStoreAdapter = {
  getItem: (key: string) => SecureStore.getItemAsync(key),
  setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  removeItem: (key: string) => SecureStore.deleteItemAsync(key),
};

////////// 클라이언트
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: SecureStoreAdapter,
    flowType: 'pkce',
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

//////////////////// 자동 토큰 갱신 제어 ////////////////////
// 앱이 포그라운드일 때만 토큰을 자동 갱신합니다 (배터리·네트워크 절약).
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
