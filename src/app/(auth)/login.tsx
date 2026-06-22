//////////////////////////////////////// 로그인 라우트 ////////////////////////////////////////
// 라우트는 화면 조립만. 실제 UI 는 views/login 에 위치합니다.

import { LoginView } from '@/views/login/LoginView';

export default function LoginRoute() {
  return <LoginView />;
}
