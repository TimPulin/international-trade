export const createInitialLocationMeteo = () => {
  const uniqueId = Date.now();
  return {
    uniqueId,
    locationId: '',
    locationName: '',
    isFavorite: false,
    isLoading: false,
    meteo: null,
  };
};
