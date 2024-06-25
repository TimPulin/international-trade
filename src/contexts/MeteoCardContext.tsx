import { IPrecipitation, IWind } from '@/types/meteo-type';
import { Units } from '@/types/units-enum';
import { createContext, useContext, useMemo, useState } from 'react';

type MainWidgetDataType = {
  date?: string;
  iconNumber: number;
  units: Units;
  temperature: number;
  wind: IWind;
  precipitation: IPrecipitation;
};

export type MeteoCardContextType = {
  mainWidgetData: MainWidgetDataType | null;
  setMainWidgetData: React.Dispatch<React.SetStateAction<MainWidgetDataType | null>>;
};

export const MeteoCardContext = createContext<MeteoCardContextType | null>(null);

export function useMeteoCard() {
  const context = useContext(MeteoCardContext);
  if (!context) {
    throw new Error('useMeteoCard используй внутри MeteoCardContextProvider');
  }
  return context;
}

export function MeteoCardContextProvider({ children }: any) {
  const [mainWidgetData, setMainWidgetData] = useState<MainWidgetDataType | null>(null);

  const mainWidgetDataState = useMemo(
    () => ({
      mainWidgetData,
      setMainWidgetData,
    }),
    [mainWidgetData]
  );
  return (
    <MeteoCardContext.Provider value={mainWidgetDataState}>{children}</MeteoCardContext.Provider>
  );
}
