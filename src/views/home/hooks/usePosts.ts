//////////////////////////////////////// usePosts ////////////////////////////////////////
// TanStack Query 로 게시글을 패칭하는 예시 훅 (Application 레이어).
// 컴포넌트는 service 를 직접 호출하지 않고 이 훅을 경유합니다.

import { useQuery } from '@tanstack/react-query';

import { fetchPosts } from '@/shared/service/post.service';

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });
}
