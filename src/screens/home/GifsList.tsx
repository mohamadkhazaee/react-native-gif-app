import {
  FlatList,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  StyleSheet,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GifType } from '../../api';
import { RootStackParamList } from '../../../App';

type GifsListProps = {
  gifs: GifType[];
  navigation: NativeStackScreenProps<RootStackParamList, 'Home'>['navigation'];
};
export function GifsList({ gifs, navigation }: GifsListProps) {
  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={gifs}
      numColumns={3}
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
});
