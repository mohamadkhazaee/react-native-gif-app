import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import { RandomGifDisplay, SearchBar } from './src/components';
import { useEffect, useState } from 'react';
import { searchGifs } from './src/api';
import { RandomGif } from './src/api/types';

export default function App() {
  const [searchText, setSearchText] = useState('');
  const [gifs, setGifs] = useState<RandomGif[]>();
  useEffect(() => {
    if (searchText.length > 2) {
      searchGifs(searchText)
        .then((res) => {
          setGifs(res.data);
        })
        .catch((err) => {
          throw Error(err);
        });
    }
  }, [searchText]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="red" />
      <SearchBar
        value={searchText}
        onChange={(value) => setSearchText(value)}
      />
      {searchText.length >= 2 ? (
        <>
          <Text style={styles.resultText}>search results:</Text>

          <FlatList
            keyExtractor={(item) => item.id}
            data={gifs}
            numColumns={3}
            renderItem={({ item }) => {
              return (
                <Image
                  source={{ uri: item?.images.original?.url }}
                  style={{
                    width: Dimensions.get('window').width / 3,
                    padding: 10,
                    aspectRatio: 1,
                  }}
                />
              );
            }}
          />
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
