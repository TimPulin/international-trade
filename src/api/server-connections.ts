import { meteoSourceAPI } from './axios-instance';
import { IPlace } from '@/types/place-type';
const token = import.meta.env.VITE_METEO_SOURCE_TOKEN;

import { meteo } from '../../mok/meteo';

export function getMeteo(placeId: string) {
  //   return meteoSourceAPI.get(`/point?place_id=${placeId}&key=${token}`);
  return { data: meteo };
}

export function findPlace(text: string) {
  return meteoSourceAPI.get<IPlace[]>(`/find_places_prefix?text=${text}&key=${token}`);
}

export function getGeocoding(text: string) {
  meteoSourceAPI.get(`/direct?q=${text}&limit=5&key=${token}`);
}
