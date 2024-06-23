import { ValidateFunction } from 'ajv';

export function isObjectValid<T>(func: ValidateFunction, dataObject: T): boolean {
  try {
    func(dataObject);
    return true;
  } catch (error) {
    return false;
  }
}
