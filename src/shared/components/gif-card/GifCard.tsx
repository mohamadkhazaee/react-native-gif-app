import {
  Image,
  Linking,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';
import { GifType } from '../../../api';

const imageSize = Dimensions.get('window').width - 20;

export function GifCard({ images, title, url, rating }: GifType) {
  const handleOpenURL = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error('Error opening URL:', err),
    );
  };

  return (
    <>
      <Image
        testID="gif"
        source={{ uri: images.original?.url }}
        style={styles.gif}
      />

      <View style={styles.detailsContainer}>
        <View style={styles.contentContainer}>
          <Text testID="title" style={styles.title}>
            {title}
          </Text>
          <TouchableOpacity testID="link" onPress={() => handleOpenURL(url)}>
            <Text style={styles.link}>{url}</Text>
          </TouchableOpacity>
        </View>

        <View testID="age-restriction" style={styles.ageRestrictionBadge}>
          <Text style={styles.ageRestrictionText}>{rating?.toUpperCase()}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gif: {
    width: imageSize,
    height: imageSize,
  },
  detailsContainer: {
    marginTop: 10,
    paddingHorizontal: 5,
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentContainer: {
    flexShrink: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  ageRestrictionBadge: {
    backgroundColor: '#555',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  ageRestrictionText: {
    fontSize: 16,
    color: 'white',
  },
});
