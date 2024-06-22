import { useDispatch } from 'react-redux';

import { updateLocationMeteo } from '@/store/slices/location-meteo-list-slice';
import { useActiveLocationMeteoUniqueId } from '@/store/selectors';

import { MeteoCardContextProvider } from '@/contexts/MeteoCardContext';
import { getMeteo } from '@/api/server-connections';

import LocationForm, { OptionType } from '@/components/location-form/LocationForm';
import LocationMeteoList from '@/components/location-meteo-list/LocationMeteoList';

// import { meteo } from '../../mok/meteo';

export default function MainPage() {
  const dispatch = useDispatch();
  const activeLocationMeteoUniqueId = useActiveLocationMeteoUniqueId();

  async function getWeather(option: OptionType) {
    const result = await getMeteo(option.value);

    dispatch(
      updateLocationMeteo({
        uniqueId: activeLocationMeteoUniqueId,
        locationId: option.value,
        locationName: option.label,
        isFavorite: false,
        isLoading: false,
        meteo: result.data,
      })
    );
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
