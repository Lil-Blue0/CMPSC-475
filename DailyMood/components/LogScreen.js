import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

import AppButton from "./ui/AppButton";
import MoodButton from "./ui/MoodButton";



export default function LogScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.MoodButtonContainer}>
        <MoodButton img={require('../assets/0.png')} />
        <MoodButton img={require('../assets/1.png')} />
        <MoodButton img={require('../assets/2.png')} />
        <MoodButton img={require('../assets/3.png')} />
        <MoodButton img={require('../assets/4.png')} />
      </View>
      <Text>Select a mood</Text>
      <AppButton title="Submit" onPress={() => alert('Mood Logged!')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  MoodButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
});