import { useEffect } from 'react';
import { setLocalStorage, getLocalStorage, localStorageType } from './api/local-storage';

import MainPage from './pages/MainPage';
import { isJSONValid } from './utils/json-validation/is-json-valid';
import { isObjectValid } from './utils/json-validation/is-object-valid';
import { validateLocationMeteoLocalStorageJSON } from './utils/json-validation/ajv-init';
import { useDispatch } from 'react-redux';
import { addEmptyLocationMeteo, addLocationMeteo } from './store/slices/location-meteo-list-slice';
import { getMeteo } from './api/server-connections';

export default function App() {
  const dispatch = useDispatch();

  function onAppLoad() {
    const favoriteList = getFavoriteListFromLocalStorage();
    if (favoriteList) {
      addFavorites(favoriteList);
    } else {
      dispatch(addEmptyLocationMeteo());
    }
  }

  function getFavoriteListFromLocalStorage() {
    let favoriteList = null;
    const localStorageValue = getLocalStorage('locationMeteoList');

    if (isJSONValid(localStorageValue)) {
      const parsed: localStorageType[] = JSON.parse(localStorageValue);
      if (isObjectValid<localStorageType[]>(validateLocationMeteoLocalStorageJSON, parsed)) {
        favoriteList = parsed;
      }
    }
    return favoriteList;
  }

  function addFavorites(favoriteList: localStorageType[]) {
    favoriteList.forEach(async (item) => {
      const response = await getMeteo(item.locationId);
      dispatch(
        addLocationMeteo({
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
    // setLocalStorage('locationMeteoList', [
    //   {
    //     uniqueId: 1719145412480,
    //     isFavorite: false,
    //     locationId: 'sochi',
    //     locationName: 'Sochi, Russia',
    //   },
    // ]);
  }, []);
  return (
    <div>
      <MainPage />
    </div>
  );
}
