import { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import { GifCard } from '../../shared/components';
import { GifType, fetchRandomGif } from '../../api';

export const RandomGifDisplay = () => {
  const [randomGif, setRandomGif] = useState<GifType>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getData = () => {
    setIsLoading(true);
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

  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const interval = setInterval(getData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {!!error && (
        <>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={handleRetry}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </>
      )}

      {isLoading && <ActivityIndicator size="large" />}

      {randomGif && !isLoading && <GifCard {...randomGif} />}
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
