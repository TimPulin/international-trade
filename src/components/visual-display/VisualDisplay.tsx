import { IMeteo } from '@/types/meteo-type';
import displayStyle from './visual-display.module.css';
import iconsStyle from './meteo-icons.module.css';

type VisualDisplayPropsType = {
  meteo: IMeteo | null;
};

export default function VisualDisplay(props: VisualDisplayPropsType) {
  const { meteo } = props;
  console.log(meteo);

  const getIconName = () => {
    return meteo ? `icon_${meteo.current.icon_num}` : '';
  };

  return (
    <div className={displayStyle.card}>
      <h3 className={displayStyle.title}>VisualDisplay</h3>
      <div className={displayStyle.body}>
        <div className={`${displayStyle.iconSection} ${displayStyle.section}`}>
          <div
            className={`${iconsStyle.sprite} ${iconsStyle.icon} ${iconsStyle[getIconName()]}`}
          ></div>
        </div>
        <div className={`${displayStyle.infoSection} ${displayStyle.section}`}>
          <div>Температура: {meteo ? `${meteo.current.temperature}°C` : '...'}</div>
          <div>Ветер: {meteo ? `${meteo.current.wind.speed} м/с` : '...'}</div>
          <div>Осадки: {meteo ? `${meteo.current.precipitation.total} мм` : '...'}</div>
        </div>
      </div>
    </div>
  );
}
