import { IMeteo } from '@/types/meteo-type';
import { createSlice } from '@reduxjs/toolkit';
import { createInitialLocationMeteo } from './create-initial-location-meteo';

export type LocationMeteoType = {
  uniqueId: number;
  locationId: string;
  locationName: string;
  isFavorite: boolean;
  isLoading: boolean;
  meteo: IMeteo | null;
};

type LocationMeteoListState = {
  value: {
    activeLocationMeteoUniqueId: number;
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

type SetFavoriteActionType = {
  type: string;
  payload: {
    uniqueId: number;
    isFavorite: boolean;
  };
};
const initialLocationMeteo = createInitialLocationMeteo();

const initialState: LocationMeteoListState = {
  value: {
    activeLocationMeteoUniqueId: initialLocationMeteo.uniqueId,
    locationMeteoList: [initialLocationMeteo],
  },
};

export const locationMeteoListSlice = createSlice({
  name: 'locationMeteoList',
  initialState,
  reducers: {
    addLocationMeteo(state: LocationMeteoListState, action: AddLocationMeteoActionType) {
      state.value.locationMeteoList.push(action.payload);
    },

    addEmptyLocationMeteo(state: LocationMeteoListState) {
      const initialLocationMeteo = createInitialLocationMeteo();
      state.value.locationMeteoList.push(initialLocationMeteo);
      state.value.activeLocationMeteoUniqueId = initialLocationMeteo.uniqueId;
    },

    updateLocationMeteo(state: LocationMeteoListState, action: AddLocationMeteoActionType) {
      const locationIndex = state.value.locationMeteoList.findIndex(
        (item) => item.uniqueId === action.payload.uniqueId
      );
      console.log(locationIndex);

      if (locationIndex !== -1) {
        state.value.locationMeteoList[locationIndex] = action.payload;
      }
    },

    removeLocationMeteo(state: LocationMeteoListState, action: FindByIdAction) {
      state.value.locationMeteoList = state.value.locationMeteoList.filter(
        (item) => item.uniqueId !== action.payload.uniqueId
      );
    },

    setIsLocationLoading(state: LocationMeteoListState, action: SetIsLocationLoadingActionType) {
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

    setFavorite(state: LocationMeteoListState, action: SetFavoriteActionType) {
      const locationIndex = state.value.locationMeteoList.findIndex(
        (item) => item.uniqueId === action.payload.uniqueId
      );
      if (locationIndex !== -1) {
        state.value.locationMeteoList[locationIndex].isFavorite = action.payload.isFavorite;
      }
    },

    setActiveLocationMeteoUniqueId(state: LocationMeteoListState, action: FindByIdAction) {
      state.value.activeLocationMeteoUniqueId = action.payload.uniqueId;
    },
  },
});

export const {
  addLocationMeteo,
  addEmptyLocationMeteo,
  updateLocationMeteo,
  removeLocationMeteo,
  setIsLocationLoading,
  setMeteo,
  setFavorite,
  setActiveLocationMeteoUniqueId,
} = locationMeteoListSlice.actions;
export default locationMeteoListSlice.actions;

export const locationMeteoListReducer = locationMeteoListSlice.reducer;

export type LocationMeteoListReducerType = ReturnType<typeof locationMeteoListSlice.reducer>;
