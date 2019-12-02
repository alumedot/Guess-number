import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

import { IProps } from './types';
import { generateRandomBetween } from './functions';
import NumberContainer from 'components/NumberContainer';
import Card from 'components/Card';

import { Directions } from './constants';


const GameScreen = (props: IProps) => {
  const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice));
  const [rounds, setRounds] = useState(0);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds);
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
      currentLow.current = currentGuess;
    }
    setCurrentGuess(
      generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
    );
    setRounds(curRounds => curRounds + 1);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>
        {currentGuess}
      </NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={() => nextGuessHandler(Directions.Lower)} />
        <Button title="GREATER" onPress={() => nextGuessHandler(Directions.Greater)} />
      </Card>
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
    marginTop: 20,
    width: 300,
    maxWidth: '80%',
  },
});

export default GameScreen;
