import { useEffect, useRef } from 'react';
import ForecastItem from './ForecastItem';
import forecastStyle from './forecast.module.css';
import { IHourly } from '@/types/meteo-type';
import { Units } from '@/types/units-enum';

type ForecastPropsType = {
  forecast: IHourly;
  units: Units;
};

/**
 * Component to display a forecast of the weather for multiple days.
 *
 * @param {IHourly} props.forecast - The forecast data for multiple days.
 * @param {Units} props.units - The units of measurement (metric or imperial).
 * @returns {JSX.Element} - The rendered component.
 */

export default function Forecast(props: ForecastPropsType) {
  const { forecast, units } = props;
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
          <ForecastItem key={item.date} item={item} units={units} />
        ))}
      </ul>
    </div>
  );
}
