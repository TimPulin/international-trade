import { IMeteo } from '@/types/meteo-type';
import { createSlice } from '@reduxjs/toolkit';

export type LocationMeteoType = {
  uniqueId: string;
  locationId: string;
  locationName: string;
  isFavorite: boolean;
  isLoading: boolean;
  meteo: IMeteo | null;
};

type LocationMeteoListState = {
  value: LocationMeteoType[];
};

type AddLocationMeteoActionType = {
  type: string;
  payload: LocationMeteoType;
};

type RemoveLocationMeteoActionType = {
  type: string;
  payload: {
    uniqueId: string;
  };
};

type SetIsLocationLoadingActionType = {
  type: string;
  payload: {
    uniqueId: string;
    isLoading: boolean;
  };
};

type SetMeteoActionType = {
  type: string;
  payload: {
    uniqueId: string;
    meteo: IMeteo | null;
  };
};

type SetFavoriteActionType = {
  type: string;
  payload: {
    uniqueId: string;
    isFavorite: boolean;
  };
};

const initialState: LocationMeteoListState = {
  value: [],
};

export const locationMeteoListSlice = createSlice({
  name: 'locationMeteoList',
  initialState,
  reducers: {
    addLocationMeteo(state: LocationMeteoListState, action: AddLocationMeteoActionType) {
      state.value.push(action.payload);
    },

    removeLocationMeteo(state: LocationMeteoListState, action: RemoveLocationMeteoActionType) {
      state.value = state.value.filter((item) => item.uniqueId !== action.payload.uniqueId);
    },

    setIsLocationLoading(state: LocationMeteoListState, action: SetIsLocationLoadingActionType) {
      const locationIndex = state.value.findIndex(
        (item) => item.uniqueId === action.payload.uniqueId
      );
      if (locationIndex !== -1) {
        state.value[locationIndex].isLoading = action.payload.isLoading;
      }
    },

    setMeteo(state: LocationMeteoListState, action: SetMeteoActionType) {
      const locationIndex = state.value.findIndex(
        (item) => item.uniqueId === action.payload.uniqueId
      );
      if (locationIndex !== -1) {
        state.value[locationIndex].meteo = action.payload.meteo;
      }
    },

    setFavorite(state: LocationMeteoListState, action: SetFavoriteActionType) {
      const locationIndex = state.value.findIndex(
        (item) => item.uniqueId === action.payload.uniqueId
      );
      if (locationIndex !== -1) {
        state.value[locationIndex].isFavorite = action.payload.isFavorite;
      }
    },
  },
});

export const {
  addLocationMeteo,
  removeLocationMeteo,
  setIsLocationLoading,
  setMeteo,
  setFavorite,
} = locationMeteoListSlice.actions;
export default locationMeteoListSlice.actions;

export const locationMeteoListReducer = locationMeteoListSlice.reducer;

export type LocationMeteoListReducerType = ReturnType<typeof locationMeteoListSlice.reducer>;
