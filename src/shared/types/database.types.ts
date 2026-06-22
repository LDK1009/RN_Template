//////////////////////////////////////// Supabase DB 타입 ////////////////////////////////////////
// 아래 명령으로 실제 스키마 기반 타입을 생성해 이 파일을 대체하세요.
//   npx supabase gen types typescript --project-id <PROJECT_ID> > src/shared/types/database.types.ts

export type Database = {
  public: {
    Tables: Record<string, never>;
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};
