//////////////////////////////////////// Sentry 초기화 ////////////////////////////////////////
// EXPO_PUBLIC_SENTRY_DSN 이 있을 때만 활성화됩니다. 없으면 아무 동작도 하지 않습니다.
// 소스맵 업로드 등 빌드 설정은 README 의 Sentry 섹션을 참고하세요.

import * as Sentry from '@sentry/react-native';

const dsn = process.env.EXPO_PUBLIC_SENTRY_DSN;

export function initSentry() {
  if (!dsn) return;
  Sentry.init({
    dsn,
    tracesSampleRate: 1.0,
    // 개발 중에는 콘솔로도 확인 가능
    enableNativeFramesTracking: true,
  });
}

export { Sentry };
