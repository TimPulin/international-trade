import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addLocationMeteo } from '@/store/slices/location-meteo-list-slice';

import { MeteoCardContextProvider } from '@/contexts/MeteoCardContext';
import { getMeteo } from '@/api/server-connections';

import LocationForm, { OptionType } from '@/components/location-form/LocationForm';
import { IMeteo } from '@/types/meteo-type';
import LocationMeteoList from '@/components/location-meteo-list/LocationMeteoList';

// import { meteo } from '../../mok/meteo';

export default function MainPage() {
  const [weather, setWeather] = useState<IMeteo | null>(null);
  const dispatch = useDispatch();

  async function getWeather(option: OptionType) {
    const result = await getMeteo(option.value);

    const uniqueId = `${option.label.replace(' ', '-')}-${Date.now()}`;

    dispatch(
      addLocationMeteo({
        uniqueId,
        locationId: option.value,
        locationName: option.label,
        isFavorite: false,
        isLoading: false,
        meteo: result.data,
      })
    );
    setWeather(result.data);
  }

  return (
    <div className="container">
      <h1>Прогноз погоды</h1>
      <MeteoCardContextProvider>
        <LocationMeteoList />
      </MeteoCardContextProvider>
      <LocationForm onSubmit={getWeather} />
    </div>
  );
}
