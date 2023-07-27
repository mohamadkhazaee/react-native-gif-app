import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { fetchRandomGif } from '../api';
import { RandomGif } from '../api/types';

export const RandomGifDisplay = () => {
  const [randomGif, setRandomGif] = useState<RandomGif>();

  useEffect(() => {
    fetchRandomGif()
      .then((res) => {
        setRandomGif(res.data);
      })
      .catch(() => {
        // TODO: handle failure of api!
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchRandomGif, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenURL = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error('Error opening URL:', err),
    );
  };

  // TODO: add loading state and failure state
  return (
    <View style={styles.container}>
      {randomGif && (
        <>
          <Image
            source={{ uri: randomGif?.images.original?.url }}
            style={styles.gif}
          />
          <Text style={styles.title}>{randomGif?.title}</Text>
          <TouchableOpacity
            onPress={() => handleOpenURL('https://www.example.com')}
          >
            <Text style={styles.link}>{randomGif?.url}</Text>
          </TouchableOpacity>
          <Text style={styles.ageRestriction}>{randomGif?.rating}</Text>
        </>
      )}
    </View>
  );
};

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
