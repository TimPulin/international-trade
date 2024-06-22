import { IMeteo } from '@/types/meteo-type';
import displayStyle from './visual-display.module.css';

import ReloadIcon from '../icons/ReloadIcon';
import ButtonBase from '../button/ButtonBase';
import FavoriteIcon from '../icons/FavoriteIcon';
import buttonStyles from '../button/button.module.css';
import Forecast from '../forecast/Forecast';
import ManWidget, { ManWidgetPropsType } from './ManWidget';
import { useEffect, useState } from 'react';

type VisualDisplayPropsType = {
  meteo: IMeteo | null;
};

export default function VisualDisplay(props: VisualDisplayPropsType) {
  const { meteo } = props;
  const [mainWidgetMeteo, setMainWidgetMeteo] = useState<ManWidgetPropsType | null>(null);

  const onClickFavorite = () => {
    console.log('favorite');
  };

  const onClickReload = () => {
    console.log('reload');
  };

  useEffect(() => {
    if (meteo !== null && meteo !== undefined) {
      setMainWidgetMeteo({
        meteo: {
          iconNumber: meteo.current.icon_num,
          temperature: meteo.current.temperature,
          wind: meteo.current.wind,
          precipitation: meteo.current.precipitation,
        },
      });
    } else {
      setMainWidgetMeteo(null);
    }
  }, [meteo]);

  if (!meteo || !mainWidgetMeteo) return <div>loading...</div>;

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
        <ManWidget meteo={mainWidgetMeteo?.meteo} />
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
