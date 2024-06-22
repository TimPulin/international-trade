import bigMeteoIconsStyle from './meteo-icons.module.css';
import widgetStyles from './main-widget.module.css';
import { IPrecipitation, IWind } from '@/types/meteo-type';

export type MainWidgetPropsType = {
  meteo: {
    date?: string;
    iconNumber: number;
    temperature: number;
    wind: IWind;
    precipitation: IPrecipitation;
  } | null;
};

export default function MainWidget(prop: MainWidgetPropsType) {
  const { meteo } = prop;
  const getIconNumber = () => {
    return meteo ? meteo.iconNumber : 0;
  };

  return (
    <div className={widgetStyles.widget}>
      <div className={widgetStyles.grid}>
        <h3 className={widgetStyles.title}>{meteo?.date ? meteo.date : 'Прямо сейчас'}</h3>
        <div>
          <div
            className={`${bigMeteoIconsStyle.sprite} ${bigMeteoIconsStyle.icon} ${bigMeteoIconsStyle[`icon_${getIconNumber()}`]}`}
          ></div>
        </div>
        <div className={widgetStyles.info}>
          <div>Температура: {meteo ? `${meteo.temperature}°C` : '...'}</div>
          <div>Ветер: {meteo ? `${meteo.wind.speed} м/с` : '...'}</div>
          <div>Осадки: {meteo ? `${meteo.precipitation.total} мм` : '...'}</div>
        </div>
      </div>
    </div>
  );
}
