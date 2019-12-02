import { TextInputProps } from 'react-native';

export interface IProps extends TextInputProps {
  style: {[key: string]: string | number};
}
