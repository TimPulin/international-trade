import { IPrecipitation, IWind } from '@/types/meteo-type';
import { createContext, useContext, useMemo, useState } from 'react';

type MainWidgetDataType = {
  date?: string;
  iconNumber: number;
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
    throw new Error('useMeteoCardContext must be used within a MeteoCardContextProvider');
  }
  return context;
}

export function MeteoCardContextProvider({ children }: any) {
  const [mainWidgetData, setMainWidgetData] = useState<MainWidgetDataType | null>(null);
  const mainWidgetDataState = useMemo(
    () => ({ mainWidgetData, setMainWidgetData }),
    [mainWidgetData]
  );
  return (
    <MeteoCardContext.Provider value={mainWidgetDataState}>{children}</MeteoCardContext.Provider>
  );
}
