import { render, fireEvent } from '@testing-library/react-native';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  test('renders correctly', () => {
    const { getByTestId } = render(<SearchBar value="" onChange={() => {}} />);

    const inputElement = getByTestId('input');
    expect(inputElement).toBeTruthy();
  });

  test('triggers onChange correctly', () => {
    const mockOnChange = jest.fn();
    const { getByTestId } = render(
      <SearchBar value="" onChange={mockOnChange} />,
    );

    const inputElement = getByTestId('input');
    fireEvent.changeText(inputElement, 'test input');

    expect(mockOnChange).toHaveBeenCalledWith('test input');
  });

  test('triggers onFocus correctly', () => {
    const mockOnFocus = jest.fn();
    const { getByTestId } = render(
      <SearchBar value="" onChange={() => {}} onFocus={mockOnFocus} />,
    );

    const inputElement = getByTestId('input');
    fireEvent(inputElement, 'focus');

    expect(mockOnFocus).toHaveBeenCalled();
  });

  test('triggers onBlur correctly', () => {
    const mockOnBlur = jest.fn();
    const { getByTestId } = render(
      <SearchBar value="" onChange={() => {}} onBlur={mockOnBlur} />,
    );
    const inputElement = getByTestId('input');
    fireEvent(inputElement, 'focus');

    const cancelButton = getByTestId('cancel-button');
    fireEvent.press(cancelButton);

    expect(mockOnBlur).toHaveBeenCalled();
  });

  test('clears search text correctly', () => {
    const mockOnChange = jest.fn();
    const { getByTestId } = render(
      <SearchBar value="test input" onChange={mockOnChange} />,
    );

    const clearButton = getByTestId('clear-button');
    fireEvent.press(clearButton);

    expect(mockOnChange).toHaveBeenCalledWith('');
  });
});
