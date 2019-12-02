import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { Fonts } from 'constants';
import { IProps } from './types';


const TitleText = (props: IProps) => {
  return (
    <Text style={{...styles.title, ...props.style}}>
      {props.children}
    </Text>
  )
};

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 18,
  }
});

export default TitleText;
