import { IMeteo } from '@/types/meteo-type';
import displayStyle from './visual-display.module.css';

import ReloadIcon from '../icons/ReloadIcon';
import ButtonBase from '../button/ButtonBase';
import FavoriteIcon from '../icons/FavoriteIcon';
import buttonStyles from '../button/button.module.css';
import Forecast from '../forecast/Forecast';
import MainWidget from './MainWidget';
import { useEffect } from 'react';
import { useMeteoCard } from '@/contexts/MeteoCardContext';
import { LocationMeteoType } from '@/store/slices/location-meteo-list-slice';

type MeteoCardPropsType = {
  locationMeteo: LocationMeteoType;
  onReload: (cityId: string) => void;
};

export default function MeteoCard(props: MeteoCardPropsType) {
  const { locationMeteo, onReload } = props;

  const { setMainWidgetData, mainWidgetData } = useMeteoCard();

  const onClickFavorite = () => {
    console.log('favorite');
  };

  useEffect(() => {
    if (locationMeteo.meteo !== null && locationMeteo.meteo !== undefined) {
      setMainWidgetData({
        iconNumber: locationMeteo.meteo.current.icon_num,
        temperature: locationMeteo.meteo.current.temperature,
        wind: locationMeteo.meteo.current.wind,
        precipitation: locationMeteo.meteo.current.precipitation,
      });
    } else {
      setMainWidgetData(null);
    }
  }, [locationMeteo]);

  if (!locationMeteo.meteo || !mainWidgetData)
    return (
      <div className={`${displayStyle.cardEmpty} ${displayStyle.card}`}>Что там с погодой?</div>
    );

  return (
    <div className={displayStyle.card}>
      <ButtonBase
        onClick={onClickFavorite}
        additionalClass={`${buttonStyles.buttonFavorite}  ${displayStyle.btnFavorite}`}
      >
        <FavoriteIcon />
      </ButtonBase>
      <div className={displayStyle.body}>
        <MainWidget />
        <Forecast forecast={locationMeteo.meteo.hourly} />
      </div>
      <div className={displayStyle.footer}>
        <ButtonBase onClick={() => onReload(locationMeteo.locationId)}>
          <ReloadIcon />
        </ButtonBase>
      </div>
    </div>
  );
}
