import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

export function DetailsScreen({ route }: DetailsScreenProps) {
  const {
    data: { images, title, rating, url },
  } = route.params;

  // TODO: this is duplicated
  const handleOpenURL = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error('Error opening URL:', err),
    );
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: images.original?.url }} style={styles.gif} />
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        onPress={() => handleOpenURL('https://www.example.com')}
      >
        <Text style={styles.link}>{url}</Text>
      </TouchableOpacity>
      <Text style={styles.ageRestriction}>{rating}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gif: {
    width: 300,
    height: 300,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  ageRestriction: {
    fontSize: 16,
    marginTop: 5,
  },
});
