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
  onFavorite: (uniqueId: number) => void;
};

export default function MeteoCard(props: MeteoCardPropsType) {
  const { locationMeteo, onReload, onFavorite } = props;

  const { setMainWidgetData, mainWidgetData } = useMeteoCard();

  useEffect(() => {
    if (locationMeteo.meteo !== null && locationMeteo.meteo !== undefined) {
      setMainWidgetData({
        iconNumber: locationMeteo.meteo.current.icon_num,
        units: locationMeteo.units,
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
        onClick={() => onFavorite(locationMeteo.uniqueId)}
        additionalClass={`${buttonStyles.buttonFavorite}  ${displayStyle.buttonFavorite} 
        ${locationMeteo.isFavorite ? buttonStyles.buttonFavoriteActive : ''}`}
      >
        <FavoriteIcon />
      </ButtonBase>
      <div className={displayStyle.body}>
        <MainWidget />
        <Forecast units={locationMeteo.units} forecast={locationMeteo.meteo.hourly} />
      </div>
      <div className={displayStyle.footer}>
        <ButtonBase onClick={() => onReload(locationMeteo.locationId)}>
          <ReloadIcon />
        </ButtonBase>
      </div>
    </div>
  );
}
