export interface IMeteo {
  lat: string;
  lon: string;
  elevation: number;
  timezone: string;
  units: string;
  current: ICurrent;
  hourly: IHourly;
  daily: any;
}

export interface ICurrent {
  icon: string;
  icon_num: number;
  summary: string;
  temperature: number;
  wind: IWind;
  precipitation: IPrecipitation;
  cloud_cover: number;
}

export interface IWind {
  speed: number;
  angle: number;
  dir: string;
}

export interface IPrecipitation {
  total: number;
  type: string;
}

export interface IHourly {
  data: ISituationOnDate[];
}

export interface ISituationOnDate {
  date: string;
  weather: string;
  icon: number;
  summary: string;
  temperature: number;
  wind: IWind;
  precipitation: IPrecipitation;
  cloud_cover: ICloudCover;
}

export interface ICloudCover {
  total: number;
}
