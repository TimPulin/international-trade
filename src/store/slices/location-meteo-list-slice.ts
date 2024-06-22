import { IMeteo } from '@/types/meteo-type';
import { createSlice } from '@reduxjs/toolkit';

type LocationMeteoType = {
  uniqueId: string;
  locationId: string;
  locationName: string;
  isFavorite: boolean;
  isLoading: boolean;
  meteo: IMeteo | null;
};

type LocationMeteoListState = {
  locationMeteoList: LocationMeteoType[];
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
  locationMeteoList: [],
};

export const locationMeteoListSlice = createSlice({
  name: 'locationMeteoList',
  initialState,
  reducers: {
    addLocationMeteo(state: LocationMeteoListState, action: AddLocationMeteoActionType) {
      state.locationMeteoList.push(action.payload);
    },

    removeLocationMeteo(state: LocationMeteoListState, action: RemoveLocationMeteoActionType) {
      state.locationMeteoList = state.locationMeteoList.filter(
        (item) => item.uniqueId !== action.payload.uniqueId
      );
    },

    setIsLocationLoading(state: LocationMeteoListState, action: SetIsLocationLoadingActionType) {
      const locationIndex = state.locationMeteoList.findIndex(
        (item) => item.uniqueId === action.payload.uniqueId
      );
      if (locationIndex !== -1) {
        state.locationMeteoList[locationIndex].isLoading = action.payload.isLoading;
      }
    },

    setMeteo(state: LocationMeteoListState, action: SetMeteoActionType) {
      const locationIndex = state.locationMeteoList.findIndex(
        (item) => item.uniqueId === action.payload.uniqueId
      );
      if (locationIndex !== -1) {
        state.locationMeteoList[locationIndex].meteo = action.payload.meteo;
      }
    },

    setFavorite(state: LocationMeteoListState, action: SetFavoriteActionType) {
      const locationIndex = state.locationMeteoList.findIndex(
        (item) => item.uniqueId === action.payload.uniqueId
      );
      if (locationIndex !== -1) {
        state.locationMeteoList[locationIndex].isFavorite = action.payload.isFavorite;
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
