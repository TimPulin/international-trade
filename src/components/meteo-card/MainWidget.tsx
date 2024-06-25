import bigMeteoIconsStyle from './meteo-icons.module.css';
import widgetStyles from './main-widget.module.css';
import { useMeteoCard } from '@/contexts/MeteoCardContext';
import { formatDateFromString } from '@/utils/format-date';
import { Units } from '@/types/units-enum';

export default function MainWidget() {
  const { mainWidgetData } = useMeteoCard();

  const renderTemperatureUnits = () => {
    return mainWidgetData?.units === Units.METRIC ? '°C' : '°F';
  };

  const renderPrecipitationUnits = () => {
    return mainWidgetData?.units === Units.METRIC ? 'мм' : 'in';
  };

  const renderWindUnits = () => {
    return mainWidgetData?.units === Units.METRIC ? 'м/с' : 'mph';
  };

  const getIconNumber = () => {
    return mainWidgetData ? mainWidgetData.iconNumber : 0;
  };

  return (
    <div className={widgetStyles.widget}>
      <div className={widgetStyles.grid}>
        <h3 className={widgetStyles.title}>
          {mainWidgetData?.date ? formatDateFromString(mainWidgetData.date) : 'Прямо сейчас'}
        </h3>
        <div>
          <div
            className={`${bigMeteoIconsStyle.sprite} ${bigMeteoIconsStyle.icon} ${bigMeteoIconsStyle[`icon_${getIconNumber()}`]}`}
          ></div>
        </div>
        <div className={widgetStyles.info}>
          <div>
            Температура:{' '}
            {mainWidgetData ? `${mainWidgetData.temperature}${renderTemperatureUnits()} ` : '...'}
          </div>
          <div>
            Ветер: {mainWidgetData ? `${mainWidgetData.wind.speed} ${renderWindUnits()}` : '...'}
          </div>
          <div>
            Осадки:{' '}
            {mainWidgetData
              ? `${mainWidgetData.precipitation.total} ${renderPrecipitationUnits()}`
              : '...'}
          </div>
        </div>
      </div>
    </div>
  );
}
