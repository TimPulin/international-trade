import { useEffect, useState } from 'react';
import { getLocalStorage, LocalStorageType } from './api/local-storage';

import MainPage from './pages/MainPage';
import { isJSONValid } from './utils/json-validation/is-json-valid';
import { isObjectValid } from './utils/json-validation/is-object-valid';
import { validateLocationMeteoLocalStorageJSON } from './utils/json-validation/ajv-init';
import { useDispatch } from 'react-redux';
import {
  addEmptyLocation,
  addLocation,
  setActiveUniqueId,
} from './store/slices/location-meteo-list-slice';
import { getMeteo } from './api/server-connections';

export default function App() {
  const dispatch = useDispatch();
  const [isAppLoading, setIsAppLoading] = useState(true);

  function onAppLoad() {
    setIsAppLoading(true);
    const favoriteList = getFavoriteListFromLocalStorage();
    if (favoriteList && favoriteList.length > 0) {
      addFavorites(favoriteList);
    } else {
      dispatch(addEmptyLocation());
    }
    setIsAppLoading(false);
  }

  function getFavoriteListFromLocalStorage() {
    let favoriteList = null;
    const localStorageValue = getLocalStorage('locationMeteoList');

    if (isJSONValid(localStorageValue)) {
      const parsed: LocalStorageType = JSON.parse(localStorageValue);
      if (isObjectValid<LocalStorageType>(validateLocationMeteoLocalStorageJSON, parsed)) {
        favoriteList = parsed;
      }
    }
    return favoriteList;
  }

  function addFavorites(favoriteList: LocalStorageType) {
    favoriteList.forEach(async (item) => {
      const response = await getMeteo(item.locationId);
      dispatch(
        addLocation({
          uniqueId: item.uniqueId,
          locationId: item.locationId,
          locationName: item.locationName,
          isFavorite: true,
          isLoading: false,
          meteo: response.data,
        })
      );
    });
  }

  useEffect(() => {
    onAppLoad();
  }, []);

  if (isAppLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MainPage />
    </div>
  );
}
