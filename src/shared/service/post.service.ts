//////////////////////////////////////// 게시글 서비스 (데이터 흐름 예시) ////////////////////////////////////////
// service → hook(useQuery) → view 패턴 데모. 순수 async 함수만 둡니다.
// 실제로 동작시키려면 Supabase 에 posts 테이블을 만드세요:
//   create table posts (
//     id uuid primary key default gen_random_uuid(),
//     title text not null,
//     created_at timestamptz not null default now()
//   );

import { supabase } from '@/shared/lib/supabase';

export type Post = {
  id: string;
  title: string;
  created_at: string;
};

//////////////////// 게시글 목록 조회 ////////////////////
export async function fetchPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, created_at')
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) {
    console.error('[post.service] fetchPosts', error);
    throw error;
  }
  return data ?? [];
}
