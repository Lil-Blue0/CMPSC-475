import { StyleSheet, View, Text, Image } from "react-native";
import AppButton from "./ui/AppButton";

export default function Sticker({label, imageSrc, onCollect, count}) {

  return (
    <View style={styles.card}>
      <Image source={imageSrc} style={{ width: 125, height: 125, }} accessibilityLabel={label}/>
      <Text style={styles.count}>{count}</Text>
      <Text style={styles.label}>{label}</Text>
      <AppButton style={styles.button} title="Collect" onPress={onCollect} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginTop: 25,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 10,
  },
  count: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
  },
  label: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  }
});
