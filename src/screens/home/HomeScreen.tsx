import { StyleSheet, View, Text } from 'react-native';
import { RandomGifDisplay } from './RandomGifDisplay';
import { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { SearchBar } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';
import { GifsList } from './GifsList';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: HomeScreenProps) {
  const [searchText, setSearchText] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const debouncedSearchText = useDebounce(searchText, 500);

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchText}
        onChange={(value) => setSearchText(value)}
        onClear={() => {
          setSearchText('');
        }}
        onFocus={() => {
          setIsInputFocused(true);
        }}
        onBlur={() => {
          setIsInputFocused(false);
        }}
      />

      {isInputFocused ? (
        <>
          <Text style={styles.resultText}>search results:</Text>
          <GifsList searchText={debouncedSearchText} navigation={navigation} />
        </>
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
    fontSize: 18,
    marginBottom: 20,
  },
});
