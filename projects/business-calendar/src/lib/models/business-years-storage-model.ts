import { DayType } from './day-type';

export interface BusinessYearsStorageItem {
  year: number;
  month: { type: DayType; value: number }[][];
}

export type BusinessYearsStorage = BusinessYearsStorageItem[];
