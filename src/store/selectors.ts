import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export function useLocationMeteoList() {
  return useSelector((store: RootState) => store.locationMeteoList.value);
}

export function useLocationMeteo({ uniqueId }: { uniqueId: string }) {
  const locationIndex = useSelector((store: RootState) =>
    store.locationMeteoList.value.findIndex((item) => item.uniqueId === uniqueId)
  );
  if (locationIndex !== -1) {
    return useSelector((store: RootState) => store.locationMeteoList.value[locationIndex]);
  } else {
    return null;
  }
}
