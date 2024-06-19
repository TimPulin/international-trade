import { getTest } from '@/api/server-conections';
import { useEffect } from 'react';

export default function MainPage() {
  useEffect(() => {
    const result = getTest();
    console.log(result);
  }, []);

  return (
    <div className="container">
      <h1>main</h1>
    </div>
  );
}
