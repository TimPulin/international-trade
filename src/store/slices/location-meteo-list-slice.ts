import { IMeteo } from '@/types/meteo-type';
import { createSlice } from '@reduxjs/toolkit';
import { createInitialLocationMeteo } from './create-initial-location-meteo';
import { Units } from '@/types/units-enum';

export type LocationMeteoType = {
  uniqueId: number;
  locationId: string;
  locationName: string;
  isFavorite: boolean;
  isLoading: boolean;
  units: Units;
  meteo: IMeteo | null;
};

type LocationMeteoListState = {
  value: {
    activeLocationMeteoUniqueId: number | null;
    locationMeteoList: LocationMeteoType[];
  };
};

type AddLocationMeteoActionType = {
  type: string;
  payload: LocationMeteoType;
};

type FindByIdAction = {
  type: string;
  payload: {
    uniqueId: number;
  };
};

type SetIsLocationLoadingActionType = {
  type: string;
  payload: {
    uniqueId: number;
    isLoading: boolean;
  };
};

type SetMeteoActionType = {
  type: string;
  payload: {
    uniqueId: number;
    meteo: IMeteo | null;
  };
};

const initialState: LocationMeteoListState = {
  value: {
    activeLocationMeteoUniqueId: null,
    locationMeteoList: [],
  },
};

export const locationMeteoListSlice = createSlice({
  name: 'locationMeteoList',
  initialState,
  reducers: {
    addLocation(state: LocationMeteoListState, action: AddLocationMeteoActionType) {
      state.value.locationMeteoList.push(action.payload);
      state.value.activeLocationMeteoUniqueId = action.payload.uniqueId;
    },

    addEmptyLocation(state: LocationMeteoListState) {
      const initialLocationMeteo = createInitialLocationMeteo();
      state.value.locationMeteoList.push(initialLocationMeteo);
      state.value.activeLocationMeteoUniqueId = initialLocationMeteo.uniqueId;
    },

    updateLocation(state: LocationMeteoListState, action: AddLocationMeteoActionType) {
      const locationIndex = state.value.locationMeteoList.findIndex(
        (item) => item.uniqueId === action.payload.uniqueId
      );

      if (locationIndex !== -1) {
        state.value.locationMeteoList[locationIndex] = action.payload;
      }
    },

    removeLocation(state: LocationMeteoListState, action: FindByIdAction) {
      state.value.locationMeteoList = state.value.locationMeteoList.filter(
        (item) => item.uniqueId !== action.payload.uniqueId
      );
    },

    setIsLoading(state: LocationMeteoListState, action: SetIsLocationLoadingActionType) {
      const locationIndex = state.value.locationMeteoList.findIndex(
        (item) => item.uniqueId === action.payload.uniqueId
      );
      if (locationIndex !== -1) {
        state.value.locationMeteoList[locationIndex].isLoading = action.payload.isLoading;
      }
    },

    setMeteo(state: LocationMeteoListState, action: SetMeteoActionType) {
      const locationIndex = state.value.locationMeteoList.findIndex(
        (item) => item.uniqueId === action.payload.uniqueId
      );
      if (locationIndex !== -1) {
        state.value.locationMeteoList[locationIndex].meteo = action.payload.meteo;
      }
    },

    setFavorite(state: LocationMeteoListState, action: FindByIdAction) {
      const locationIndex = state.value.locationMeteoList.findIndex(
        (item) => item.uniqueId === action.payload.uniqueId
      );

      if (locationIndex !== -1) {
        state.value.locationMeteoList[locationIndex].isFavorite =
          !state.value.locationMeteoList[locationIndex].isFavorite;
      }
    },

    setActiveUniqueId(state: LocationMeteoListState, action: FindByIdAction) {
      state.value.activeLocationMeteoUniqueId = action.payload.uniqueId;
    },
  },
});

export const {
  addLocation: addLocation,
  addEmptyLocation: addEmptyLocation,
  updateLocation: updateLocation,
  removeLocation: removeLocation,
  setIsLoading: setIsLoading,
  setMeteo,
  setFavorite,
  setActiveUniqueId: setActiveUniqueId,
} = locationMeteoListSlice.actions;
export default locationMeteoListSlice.actions;

export const locationMeteoListReducer = locationMeteoListSlice.reducer;

export type LocationMeteoListReducerType = ReturnType<typeof locationMeteoListSlice.reducer>;
