/**
 * STORES 폴더
 * 
 * 앱 전체에서 사용하는 상태를 관리하는 곳입니다.
 * 여러 화면에서 공유해야 하는 데이터를 저장합니다.
 */

import { create } from 'zustand';

// 사용자 상태
interface UserState {
  name: string;
  isLoggedIn: boolean;
  setName: (name: string) => void;
  login: () => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  name: '',
  isLoggedIn: false,
  setName: (name) => set({ name }),
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false, name: '' }),
}));

// 카운터 상태
interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
})); 