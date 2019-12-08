import { ReactNode } from 'react';

export interface IProps {
  children: ReactNode;
  onPress(): void;
}
