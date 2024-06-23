type LocationType = {
  uniqueId: number;
  locationId: string;
  locationName: string;
  isFavorite: boolean;
};

export type LocalStorageType = LocationType[];

export function getLocalStorage(key: string) {
  return JSON.parse(localStorage.getItem(key) || 'null');
}

export function setLocalStorage(key: string, value: LocalStorageType) {
  const json = JSON.stringify(value);
  localStorage.setItem(key, JSON.stringify(json));
}
