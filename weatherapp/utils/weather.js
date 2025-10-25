// utils/weather.js

// Simple mapping for a few common Open-Meteo weather codes
export const codeToEmoji = (code) => {
  // https://open-meteo.com/en/docs (Weather code "wmo code")
  if ([0].includes(code)) return "☀️ Clear";
  if ([1, 2].includes(code)) return "🌤️ Mostly clear";
  if ([3].includes(code)) return "☁️ Overcast";
  if ([45, 48].includes(code)) return "🌫️ Fog";
  if ([51, 53, 55, 56, 57].includes(code)) return "🌦️ Drizzle";
  if ([61, 63, 65, 66, 67].includes(code)) return "🌧️ Rain";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "❄️ Snow";
  if ([80, 81, 82].includes(code)) return "🌧️ Showers";
  if ([95, 96, 99].includes(code)) return "⛈️ Thunderstorm";
  return "🌡️ Weather";
};

export const cTof = (c) => (c * 9) / 5 + 32;
