import { getMeteo } from '@/api/server-connections';
import MeteoCard from '@/components/meteo-card/MeteoCard';
import LocationForm from '@/components/location-form/LocationForm';
import { IMeteo } from '@/types/meteo-type';
import { useEffect, useState } from 'react';
import { MeteoCardContextProvider } from '@/contexts/MeteoCardContext';

export default function MainPage() {
  const [weather, setWeather] = useState<IMeteo | null>(null);
  async function getWeather() {
    const result = await getMeteo('59.93863N,30.31413E');
    setWeather(result.data);
  }

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div className="container">
      <h1>Прогноз погоды</h1>
      <MeteoCardContextProvider>
        <MeteoCard meteo={weather} />
      </MeteoCardContextProvider>
      <LocationForm />
    </div>
  );
}
