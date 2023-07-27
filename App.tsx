import { StyleSheet, View, StatusBar, Text } from 'react-native';
import { RandomGifDisplay, SearchBar } from './src/components';
import { useState } from 'react';

export default function App() {
  const [searchText, setSearchText] = useState('');
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="red" />
      <SearchBar
        value={searchText}
        onChange={(value) => setSearchText(value)}
      />
      {searchText.length >= 2 ? (
        <Text style={styles.resultText}>search results:</Text>
      ) : (
        <RandomGifDisplay />
      )}
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
  resultText: {
    textAlign: 'left',
    width: '100%',
    marginLeft: 30,
  },
});
