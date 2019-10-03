import { DayType } from './day-type';

export class DayModel {
  value: number;
  type: DayType = DayType.Work;
  isCurrMonth = true;
}
