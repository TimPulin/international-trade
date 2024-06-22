import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export function useLocationMeteoList() {
  return useSelector((store: RootState) => store.locationMeteoList.value.locationMeteoList);
}

export function useActiveLocationMeteoUniqueId() {
  return useSelector(
    (store: RootState) => store.locationMeteoList.value.activeLocationMeteoUniqueId
  );
}

export function useLocationMeteo({ uniqueId }: { uniqueId: number }) {
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
