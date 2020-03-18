import React, { useState } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GamesScreen';
import GameOverScreen from './screens/GaveOverScreen';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

 const fetchFonts= ()=>{
   return Font.loadAsync({
          'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
          'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    })
 };
export default function App() {

  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if(!dataLoaded){
    return  (<AppLoading
    startAsync={fetchFonts}
    onFinish={()=>{setDataLoaded(true)}}
    onError={(err) => (console.log(err))}
    />);
  };

  const configureGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };
  const StartGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);

  };

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  }

  let content = <StartGameScreen onStartGame={StartGameHandler} />;

  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />;
  }
  else if (guessRounds > 0) {
    content = <GameOverScreen UserNumber={userNumber}
     roundsNumber={guessRounds}
     onRestart={configureGameHandler} />;
  }


  return (
    <View style={styles.screen}>
      <Header title="Guess the Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

});
