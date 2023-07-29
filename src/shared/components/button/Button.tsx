import {
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

type ButtonProps = {
  title: string;
  touchableContainerProps?: TouchableOpacityProps;
  textProps?: TextProps;
};
export function Button({
  touchableContainerProps,
  textProps,
  title,
}: ButtonProps) {
  return (
    <TouchableOpacity {...touchableContainerProps}>
      <Text {...textProps}>{title}</Text>
    </TouchableOpacity>
  );
}
