//////////////////////////////////////// 진입점 ////////////////////////////////////////
// 세션 복원 중 잠깐 표시되는 로딩 화면. 복원이 끝나면 루트 가드가 적절한 그룹으로 리다이렉트합니다.

import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function Index() {
  return (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
