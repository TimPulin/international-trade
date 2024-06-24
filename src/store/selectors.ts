import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { createSelector } from '@reduxjs/toolkit';

const locationMeteoList = (state: RootState) => state.locationMeteoList.value.locationMeteoList;

export function selectList() {
  return useSelector(locationMeteoList);
}

const favoriteList = createSelector(locationMeteoList, (list) =>
  list.filter((item) => item.isFavorite)
);

export function selectFavoriteList() {
  return useSelector(favoriteList);
}

export function selectActiveUniqueId() {
  return useSelector(
    (store: RootState) => store.locationMeteoList.value.activeLocationMeteoUniqueId
  );
}

export function selectLocation({ uniqueId }: { uniqueId: number }) {
  const locationIndex = useSelector((store: RootState) =>
    store.locationMeteoList.value.locationMeteoList.findIndex((item) => item.uniqueId === uniqueId)
  );
  if (locationIndex !== -1) {
    return useSelector(
      (store: RootState) => store.locationMeteoList.value.locationMeteoList[locationIndex]
    );
  } else {
    return null;
  }
}
