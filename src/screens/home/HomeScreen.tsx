import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { RandomGifDisplay } from './RandomGifDisplay';
import { useEffect, useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { SearchBar } from '../../components';
import { GifType, searchGifs } from '../../api';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: HomeScreenProps) {
  const [searchText, setSearchText] = useState('');
  const [gifs, setGifs] = useState<GifType[]>();
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
                <TouchableOpacity
                  onPress={() =>
                    //   TODO: fix navigate params
                    navigation.navigate('Details', { data: item })
                  }
                >
                  <Image
                    source={{ uri: item?.images.original?.url }}
                    style={{
                      width: Dimensions.get('window').width / 3,
                      padding: 10,
                      aspectRatio: 1,
                    }}
                  />
                </TouchableOpacity>
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
