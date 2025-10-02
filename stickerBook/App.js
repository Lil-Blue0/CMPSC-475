import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Sticker from "./Components/Sticker";
import { useState } from "react";

const Stickers = [
  { id: 1, label: 'star', imageSrc: require('./assets/stickers/star.png'), count: 0 },
  { id: 2, label: 'Football', imageSrc: require('./assets/stickers/Football.png'), count: 0 },
  { id: 3, label: 'owl', imageSrc: require('./assets/stickers/owl.webp'), count: 0 },
  { id: 4, label: 'penguin', imageSrc: require('./assets/stickers/penguin.png'), count: 0 },
];

export default function App() {
  const [stickers, setStickers] = useState(Stickers);
  
  const onCollect = (id) => {
    setStickers(currentStickers =>
      currentStickers.map(sticker =>
        sticker.id === id ? { ...sticker, count: sticker.count + 1 } : sticker
      )
    );
  };

  let totalCollected = 0;
  stickers.forEach(sticker => {
    totalCollected += sticker.count;
  });

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={{fontSize: 16, fontWeight: "bold", textAlign: "center"}}>Sticker Book</Text>
        <Text style={{fontSize: 14, textAlign: "center"}}>Collected: {totalCollected}</Text>
      <View style={styles.grid}>
        {stickers.map(sticker => (
          <Sticker
            key={sticker.id}
            label={sticker.label}
            imageSrc={sticker.imageSrc}
            onCollect={() => onCollect(sticker.id)}
            count={sticker.count}
          />
        ))}
      </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 50,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    padding: 5,
  },
});
