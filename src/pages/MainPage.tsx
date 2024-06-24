import { useDispatch } from 'react-redux';

import * as locationMeteoState from '@/store/slices/location-meteo-list-slice';

import * as locationMeteo from '@/store/selectors';

import { MeteoCardContextProvider } from '@/contexts/MeteoCardContext';
import { getMeteo } from '@/api/server-connections';

import LocationForm, { OptionType } from '@/components/location-form/LocationForm';
import LocationMeteoList from '@/components/location-meteo-list/LocationMeteoList';
import { setLocalStorage } from '@/api/local-storage';
import { useEffect } from 'react';

export default function MainPage() {
  const dispatch = useDispatch();
  const activeLocationMeteoUniqueId = locationMeteo.selectActiveUniqueId();
  const locationMeteoList = locationMeteo.selectList();
  const favoriteLocationMeteoList = locationMeteo.selectFavoriteList();

  async function updateLocationMeteoLocal(uniqueId: number, option: OptionType) {
    const response = await getMeteo(option.value);
    if (activeLocationMeteoUniqueId) {
      const locationIndex = locationMeteoList.findIndex((item) => item.uniqueId === uniqueId);
      const isFavorite = locationMeteoList[locationIndex].isFavorite;
      if (isFavorite) {
        dispatch(
          locationMeteoState.addLocation({
            uniqueId: Date.now(),
            locationId: option.value,
            locationName: option.label,
            isFavorite: false,
            isLoading: false,
            meteo: response.data,
          })
        );
      } else {
        dispatch(
          locationMeteoState.updateLocation({
            uniqueId: uniqueId,
            locationId: option.value,
            locationName: option.label,
            isFavorite: false,
            isLoading: false,
            meteo: response.data,
          })
        );
      }
    }
  }

  function updateFavorite(uniqueId: number) {
    if (activeLocationMeteoUniqueId) {
      dispatch(locationMeteoState.setFavorite({ uniqueId }));
    }
  }

  function updateFavoriteLocalStorage() {
    const shortList = favoriteLocationMeteoList.map((item) => ({
      uniqueId: item.uniqueId,
      locationId: item.locationId,
      locationName: item.locationName,
      isFavorite: item.isFavorite,
    }));

    setLocalStorage('locationMeteoList', shortList);
  }

  async function updateMeteoLocal(cityId: string) {
    const result = await getMeteo(cityId);
    if (activeLocationMeteoUniqueId) {
      dispatch(
        locationMeteoState.setMeteo({ uniqueId: activeLocationMeteoUniqueId, meteo: result.data })
      );
    }
  }

  useEffect(() => {
    updateFavoriteLocalStorage();
  }, [favoriteLocationMeteoList]);

  return (
    <div className="container">
      <h1>Прогноз погоды</h1>
      <MeteoCardContextProvider>
        <LocationMeteoList onReload={updateMeteoLocal} onFavorite={updateFavorite} />
      </MeteoCardContextProvider>
      <LocationForm onSubmit={updateLocationMeteoLocal} />
    </div>
  );
}
