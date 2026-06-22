//////////////////////////////////////// 로그인 그룹 레이아웃 ////////////////////////////////////////
// 보호 라우트 그룹. 추후 탭/드로어 네비게이션을 여기에 구성합니다.

import { Stack } from 'expo-router';

export default function AppLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
