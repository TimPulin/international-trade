import { useEffect, useState } from 'react';
import { selectList } from '@/store/selectors';

import MeteoCard from '@/components/meteo-card/MeteoCard';
import ButtonBase from '../button/ButtonBase';

import locationMeteoStyles from './location-meteo-list.module.css';
import PlusIcon from '../icons/PlusIcon';
import { useDispatch } from 'react-redux';
import { addEmptyLocation, setActiveUniqueId } from '@/store/slices/location-meteo-list-slice';

type LocationMeteoListType = {
  onReload: (cityId: string) => void;
  onFavorite: (uniqueId: number) => void;
};

export default function LocationMeteoList(props: LocationMeteoListType) {
  const { onReload, onFavorite } = props;
  const dispatch = useDispatch();
  const locationMeteoList = selectList();
  const [tabIndex, setTabIndex] = useState(0);

  const onTabClick = (index: number, uniqueId: number) => {
    setTabIndex(index);
    dispatch(setActiveUniqueId({ uniqueId }));
  };

  const addTab = () => {
    dispatch(addEmptyLocation());
    const newTabIndex = locationMeteoList.length;
    setTabIndex(newTabIndex);
  };

  useEffect(() => {
    setTabIndex(0);
  }, []);

  return (
    <>
      <ul className={`${locationMeteoStyles.list} ${locationMeteoStyles.tabList}`}>
        {locationMeteoList.map((item, index) => (
          <li
            key={item.uniqueId}
            className={`${locationMeteoStyles.tab} ${tabIndex === index ? locationMeteoStyles.tabActive : ''}`}
          >
            <ButtonBase onClick={() => onTabClick(index, item.uniqueId)}>
              {item.locationName.split(',')[0]}
            </ButtonBase>
          </li>
        ))}

        <li>
          <ButtonBase onClick={addTab}>
            <PlusIcon additionalClass={locationMeteoStyles.iconPlus} />
          </ButtonBase>
        </li>
      </ul>
      <ul className={locationMeteoStyles.list}>
        {locationMeteoList[tabIndex] && (
          <li key={locationMeteoList[tabIndex].uniqueId}>
            <MeteoCard
              locationMeteo={locationMeteoList[tabIndex]}
              onReload={onReload}
              onFavorite={onFavorite}
            />
          </li>
        )}
      </ul>
    </>
  );
}
