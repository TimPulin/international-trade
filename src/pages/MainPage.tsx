import { useDispatch } from 'react-redux';

import {
  setFavorite,
  setMeteo,
  updateLocationMeteo,
} from '@/store/slices/location-meteo-list-slice';
import { selectActiveLocationMeteoUniqueId, selectLocationMeteoList } from '@/store/selectors';

import { MeteoCardContextProvider } from '@/contexts/MeteoCardContext';
import { getMeteo } from '@/api/server-connections';

import LocationForm, { OptionType } from '@/components/location-form/LocationForm';
import LocationMeteoList from '@/components/location-meteo-list/LocationMeteoList';
import { setLocalStorage } from '@/api/local-storage';

export default function MainPage() {
  const dispatch = useDispatch();
  const activeLocationMeteoUniqueId = selectActiveLocationMeteoUniqueId();
  const locationMeteoList = selectLocationMeteoList();

  async function updateLocationMeteoLocal(uniqueId: number, option: OptionType) {
    const result = await getMeteo(option.value);
    if (activeLocationMeteoUniqueId) {
      dispatch(
        updateLocationMeteo({
          uniqueId: uniqueId,
          locationId: option.value,
          locationName: option.label,
          isFavorite: false,
          isLoading: false,
          meteo: result.data,
        })
      );
      console.log('mainPage', uniqueId);
      console.log(locationMeteoList);
    }
  }

  function updateFavorite(uniqueId: number) {
    updateFavoriteStore(uniqueId);
    updateFavoriteLocalStorage();
  }

  function updateFavoriteStore(uniqueId: number) {
    if (activeLocationMeteoUniqueId) {
      dispatch(setFavorite({ uniqueId }));
    }
    console.log(locationMeteoList, uniqueId);
  }

  function updateFavoriteLocalStorage() {
    const favoriteList = locationMeteoList
      .filter((item) => item.isFavorite)
      .map((item) => ({
        uniqueId: item.uniqueId,
        locationId: item.locationId,
        locationName: item.locationName,
        isFavorite: item.isFavorite,
      }));
    setLocalStorage('locationMeteoList', favoriteList);
  }

  async function updateMeteoLocal(cityId: string) {
    const result = await getMeteo(cityId);
    if (activeLocationMeteoUniqueId) {
      dispatch(setMeteo({ uniqueId: activeLocationMeteoUniqueId, meteo: result.data }));
    }
  }

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
