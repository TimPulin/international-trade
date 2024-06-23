import { useEffect } from 'react';
import { setLocalStorage, getLocalStorage } from './api/local-storage';

import MainPage from './pages/MainPage';
import { isJSONValid } from './utils/is-json-valid';

export default function App() {
  function checkLocalStorage() {
    const localStorageValue = getLocalStorage('locationMeteoList');

    if (isJSONValid(localStorageValue)) {
      console.log(localStorageValue);
    }
  }

  useEffect(() => {
    checkLocalStorage();
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
