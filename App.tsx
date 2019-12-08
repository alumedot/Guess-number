import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Header from 'components/Header';
import StartGameScreen from 'screens/StartGameScreen';
import GameScreen from 'screens/GameScreen';
import GameOverScreen from 'screens/GameOverScreen';


const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(error) => console.log(error)}
      />
    )
  }

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(0);
  };

  const startGameHandler = (selectedNumber: number) => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = (numOfRounds: number) => {
    setGuessRounds(numOfRounds);
  };

  let content = <StartGameScreen onStartGame={startGameHandler}/>;

  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen
        userChoice={userNumber}
        onGameOver={gameOverHandler}
      />
    );
  }
  if (guessRounds > 0) {
    content = (
      <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onRestart={configureNewGameHandler}
      />
    )
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Guess a Number"/>
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
});
