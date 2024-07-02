/**
 * Types for the Meteo API
 *
 * @interface IMeteo
 * @property {string} lat - Latitude of the location
 * @property {string} lon - Longitude of the location
 * @property {number} elevation - Elevation of the location
 * @property {string} timezone - Timezone of the location
 * @property {string} units - Units of measurement
 * @property {ICurrent} current - Current weather situation
 * @property {IHourly} hourly - Hourly weather forecast
 * @property {any} daily - Daily weather forecast
 */

export interface IMeteo {
  lat: string; // Latitude of the location
  lon: string; // Longitude of the location
  elevation: number; // Elevation of the location
  timezone: string; // Timezone of the location
  units: string; // Units of measurement
  current: ICurrent; // Current weather situation
  hourly: IHourly; // Hourly weather forecast
  daily: any; // Daily weather forecast
}

/**
 * Types for the current weather situation
 *
 * @interface ICurrent
 * @property {string} icon - Icon representing the weather condition
 * @property {number} icon_num - Numeric representation of the weather condition icon
 * @property {string} summary - Short summary of the weather condition
 * @property {number} temperature - Temperature in specified units
 * @property {IWind} wind - Wind information
 * @property {IPrecipitation} precipitation - Precipitation information
 * @property {number} cloud_cover - Cloud cover percentage
 */

export interface ICurrent {
  icon: string; // Icon representing the weather condition
  icon_num: number; // Numeric representation of the weather condition icon
  summary: string; // Short summary of the weather condition
  temperature: number; // Temperature in specified units
  wind: IWind; // Wind information
  precipitation: IPrecipitation; // Precipitation information
  cloud_cover: number; // Cloud cover percentage
}

/**
 * Types for wind information
 *
 * @interface IWind
 * @property {number} speed - Wind speed in specified units
 * @property {number} angle - Wind angle in degrees
 * @property {string} dir - Wind direction
 */

export interface IWind {
  speed: number; // Wind speed in specified units
  angle: number; // Wind angle in degrees
  dir: string; // Wind direction
}

/**
 * Types for precipitation information
 *
 * @interface IPrecipitation
 * @property {number} total - Total precipitation in specified units
 * @property {string} type - Type of precipitation
 */

export interface IPrecipitation {
  total: number; // Total precipitation in specified units
  type: string; // Type of precipitation
}

/**
 * Types for hourly weather forecast
 *
 * @interface IHourly
 * @property {Array<ISituationOnDate>} data - Array of hourly weather situation
 */

export interface IHourly {
  data: ISituationOnDate[]; // Array of hourly weather situation
}

/**
 * Types for a weather situation on a specific date
 *
 * @interface ISituationOnDate
 * @property {string} date - Date of the weather situation
 * @property {string} weather - Short description of the weather condition
 * @property {number} icon - Numeric representation of the weather condition icon
 * @property {string} summary - Short summary of the weather condition
 * @property {number} temperature - Temperature in specified units
 * @property {IWind} wind - Wind information
 * @property {IPrecipitation} precipitation - Precipitation information
 * @property {ICloudCover} cloud_cover - Cloud cover percentage
 */

export interface ISituationOnDate {
  date: string; // Date of the weather situation
  weather: string; // Short description of the weather condition
  icon: number; // Numeric representation of the weather condition icon
  summary: string; // Short summary of the weather condition
  temperature: number; // Temperature in specified units
  wind: IWind; // Wind information
  precipitation: IPrecipitation; // Precipitation information
  cloud_cover: ICloudCover; // Cloud cover percentage
}

/**
 * Types for cloud cover percentage
 *
 * @interface ICloudCover
 * @property {number} total - Total cloud cover percentage
 */

export interface ICloudCover {
  total: number; // Total cloud cover percentage
}
