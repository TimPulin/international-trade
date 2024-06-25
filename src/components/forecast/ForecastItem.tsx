import { useMeteoCard } from '@/contexts/MeteoCardContext';

import ButtonBase from '../button/ButtonBase';

import itemStyle from './item.module.css';
import iconStyle from './small-meteo-icons.module.css';
import { ISituationOnDate } from '@/types/meteo-type';
import { formatDateFromString } from '@/utils/format-date';
import { Units } from '@/types/units-enum';

type ForecastItemPropsType = {
  item: ISituationOnDate;
  units: Units;
};

export default function ForecastItem(props: ForecastItemPropsType) {
  const { item, units } = props;
  const { setMainWidgetData } = useMeteoCard();

  const renderTemperatureUnits = () => {
    return units === Units.METRIC ? '°C' : '°F';
  };

  const sendDataToMainWidget = () => {
    setMainWidgetData({
      date: item.date,
      iconNumber: item.icon,
      units: units,
      temperature: item.temperature,
      wind: item.wind,
      precipitation: item.precipitation,
    });
  };

  return (
    <li key={item.date}>
      <ButtonBase onClick={sendDataToMainWidget} additionalClass={itemStyle.item}>
        <>
          <div
            className={`${iconStyle.sprite} ${iconStyle.icon} ${iconStyle[`icon_${item.icon}`]}`}
          ></div>
          {item.temperature}
          {renderTemperatureUnits()}
          <div className={itemStyle.date}>{formatDateFromString(item.date)}</div>
        </>
      </ButtonBase>
    </li>
  );
}
