import { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import { GifCard } from '../../components';
import { GifType, fetchRandomGif } from '../../api';

export const RandomGifDisplay = () => {
  const [randomGif, setRandomGif] = useState<GifType>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRandomGif()
      .then((res) => {
        setRandomGif(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setError('Error while connecting to server!');
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoading(true);
      fetchRandomGif();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleRetry = () => {
    setIsLoading(true);
    setError(null);

    fetchRandomGif()
      .then((res) => {
        setRandomGif(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setError('Error while connecting to server!');
      });
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={handleRetry}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <GifCard {...randomGif!} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
  retryText: {
    color: 'blue',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
