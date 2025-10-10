import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import FlashCard from './components/FlashCard';
import AppButton from './components/ui/AppButton';
import flashcardsData from './data/flashcards.json';

export default function App() {
  const [screen, setScreen] = useState('home'); // 'home' or 'flashcard'
  const [currentCard, setCurrentCard] = useState(null);

  const pickRandomCard = () => {
    const allCards = flashcardsData.flashcards;
    const randomIndex = Math.floor(Math.random() * allCards.length);
    const card = allCards[randomIndex];
    setCurrentCard(card);
    setScreen('flashcard');
  };

  if (screen === 'home') {
    return (
      <View style={styles.container}>
        <AppButton title="Pick a Random Card" onPress={pickRandomCard} />
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {currentCard && (
        <FlashCard question={currentCard.question} answer={currentCard.answer} />
      )}
      <View style={styles.buttonContainer}>
        <AppButton title="Next Random Card" onPress={pickRandomCard} />
        <AppButton title="Home" onPress={() => setScreen('home')} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c2e7ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    width: '60%',
    justifyContent: 'space-around',
  }
});
