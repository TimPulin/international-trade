import axios from 'axios';

const BASE_URL = 'https://api.gismeteo.net/v2/weather';
const CURRENT_URL = '/current';
const FORECAST_URL = '/forecast/by_day_part';

const gisMeteoAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-Gismeteo-Token': import.meta.env.VITE_GISMETEO_TOKEN,
    'Content-Type': 'application/json',
  },
});

export { gisMeteoAPI, CURRENT_URL, FORECAST_URL };

// const BASE_URL = 'https://api.openweathermap.org/';
// const WEATHER = 'data/3.0/onecall';
// const GEO = 'geo/1.0/direct';

// 'https://api.openweathermap.org/data/3.0/';
// https://api.openweathermap.org/geo/1.0/direct

// api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=604dfd9f18f1fd17c1324b9d23a73a48
// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=604dfd9f18f1fd17c1324b9d23a73a48

// https://api.hh.ru/areas
