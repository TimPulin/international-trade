import ForecastItem from './ForecastItem';
import forecastStyle from './forecast.module.css';
import { IHourly } from '@/types/meteo-type';

type ForecastPropsType = {
  forecast: IHourly;
};

export default function Forecast(props: ForecastPropsType) {
  const { forecast } = props;

  return (
    <div className={forecastStyle.forecast}>
      <h3>Прогноз</h3>

      <ul className={`${forecastStyle.list}`}>
        {forecast.data.map((item) => (
          <ForecastItem key={item.date} item={item} />
        ))}
      </ul>
    </div>
  );
}
