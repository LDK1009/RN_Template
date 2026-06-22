//////////////////////////////////////// 홈 라우트 ////////////////////////////////////////
// 라우트는 화면 조립만. 실제 UI 는 views/home 에 위치합니다.

import { HomeView } from '@/views/home/HomeView';

export default function HomeRoute() {
  return <HomeView />;
}
