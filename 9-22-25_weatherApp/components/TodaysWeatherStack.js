import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Forecast from '../components/screens/Forecast';
import TodaysWeather from '../components/screens/TodaysWeather';

const Stack = createStackNavigator();

export default function ForecastStack(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Five-Day Forecast" options={{ headerShown: false }}>
        {(navProps) => <Forecast {...navProps} {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="TodaysWeather"
        component={TodaysWeather}
        options={({ route }) => ({
          title: `Details for ${route.params.dayData.date}`,
          headerBackTitle: 'Back',
        })}
      />
    </Stack.Navigator>
  );
}