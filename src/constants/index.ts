import { StyleSheet } from 'react-native';


export enum Fonts {
  OpenSans = 'open-sans',
  OpenSansBold = 'open-sans-bold',
}

export enum Colors {
  primary = '#f7287b',
  accent = '#c717fc',
}

export const defaultStyles = StyleSheet.create({
  bodyText: {
    fontFamily: Fonts.OpenSans,
  },
  title: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 18,
  }
});
