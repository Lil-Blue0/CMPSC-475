import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import AppButton from "./ui/AppButton";


export default function FlashCard({ question, answer,}) {

    const [flipped, setFlipped] = React.useState(false);

    return(
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.label}>{flipped ? answer : question}</Text>
            </View>
            <AppButton style={styles.button} title="Flip" onPress={() => setFlipped(!flipped)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    card: {
      backgroundColor: '#a9a9a9ff',
      width: 300,
      height: 200,
      borderRadius: 16,
      marginBottom: 10,
    },
    label: {
      color: "black",
      textAlign: "center",
        fontWeight: "bold",
        marginTop: 20,
        fontSize: 20,
        padding: 10,
    }
  });