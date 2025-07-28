/**
 * CONSTANTS 폴더
 * 
 * 앱에서 사용하는 상수들을 정의하는 곳입니다.
 * 변하지 않는 값들을 여기서 관리합니다.
 */

// 앱 기본 정보
export const APP_INFO = {
  NAME: 'My App',
  VERSION: '1.0.0'
};

// API 설정
export const API = {
  BASE_URL: 'https://api.example.com',
  TIMEOUT: 10000
};

// 저장소 키
export const STORAGE_KEYS = {
  USER_TOKEN: '@app/user_token',
  USER_DATA: '@app/user_data'
};

// 색상
export const COLORS = {
  PRIMARY: '#007AFF',
  SECONDARY: '#34C759',
  BACKGROUND: '#F2F2F7',
  TEXT: '#000000'
};

// 에러 메시지
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '네트워크 오류가 발생했습니다.',
  INVALID_INPUT: '입력값이 올바르지 않습니다.'
}; 