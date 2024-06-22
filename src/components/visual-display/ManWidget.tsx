import bigMeteoIconsStyle from './meteo-icons.module.css';
import { IPrecipitation, IWind } from '@/types/meteo-type';

export type ManWidgetPropsType = {
  meteo: {
    date?: string;
    iconNumber: number;
    temperature: number;
    wind: IWind;
    precipitation: IPrecipitation;
  } | null;
};

export default function ManWidget(prop: ManWidgetPropsType) {
  const { meteo } = prop;
  const getIconNumber = () => {
    return meteo ? meteo.iconNumber : 0;
  };

  return (
    <div>
      <div>
        <div
          className={`${bigMeteoIconsStyle.sprite} ${bigMeteoIconsStyle.icon} ${bigMeteoIconsStyle[`icon_${getIconNumber()}`]}`}
        ></div>
      </div>
      <div>
        <div>Температура: {meteo ? `${meteo.temperature}°C` : '...'}</div>
        <div>Ветер: {meteo ? `${meteo.wind.speed} м/с` : '...'}</div>
        <div>Осадки: {meteo ? `${meteo.precipitation.total} мм` : '...'}</div>
      </div>
    </div>
  );
}
