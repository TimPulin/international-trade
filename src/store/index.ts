import { configureStore } from '@reduxjs/toolkit';
import { locationMeteoListReducer } from './slices/location-meteo-list-slice';
const store = configureStore({
  reducer: {
    locationMeteoList: locationMeteoListReducer,
  },
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
