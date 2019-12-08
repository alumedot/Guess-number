import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView, Dimensions,
} from 'react-native';

import BodyText from 'components/custom/BodyText';
import TitleText from 'components/custom/TitleText';
import MainButton from 'components/custom/MainButton';

import { IProps } from './types';
import { Colors, Fonts } from 'constants';


const GameOverScreen = (props: IProps) => {
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get('window').width);
      setAvailableDeviceHeight(Dimensions.get('window').height);
    };

    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    }
  });

  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>The Game is Over!</TitleText>
        <View
          style={{
            ...styles.imageContainer,
            width: availableDeviceWidth * 0.7,
            height: availableDeviceWidth * 0.7,
            borderRadius: availableDeviceWidth * 0.7 / 2,
            marginVertical: availableDeviceHeight / 30,
          }}
        >
          <Image
            style={styles.image}
            source={require('../../../assets/success.png')}
            resizeMode="cover"
          />
        </View>
        <View
          style={{
            ...styles.resultContainer,
            marginVertical: availableDeviceHeight / 60,
          }}
        >
          <BodyText 
            style={{
              ...styles.resultText,
              fontSize: availableDeviceHeight < 400 ? 16 : 20,
            }}
          >
            Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds
            to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>
          </BodyText>
        </View>
        <MainButton onPress={props.onRestart}>
          NEW GAME
        </MainButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  imageContainer: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  highlight: {
    color: Colors.primary,
    fontFamily: Fonts.OpenSansBold,
  },
  resultContainer: {
    marginHorizontal: 30,
  },
  resultText: {
    textAlign: 'center',
  }
});

export default GameOverScreen;
