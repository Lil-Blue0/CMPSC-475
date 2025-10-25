import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";

import CurrentWeatherCard from "../CurrentWeatherCard";
import ForecastCard from "../ForecastCard";


export default function Forecast({
  wx,
  loading,
  error,
  refreshing,
  onRefresh,
  unit,
  getLocFromZip,
  toggleUnit,
}) {

  return (
    <View style={styles.container}>
      {!loading && wx && (
        <ScrollView
          style={styles.scrollStyle}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <CurrentWeatherCard wx={wx} unit={unit} />
          <ForecastCard wx={wx} unit={unit}/>
        </ScrollView>
      )}

      {loading && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              fontSize: 24,
              marginBottom: 20,
              fontWeight: "bold",
              color: "#00bd19",
            }}
          >
            Loading...
          </Text>
          <ActivityIndicator size={"large"} color={"#00bd19"} />
        </View>
      )}

      {error && <Text>Error: {error}</Text>}
    </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    },
    text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    },
});