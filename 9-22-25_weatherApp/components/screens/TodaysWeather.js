import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import { codeToEmoji } from "../../utils/weather";

export default function TodaysWeather({ route }){
  const { dayData } = route.params;

   return (
    <View style={styles.container}>
      <Text style={styles.date}>{dayData.date}</Text>
      <Text style={styles.emoji}>{codeToEmoji(dayData.weathercode)}</Text>
      <Text style={styles.temp}>
        High: {dayData.max}{dayData.tempUnit}
      </Text>
      <Text style={styles.temp}>
        Low: {dayData.min}{dayData.tempUnit}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  date: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emoji: {
    fontSize: 100,
    marginBottom: 20,
  },
  temp: {
    fontSize: 24,
    color: '#333',
    marginVertical: 5,
  },
});