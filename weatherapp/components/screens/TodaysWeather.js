import { View, Text, StyleSheet } from 'react-native';
import { cTof, codeToEmoji } from '../../utils/weather';

export default function TodaysWeather({ route }) {
  const { dayData, unit, wx, index } = route.params;

  if (!dayData || !wx) {
    return (
      <View style={styles.container}>
        <Text>No data available.</Text>
      </View>
    );
  }

  const tempUnit = unit === 'F' ? '°F' : '°C';
  const min = unit === 'F' ? Math.round(cTof(dayData.min)) : Math.round(dayData.min);
  const max = unit === 'F' ? Math.round(cTof(dayData.max)) : Math.round(dayData.max);

  const windSpeed = wx.current_weather.windspeed;
  const windDirection = wx.current_weather.winddirection;


  return (
    <View style={styles.container}>
      <Text style={styles.date}>{dayData.date}</Text>
      <Text style={styles.emoji}>{codeToEmoji(dayData.weathercode)}</Text>
      <Text style={styles.temp}>High: {max}{tempUnit}</Text>
      <Text style={styles.temp}>Low: {min}{tempUnit}</Text>
      <Text style={styles.temp}>Wind: {windSpeed} km/h</Text>
      <Text style={styles.temp}>Direction: {windDirection}°</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  date: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  temp: {
    fontSize: 20,
    marginVertical: 5,
  },
  emoji: {
    fontSize: 32,
    marginBottom: 20,
  }
});
