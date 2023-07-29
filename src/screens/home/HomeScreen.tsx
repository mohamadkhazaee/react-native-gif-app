import { StyleSheet, View, Text } from 'react-native';
import { RandomGifDisplay } from './RandomGifDisplay';
import { useEffect, useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { SearchBar } from '../../shared/components';
import { GifType, searchGifs } from '../../api';
import { useDebounce } from '../../shared/hooks';
import { GifsList } from './GifsList';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: HomeScreenProps) {
  const [searchText, setSearchText] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [gifs, setGifs] = useState<GifType[] | null>(null);

  const debouncedSearchText = useDebounce(searchText, 500);

  useEffect(() => {
    if (debouncedSearchText.length > 2) {
      searchGifs(debouncedSearchText)
        .then((res) => {
          setGifs(res.data);
        })
        .catch((err) => {
          throw Error(err);
        });
    }
  }, [debouncedSearchText]);

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchText}
        onChange={(value) => setSearchText(value)}
        onClear={() => {
          setSearchText('');
          setGifs(null);
        }}
        onFocus={() => {
          setIsInputFocused(true);
        }}
        onBlur={() => {
          setIsInputFocused(false);
          setGifs(null);
        }}
      />

      {isInputFocused ? (
        <>
          <Text style={styles.resultText}>search results:</Text>
          {!!gifs && <GifsList gifs={gifs} navigation={navigation} />}
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
