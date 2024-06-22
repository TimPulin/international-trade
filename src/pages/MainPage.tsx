import { getMeteo } from '@/api/server-connections';
import MeteoCard from '@/components/meteo-card/MeteoCard';
import LocationForm from '@/components/location-form/LocationForm';
import { IMeteo } from '@/types/meteo-type';
import { useState } from 'react';
import { MeteoCardContextProvider } from '@/contexts/MeteoCardContext';

export default function MainPage() {
  const [weather, setWeather] = useState<IMeteo | null>(null);

  async function getWeather(city: string) {
    const result = await getMeteo(city);
    setWeather(result.data);
  }

  return (
    <div className="container">
      <h1>Прогноз погоды</h1>
      <MeteoCardContextProvider>
        <MeteoCard meteo={weather} />
      </MeteoCardContextProvider>
      <LocationForm onSubmit={getWeather} />
    </div>
  );
}
