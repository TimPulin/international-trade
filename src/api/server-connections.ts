import { meteoSourceAPI } from './axios-instance';
const token = import.meta.env.VITE_METEO_SOURCE_TOKEN;

export function getMeteo(placeId: string) {
  return meteoSourceAPI.get(`/point?place_id=${placeId}&key=${token}`);
}

export function findPlace(text: string) {
  meteoSourceAPI.get(`/find_places_prefix?text=${text}&key=${token}`);
}

export function getGeocoding(text: string) {
  meteoSourceAPI.get(`/direct?q=${text}&limit=5&key=${token}`);
}

findPlace('Sankt-Petersburg');
