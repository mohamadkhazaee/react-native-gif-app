import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, StyleSheet } from 'react-native';
import { RootStackParamList } from '../../../App';
import { GifCard } from '../../shared/components';

type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

export function DetailsScreen({ route }: DetailsScreenProps) {
  const { data } = route.params;

  return (
    <View style={styles.container}>
      <GifCard {...data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
