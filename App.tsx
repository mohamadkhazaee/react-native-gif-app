import { StyleSheet, View, StatusBar } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    color: 'black',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
