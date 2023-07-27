import { useRef, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type SearchBarProps = { value: string; onChange: (value: string) => void };
export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  const [showCancel, setShowCancel] = useState(false);

  const ref = useRef<TextInput>(null);
  const handleClearSearch = () => {
    onChange('');
  };

  const handleCancelFocus = () => {
    setShowCancel(false);
    onChange('');
    if (ref.current) {
      ref.current.blur();
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.searchBox, showCancel && styles.searchBoxFocused]}>
        <MaterialIcons
          name="search"
          size={24}
          color="#777"
          style={styles.searchIcon}
        />
        <TextInput
          ref={ref}
          style={styles.input}
          placeholder="Search..."
          value={value}
          onChangeText={onChange}
          onFocus={() => setShowCancel(true)}
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={handleClearSearch}>
            <MaterialIcons
              name="close"
              size={24}
              color="#777"
              style={styles.clearIcon}
            />
          </TouchableOpacity>
        )}
      </View>
      {showCancel && (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleCancelFocus}
        >
          <Text>cancel</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchBoxFocused: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  clearIcon: {
    marginLeft: 8,
  },
  cancelButton: {
    marginLeft: 8,
  },
});
