import { useEffect, useState } from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  StyleSheet,
  Text,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  GifType,
  PaginationType,
  SEARCH_API_LIMIT,
  searchGifs,
} from '../../api';
import { RootStackParamList } from '../../../App';

type GifsListProps = {
  navigation: NativeStackScreenProps<RootStackParamList, 'Home'>['navigation'];
  searchText: string;
};
export function GifsList({ navigation, searchText }: GifsListProps) {
  const [gifs, setGifs] = useState<GifType[] | null>(null);
  const [pagination, setPagination] = useState<PaginationType | null>(null);
  const [reachedToEnd, setReachedToEnd] = useState(false);

  const fetchData = (offset?: number) => {
    setReachedToEnd(false);

    searchGifs({ query: searchText, offset: offset ?? 0 })
      .then((res) => {
        if (offset) {
          setGifs((prev) => [...(prev ?? []), ...res.data]);
        } else {
          setGifs(res.data);
        }
        if (
          res.pagination.offset + SEARCH_API_LIMIT >=
          res.pagination.total_count
        ) {
          setReachedToEnd(true);
        }
        setPagination(res.pagination);
      })
      .catch((err) => {
        throw Error(err);
      });
  };

  const handleFetchNextPage = () => {
    if (pagination && !reachedToEnd) {
      fetchData(pagination?.offset + SEARCH_API_LIMIT);
    }
  };

  useEffect(() => {
    if (!searchText.length) {
      setGifs(null);
    } else if (searchText.length >= 2) {
      fetchData();
    }
  }, [searchText]);

  if (!gifs) return null;

  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={gifs}
      numColumns={3}
      onEndReachedThreshold={0.1}
      onEndReached={handleFetchNextPage}
      ListEmptyComponent={
        <Text style={styles.emptyStateText}>
          No matching results found for: {searchText}
        </Text>
      }
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate('Details', { data: item })}
          >
            <View style={styles.itemContainer}>
              <Image
                source={{ uri: item?.images.original?.url }}
                style={styles.thumbnail}
              />
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: Dimensions.get('window').width / 3,
    aspectRatio: 1,
    padding: 2,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  emptyStateText: {
    textAlign: 'center',
    marginTop: 1,
    fontSize: 16,
    color: 'gray',
  },
});
