//////////////////////////////////////// MMKV 저장소 ////////////////////////////////////////
// RN 에는 localStorage 가 없으므로 zustand persist 의 저장 엔진으로 MMKV 를 사용합니다.
// MMKV v4 는 nitro 기반 네이티브 모듈이라 Expo Go 에서 동작하지 않습니다 (dev client 필요).

import { createMMKV } from 'react-native-mmkv';
import type { StateStorage } from 'zustand/middleware';

////////// MMKV 인스턴스
export const storage = createMMKV({ id: 'rn-template-storage' });

//////////////////// zustand persist 어댑터 ////////////////////
// zustand 의 StateStorage 인터페이스에 MMKV 를 연결합니다.
export const mmkvStorage: StateStorage = {
  setItem: (key, value) => {
    storage.set(key, value);
  },
  getItem: (key) => {
    const value = storage.getString(key);
    return value ?? null;
  },
  removeItem: (key) => {
    storage.remove(key);
  },
};
