import { useEffect, useRef } from 'react';
import ForecastItem from './ForecastItem';
import forecastStyle from './forecast.module.css';
import { IHourly } from '@/types/meteo-type';

type ForecastPropsType = {
  forecast: IHourly;
};

export default function Forecast(props: ForecastPropsType) {
  const { forecast } = props;
  const listRef = useRef<HTMLUListElement>(null);

  function handleScroll(event: WheelEvent) {
    if (listRef.current) {
      listRef.current.scrollLeft += event.deltaY;
    }
  }

  useEffect(() => {
    if (listRef.current) {
      listRef.current?.addEventListener('wheel', handleScroll);
    }
  }, [listRef.current]);

  return (
    <div className={forecastStyle.forecast}>
      <h3>Прогноз</h3>

      <ul className={`${forecastStyle.list}`} ref={listRef}>
        {forecast.data.map((item) => (
          <ForecastItem key={item.date} item={item} />
        ))}
      </ul>
    </div>
  );
}
