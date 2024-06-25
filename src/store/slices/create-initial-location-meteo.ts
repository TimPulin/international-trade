import { Units } from '@/types/units-enum';

export const createInitialLocationMeteo = () => {
  const uniqueId = Date.now();
  return {
    uniqueId,
    locationId: '',
    locationName: '',
    isFavorite: false,
    isLoading: false,
    units: Units.METRIC,
    meteo: null,
  };
};
