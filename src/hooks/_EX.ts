/**
 * HOOKS 폴더
 * 
 * 재사용 가능한 커스텀 훅들을 만드는 곳입니다.
 * 로직을 분리해서 여러 컴포넌트에서 사용할 수 있게 합니다.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

// 카운터 훅
export function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

// 로컬 저장소 훅
export function useAsyncStorage(key: string, defaultValue: string = '') {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const loadValue = async () => {
      try {
        const stored = await AsyncStorage.getItem(key);
        if (stored) setValue(stored);
      } catch (error) {
        console.error('Storage read error:', error);
      }
    };
    loadValue();
  }, [key]);

  const updateValue = async (newValue: string) => {
    try {
      setValue(newValue);
      await AsyncStorage.setItem(key, newValue);
    } catch (error) {
      console.error('Storage write error:', error);
    }
  };

  return [value, updateValue] as const;
}

// 토글 훅
export function useToggle(initialState: boolean = false) {
  const [state, setState] = useState(initialState);

  const toggle = () => setState(!state);
  const setTrue = () => setState(true);
  const setFalse = () => setState(false);

  return { state, toggle, setTrue, setFalse };
} 