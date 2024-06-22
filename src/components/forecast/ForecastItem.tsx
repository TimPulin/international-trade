import { ISituationOnDate } from '@/types/meteo-type';
import itemStyle from './item.module.css';
import iconStyle from './small-meteo-icons.module.css';
import ButtonBase from '../button/ButtonBase';

type ForecastItemPropsType = {
  item: ISituationOnDate;
};

export default function ForecastItem(props: ForecastItemPropsType) {
  const { item } = props;

  const getDate = () => {
    const date = new Date(item.date);
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')} 
        ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const onClick = () => {
    console.log('click');
  };

  return (
    <li key={item.date}>
      <ButtonBase onClick={onClick} additionalClass={itemStyle.item}>
        <>
          <div
            className={`${iconStyle.sprite} ${iconStyle.icon} ${iconStyle[`icon_${item.icon}`]}`}
          ></div>
          {item.temperature}°C
          <div className={itemStyle.date}>{getDate()}</div>
        </>
      </ButtonBase>
    </li>
  );
}
