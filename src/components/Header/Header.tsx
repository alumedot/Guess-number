import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

import { IProps } from './types';

import { Colors } from 'constants';
import TitleText from 'components/custom/TitleText';

interface IStyles {
  backgroundColor: string,
  borderBottomColor?: string,
  borderBottomWidth?: number,
}

const Header = (props: IProps) => {
  return (
    <View
      style={{
        ...styles.headerBase,
        ...Platform.select<IStyles>({
          android: styles.headerAndroid,
          ios: styles.headerIOS,
        })
      }}
    >
      <TitleText style={styles.title}>{props.title}</TitleText>
    </View>
  )
};

const styles = StyleSheet.create({
  headerBase: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIOS: {
    backgroundColor: 'white',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  headerAndroid: {
    backgroundColor: Colors.primary,
  },
  title: {
    color: Platform.OS === 'ios' ? Colors.primary : 'white',
  }
});

export default Header;
