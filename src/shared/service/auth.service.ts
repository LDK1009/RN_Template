//////////////////////////////////////// 인증 서비스 ////////////////////////////////////////
// Supabase 인증 호출 전담. 상태 변경(store)·UI 로직 없음. 순수 async 함수만.
// 소셜 로그인은 임베드 웹뷰가 아닌 "시스템 브라우저 + PKCE"로 처리합니다.
// (구글은 임베드 웹뷰 OAuth 를 차단하며, 애플 심사도 시스템 브라우저를 선호)

import type { Provider } from '@supabase/supabase-js';
import { makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

import { supabase } from '@/shared/lib/supabase';

////////// OAuth 리다이렉트 URI (app.json 의 scheme 기반)
const redirectTo = makeRedirectUri();

//////////////////// 현재 세션 조회 ////////////////////
export async function getCurrentSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error('[auth.service] getCurrentSession', error);
    throw error;
  }
  return data.session;
}

//////////////////// 소셜 로그인 ////////////////////
// 1) Supabase 에서 OAuth URL 발급 → 2) 시스템 브라우저로 열기 → 3) 돌아온 code 를 세션으로 교환
export async function signInWithOAuth(provider: Provider) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo, skipBrowserRedirect: true },
  });
  if (error) {
    console.error('[auth.service] signInWithOAuth', error);
    throw error;
  }

  const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
  if (result.type !== 'success') return null; // 사용자가 취소

  ////////// 리다이렉트 URL 에서 인증 code 추출 후 세션 교환
  const { params } = parseUrlParams(result.url);
  if (params.error) throw new Error(params.error_description ?? params.error);

  const { data: sessionData, error: exchangeError } =
    await supabase.auth.exchangeCodeForSession(params.code);
  if (exchangeError) {
    console.error('[auth.service] exchangeCodeForSession', exchangeError);
    throw exchangeError;
  }
  return sessionData.session;
}

//////////////////// 로그아웃 ////////////////////
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('[auth.service] signOut', error);
    throw error;
  }
}

//////////////////// URL 쿼리/프래그먼트 파싱 유틸 ////////////////////
function parseUrlParams(url: string): { params: Record<string, string> } {
  const params: Record<string, string> = {};
  const queryString = url.includes('#') ? url.split('#')[1] : url.split('?')[1];
  if (!queryString) return { params };
  for (const pair of queryString.split('&')) {
    const [key, value] = pair.split('=');
    if (key) params[key] = decodeURIComponent(value ?? '');
  }
  return { params };
}
