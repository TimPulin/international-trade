import { LocationMeteoType } from '@/store/slices/location-meteo-list-slice';

import locationMeteoStyles from './location-meteo-list.module.css';
import ButtonBase from '../button/ButtonBase';

type LocationMeteoItemType = {
  tabIndex: number;
  index: number;
  item: LocationMeteoType;
  onClick: (index: number, uniqueId: number) => void;
};

export default function LocationMeteoItem(props: LocationMeteoItemType) {
  const { tabIndex, index, item, onClick } = props;
  if (item.locationName === '') return null;

  return (
    <li
      key={item.uniqueId}
      className={`${locationMeteoStyles.tab} ${tabIndex === index ? locationMeteoStyles.tabActive : ''}`}
    >
      <ButtonBase onClick={() => onClick(index, item.uniqueId)}>
        {item.locationName.split(',')[0]}
      </ButtonBase>
    </li>
  );
}
