import { IMeteo } from '@/types/meteo-type';
import displayStyle from './visual-display.module.css';
import bigMeteoIconsStyle from './meteo-icons.module.css';
import ReloadIcon from '../icons/ReloadIcon';
import ButtonBase from '../button/ButtonBase';
import FavoriteIcon from '../icons/FavoriteIcon';
import buttonStyles from '../button/button.module.css';
import Forecast from '../forecast/Forecast';

type VisualDisplayPropsType = {
  meteo: IMeteo | null;
};

export default function VisualDisplay(props: VisualDisplayPropsType) {
  const { meteo } = props;
  console.log(meteo);

  const getIconName = () => {
    return meteo ? `icon_${meteo.current.icon_num}` : '';
  };

  const onClickFavorite = () => {
    console.log('favorite');
  };

  const onClickReload = () => {
    console.log('reload');
  };

  if (!meteo) return <div>loading...</div>;

  return (
    <div className={displayStyle.card}>
      <h3 className={displayStyle.title}>VisualDisplay</h3>
      <ButtonBase
        onClick={onClickFavorite}
        additionalClass={`${buttonStyles.buttonFavorite}  ${displayStyle.btnFavorite}`}
      >
        <FavoriteIcon />
      </ButtonBase>
      <div className={displayStyle.body}>
        <div className={`${displayStyle.iconSection} ${displayStyle.section}`}>
          <div
            className={`${bigMeteoIconsStyle.sprite} ${bigMeteoIconsStyle.icon} ${bigMeteoIconsStyle[getIconName()]}`}
          ></div>
        </div>
        <div className={`${displayStyle.infoSection} ${displayStyle.section}`}>
          <div>Температура: {meteo ? `${meteo.current.temperature}°C` : '...'}</div>
          <div>Ветер: {meteo ? `${meteo.current.wind.speed} м/с` : '...'}</div>
          <div>Осадки: {meteo ? `${meteo.current.precipitation.total} мм` : '...'}</div>
        </div>
        <Forecast forecast={meteo.hourly} />
      </div>
      <div className={displayStyle.footer}>
        <ButtonBase onClick={onClickReload}>
          <ReloadIcon />
        </ButtonBase>
      </div>
    </div>
  );
}
