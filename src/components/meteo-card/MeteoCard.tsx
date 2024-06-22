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

type MeteoCardPropsType = {
  meteo: IMeteo | null;
};

export default function MeteoCard(props: MeteoCardPropsType) {
  const { meteo } = props;
  const { setMainWidgetData, mainWidgetData } = useMeteoCard();

  const onClickFavorite = () => {
    console.log('favorite');
  };

  const onClickReload = () => {
    console.log('reload');
  };

  useEffect(() => {
    if (meteo !== null && meteo !== undefined) {
      setMainWidgetData({
        iconNumber: meteo.current.icon_num,
        temperature: meteo.current.temperature,
        wind: meteo.current.wind,
        precipitation: meteo.current.precipitation,
      });
    } else {
      setMainWidgetData(null);
    }
  }, [meteo]);

  if (!meteo || !mainWidgetData)
    return (
      <div className={`${displayStyle.cardEmpty} ${displayStyle.card}`}>Что там с погодой?</div>
    );

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
        <MainWidget />
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
