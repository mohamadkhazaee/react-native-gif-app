import {
  Image,
  Linking,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { GifType } from '../api';

export function GifCard({ images, title, url, rating }: GifType) {
  const handleOpenURL = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error('Error opening URL:', err),
    );
  };

  return (
    <>
      <Image source={{ uri: images.original?.url }} style={styles.gif} />
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        onPress={() => handleOpenURL('https://www.example.com')}
      >
        <Text style={styles.link}>{url}</Text>
      </TouchableOpacity>
      <Text style={styles.ageRestriction}>{rating}</Text>
    </>
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
