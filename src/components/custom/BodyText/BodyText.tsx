import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { Fonts } from 'constants';
import { IProps } from './types';


const BodyText = (props: IProps) => {
  return (
    <Text style={{...styles.body, ...props.style}}>{props.children}</Text>
  )
};

const styles = StyleSheet.create({
  body: {
    fontFamily: Fonts.OpenSans,
  }
});

export default BodyText;
