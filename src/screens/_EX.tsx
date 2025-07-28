/**
 * SCREENS 폴더
 * 
 * 앱의 각 화면들을 만드는 곳입니다.
 * 사용자가 보는 페이지들을 정의합니다.
 */

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { Button, Card, Input } from '../components/_EX';

// 홈 화면 예시
export const HomeScreen = () => {
  const [text, setText] = useState('');

  const handlePress = () => {
    alert(`입력한 텍스트: ${text}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <Text style={styles.title}>홈 화면</Text>
        <Text style={styles.subtitle}>간단한 예시 화면입니다</Text>
        
        <Input
          placeholder="텍스트를 입력하세요"
          value={text}
          onChangeText={setText}
        />
        
        <Button title="확인" onPress={handlePress} />
      </Card>
    </SafeAreaView>
  );
};

// 프로필 화면 예시
export const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <Text style={styles.title}>프로필</Text>
        <Text style={styles.text}>사용자 정보를 보여주는 화면입니다</Text>
        
        <Button title="설정" onPress={() => alert('설정 화면으로 이동')} />
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
  },
}); 