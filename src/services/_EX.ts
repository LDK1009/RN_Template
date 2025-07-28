/**
 * SERVICES 폴더
 * 
 * 외부 API나 서비스와 통신하는 함수들을 만드는 곳입니다.
 * 서버에서 데이터를 가져오거나 보낼 때 사용합니다.
 */

// 사용자 타입
interface User {
  id: string;
  name: string;
  email: string;
}

// API 서비스
export const userService = {
  // 사용자 목록 가져오기
  async getUsers(): Promise<User[]> {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('사용자 목록 가져오기 실패:', error);
      throw error;
    }
  },

  // 사용자 정보 가져오기
  async getUser(id: string): Promise<User> {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('사용자 정보 가져오기 실패:', error);
      throw error;
    }
  }
};

// 간단한 HTTP 클라이언트
export const httpClient = {
  async get(url: string) {
    const response = await fetch(url);
    return response.json();
  },

  async post(url: string, data: any) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
}; 