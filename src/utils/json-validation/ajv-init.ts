import Ajv from 'ajv';
import { locationMeteoLocalStorageSchema } from './location-meteo-local-storage-schema';

const ajv = new Ajv();
export const validateLocationMeteoLocalStorageJSON = ajv.compile(locationMeteoLocalStorageSchema);
