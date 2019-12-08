import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { IProps } from './types';
import { generateRandomBetween } from './functions';
import NumberContainer from 'components/NumberContainer';
import Card from 'components/Card';
import MainButton from 'components/custom/MainButton';
import List from './List';

import { Directions } from './constants';


const GameScreen = (props: IProps) => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState<string[]>([initialGuess.toString()]);
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

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

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction: string) => {
    if (
      (direction === Directions.Lower && currentGuess < userChoice) ||
      (direction === Directions.Greater && currentGuess > userChoice)
    ) {
      Alert.alert(
        "Don't lie!",
        'You know that this is wrong...',
        [{
          text: 'Sorry!',
          style: 'cancel',
        }]
      );
      return;
    }
    if (direction === Directions.Lower) {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );

    setCurrentGuess(nextNumber);
    setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses])
  };

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text>Opponent's Guess</Text>
        <View style={styles.controls}>
          <MainButton onPress={() => nextGuessHandler(Directions.Lower)}>
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
          <NumberContainer>
            {currentGuess}
          </NumberContainer>
          <MainButton onPress={() => nextGuessHandler(Directions.Greater)}>
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </View>
        <List
          dimensions={{
            width: availableDeviceWidth,
            height: availableDeviceHeight,
          }}
          guesses={pastGuesses}
        />
      </View>
    )
  }

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>
        {currentGuess}
      </NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={() => nextGuessHandler(Directions.Lower)}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={() => nextGuessHandler(Directions.Greater)}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <List
        dimensions={{
          width: availableDeviceWidth,
          height: availableDeviceHeight,
        }}
        guesses={pastGuesses}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
    width: 400,
    maxWidth: '90%',
  },
  controls: {
    width: '80%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});

export default GameScreen;
