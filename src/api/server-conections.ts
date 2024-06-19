import { gisMeteoAPI, CURRENT_URL, FORECAST_URL } from './axios-instance';
const appKey = import.meta.env.VITE_WEATHER_API_TOKEN;

export function getTest() {
  return gisMeteoAPI.get(`${CURRENT_URL}/4368`);
}
// api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

// 59° 56' 3.409" N 30° 20' 6.355" E
