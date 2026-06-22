//////////////////////////////////////// 환경변수 타입 ////////////////////////////////////////
// EXPO_PUBLIC_ 접두사 변수는 빌드 시 process.env 로 인라인됩니다.

declare namespace NodeJS {
  interface ProcessEnv {
    EXPO_PUBLIC_SUPABASE_URL: string;
    EXPO_PUBLIC_SUPABASE_ANON_KEY: string;
    ////////// 선택: 설정 시 Sentry 활성화
    EXPO_PUBLIC_SENTRY_DSN?: string;
  }
}
