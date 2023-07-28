import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { GifCard } from '../GifCard';
import { Linking } from 'react-native';

jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(() => Promise.resolve('mockResolve')),
}));

const mockGifData = {
  type: 'gif',
  id: 'abc123',
  url: 'https://www.example.com/gif',
  slug: 'mock-gif',
  title: 'Mock GIF',
  rating: 'PG-13',
  images: {
    original: {
      height: '200',
      width: '300',
      url: 'https://www.example.com/gif/original.gif',
    },
  },
};

describe('GifCard', () => {
  test('renders correctly', () => {
    const { getByTestId } = render(<GifCard {...mockGifData} />);
    const gifImage = getByTestId('gif');
    const titleText = getByTestId('title');
    const linkText = getByTestId('link');
    const ageRestrictionText = getByTestId('age-restriction');

    expect(gifImage).toBeTruthy();
    expect(titleText).toBeTruthy();
    expect(linkText).toBeTruthy();
    expect(ageRestrictionText).toBeTruthy();
  });

  test('handles link press correctly', () => {
    const { getByTestId } = render(<GifCard {...mockGifData} />);

    const linkText = getByTestId('link');
    fireEvent.press(linkText);

    expect(Linking.openURL).toHaveBeenCalledWith('https://www.example.com/gif');
  });
});
