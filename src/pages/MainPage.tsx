import { getMeteo } from '@/api/server-connections';
import VisualDisplay from '@/components/visual-display/VisualDisplay';
import LocationForm from '@/components/location-form/LocationForm';
import { IMeteo } from '@/types/meteo-type';
import { useEffect, useState } from 'react';

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
      <h1>main</h1>
      <VisualDisplay meteo={weather} />
      <LocationForm />
    </div>
  );
}
