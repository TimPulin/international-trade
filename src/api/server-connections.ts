import { meteoSourceAPI } from './axios-instance';
import { IPlace } from '@/types/place-type';
import { Units } from '@/types/units-enum';
const token = import.meta.env.VITE_METEO_SOURCE_TOKEN;

import { IMeteo } from '@/types/meteo-type';

export function getMeteo(placeId: string, units?: Units) {
  console.log(units);

  if (!units) units = Units.METRIC;

  return meteoSourceAPI.get<IMeteo>(`/point?place_id=${placeId}&key=${token}&units=${units}`);
}

export function findPlace(text: string) {
  return meteoSourceAPI.get<IPlace[]>(`/find_places_prefix?text=${text}&key=${token}`);
}

export function getGeocoding(text: string) {
  meteoSourceAPI.get(`/direct?q=${text}&limit=5&key=${token}`);
}
