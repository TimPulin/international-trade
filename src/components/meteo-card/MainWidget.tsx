import bigMeteoIconsStyle from './meteo-icons.module.css';
import widgetStyles from './main-widget.module.css';
import { useMeteoCard } from '@/contexts/MeteoCardContext';

export default function MainWidget() {
  const { mainWidgetData } = useMeteoCard();
  const getIconNumber = () => {
    return mainWidgetData ? mainWidgetData.iconNumber : 0;
  };

  return (
    <div className={widgetStyles.widget}>
      <div className={widgetStyles.grid}>
        <h3 className={widgetStyles.title}>
          {mainWidgetData?.date ? mainWidgetData.date : 'Прямо сейчас'}
        </h3>
        <div>
          <div
            className={`${bigMeteoIconsStyle.sprite} ${bigMeteoIconsStyle.icon} ${bigMeteoIconsStyle[`icon_${getIconNumber()}`]}`}
          ></div>
        </div>
        <div className={widgetStyles.info}>
          <div>Температура: {mainWidgetData ? `${mainWidgetData.temperature}°C` : '...'}</div>
          <div>Ветер: {mainWidgetData ? `${mainWidgetData.wind.speed} м/с` : '...'}</div>
          <div>Осадки: {mainWidgetData ? `${mainWidgetData.precipitation.total} мм` : '...'}</div>
        </div>
      </div>
    </div>
  );
}
