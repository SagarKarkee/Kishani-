import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Welcome to Kishani App.</Text>
      <Text>hello</Text>
      <Text>subai jabako vako hora vako ho bhana chai inform gara la </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'violet',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
