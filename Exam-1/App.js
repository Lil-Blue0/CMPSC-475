import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import DATA from './data/data-1.js';

export default function App() {

  const [quote, setQuote] = useState('')
  const [author, setAuthor] = useState('')

  const getQuote = () =>{

    let DATA = require('./data/data-1.js').DATA
    let quoteIndex = Math.floor(Math.random() * DATA.length)

    setQuote(DATA[quoteIndex].quote)
    setAuthor(DATA[quoteIndex].author)
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.headerFont}>Welcome To</Text>
      <Text style={styles.headerFont}>Random Quote!</Text>
      </View>
      <View style={{marginTop: 50, marginLeft: 130, width: 150}}>
      <Button title='LOAD NEW QUOTE' onPress={getQuote}/>
      </View>
      <View style={styles.quote}>
        <Text style={styles.quoteFont}>{quote ? quote : "Click the button to load a quote"}</Text>
        <Text style={styles.quoteFont}>{author}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#982efbff',

  },
  header: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',

  },
  headerFont: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',

  },
  quote: {
    width: '80%',
    height: 200,
    borderRadius: 20,
    backgroundColor: 'white',
    marginLeft: 40,
    marginTop: 50,
    padding: 20,
  },
  quoteFont: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});