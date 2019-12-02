import React from 'react';
import { View, StyleSheet } from 'react-native';

import { IProps } from './types';

import { Colors } from 'constants';
import TitleText from 'components/custom/TitleText';


const Header = (props: IProps) => {
  return (
    <View style={styles.header}>
      <TitleText>{props.title}</TitleText>
    </View>
  )
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Header;
