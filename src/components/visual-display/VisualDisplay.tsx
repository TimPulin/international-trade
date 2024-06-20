import { IMeteo } from '@/types/meteo-type';
import displayStyle from './visual-display.module.css';
import iconsStyle from './meteo-icons.module.css';

type VisualDisplayPropsType = {
  meteo: IMeteo | null;
};

export default function VisualDisplay(props: VisualDisplayPropsType) {
  const { meteo } = props;
  console.log(meteo);

  return (
    <div className={displayStyle.body}>
      <h3 style={{ textAlign: 'center' }}>VisualDisplay</h3>
      <div className={`${iconsStyle.sprite} ${iconsStyle.icon} ${iconsStyle.icon_36}`}></div>
    </div>
  );
}
