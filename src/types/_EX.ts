/**
 * TYPES 폴더
 * 
 * TypeScript 타입들을 정의하는 곳입니다.
 * 데이터의 구조를 미리 정해서 오류를 방지합니다.
 */

// 사용자 타입
export interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
}

// 게시글 타입
export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

// API 응답 타입
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// 네비게이션 타입
export type StackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Settings: undefined;
};

// 폼 데이터 타입
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
} 