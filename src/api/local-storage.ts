type localStorageType = {
  uniqueId: number;
  locationId: string;
  locationName: string;
  isFavorite: boolean;
};

export function getLocalStorage(key: string) {
  return JSON.parse(localStorage.getItem(key) || 'null');
}

export function setLocalStorage(key: string, value: localStorageType[]) {
  const json = JSON.stringify(value);
  localStorage.setItem(key, JSON.stringify(json));
}
