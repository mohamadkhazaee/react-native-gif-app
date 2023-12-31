import { useRef, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import { Button } from '../button/Button';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export function SearchBar({
  value,
  onChange,
  onFocus,
  onBlur,
  onClear,
}: SearchBarProps) {
  const [showCancel, setShowCancel] = useState(false);

  const ref = useRef<TextInput>(null);

  const handleCancelFocus = () => {
    setShowCancel(false);
    onChange('');
    onBlur?.();
    if (ref.current) {
      ref.current.blur();
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.searchBox, showCancel && styles.searchBoxFocused]}>
        <TextInput
          testID="input"
          ref={ref}
          style={styles.input}
          placeholder="Search..."
          value={value}
          onChangeText={onChange}
          onFocus={() => {
            setShowCancel(true);
            onFocus?.();
          }}
        />
        {value.length > 0 && (
          <TouchableOpacity
            testID="clear-button"
            onPress={() => {
              onClear();
            }}
          >
            <Text style={styles.clearIcon}>x</Text>
          </TouchableOpacity>
        )}
      </View>
      {showCancel && (
        <Button
          title="cancel"
          touchableContainerProps={{
            testID: 'cancel-button',
            style: styles.cancelButton,
            onPress: handleCancelFocus,
          }}
        />
      )}
    </View>
  );
}

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
  input: {
    flex: 1,
    fontSize: 16,
  },
  cancelButton: {
    marginLeft: 8,
  },
  clearIcon: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
