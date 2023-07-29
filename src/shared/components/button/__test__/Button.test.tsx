import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';

describe('Button component', () => {
  it('renders correctly with the given title', () => {
    const title = 'Click Me';
    const { getByText } = render(<Button title={title} />);

    const buttonElement = getByText(title);
    expect(buttonElement).toBeTruthy();
  });

  it('executes onPress function when clicked', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button
        title="Click Me"
        touchableContainerProps={{ onPress: onPressMock }}
      />,
    );

    const buttonElement = getByText('Click Me');
    fireEvent.press(buttonElement);

    expect(onPressMock).toHaveBeenCalled();
  });

  it('applies the given styles to the button and text', () => {
    const title = 'Styled Button';
    const customButtonStyle = {
      backgroundColor: 'red',
      padding: 15,
      borderRadius: 8,
    };
    const customTextStyle = {
      color: 'white',
      fontSize: 18,
    };

    const { getByText, getByTestId } = render(
      <Button
        title={title}
        touchableContainerProps={{
          testID: 'custom-button',
          style: customButtonStyle,
        }}
        textProps={{ testID: 'custom-text', style: customTextStyle }}
      />,
    );

    const buttonElement = getByText(title);
    const customButton = getByTestId('custom-button');
    const customText = getByTestId('custom-text');

    expect(buttonElement).toBeTruthy();
    expect(customButton).toHaveStyle(customButtonStyle);
    expect(customText).toHaveStyle(customTextStyle);
  });
});
