import { getMeteo } from '@/api/server-connections';
import VisualDisplay from '@/components/VisualDisplay';
import { useEffect } from 'react';

export default function MainPage() {
  async function getWeather() {
    // const result = await getMeteo('saint-petersburg');
    // console.log('result', result);
  }

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div className="container">
      <h1>main</h1>
      <VisualDisplay />
    </div>
  );
}
