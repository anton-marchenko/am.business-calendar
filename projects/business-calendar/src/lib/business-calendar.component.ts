import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { parse } from 'papaparse';
import {
  isEqual,
  differenceInDays,
  getDate,
  getISODay,
  getYear,
  getMonth,
  startOfDay,
  startOfISOWeek,
  endOfISOWeek,
  endOfMonth,
  addDays,
} from 'date-fns';

import { BusinessCalendarMode } from './models/business-calendar-mode.enum';
import { BusinessYearsStorage, BusinessYearsStorageItem } from './models/business-years-storage-model';
import { SelectedYear, Month } from './models/selected-model';
import { FileUploadService } from './file-upload.service';
import { DayOfWeekNumber } from './models/day-of-week-number';
import { DayModel } from './models/day-model';
import { DayType } from './models/day-type';
import { SelectItemModel } from './models/select-item.model';

// TODO move to data format service adapter
const getDayType = day => (day.includes('*') ? DayType.Short : DayType.Holiday);
const getDayValue = day => Number(day.replace('*', ''));


@Component({
  selector: 'am-business-calendar',
  templateUrl: './business-calendar.component.html',
  styleUrls: ['./business-calendar.component.scss']
})
export class BusinessCalendarComponent implements OnInit {
  yearControl: FormControl;
  monthControl: FormControl;
  filePath: string;
  importedBusinessYearsStorage: BusinessYearsStorage = [];
  currDate: Date;
  currEmptyBusinessCalendar: BusinessYearsStorageItem;
  yearsDictionary: SelectItemModel[];
  monthsDictionary: SelectItemModel[];
  selectedMonthNumber: number;
  selectedYearNumber: number;
  selectedYear: SelectedYear = [];
  mode: BusinessCalendarMode = BusinessCalendarMode.Month;
  cities = [
    { value: 1, label: 'Vilnius' },
    { value: 2, label: 'Kaunas' },
    { value: 3, label: 'Pavilnys' }
];


  constructor(private fileUploader: FileUploadService) { }

  ngOnInit() {
    this.yearControl = new FormControl(null);
    this.monthControl = new FormControl(null);

  }

  updateSelectedYear() {
    const yearData: BusinessYearsStorageItem = this.importedBusinessYearsStorage.find(
      item => item.year === this.selectedYearNumber,
    );
    this.selectedYear = this.generateYearCalendar(yearData || this.currEmptyBusinessCalendar);
  }

  getMonthName(monthNumber) {
    const monthData = this.monthsDictionary.find(month => month.value === monthNumber);
    return monthData.name;
  }

  getSelectedMonth() {
    return this.selectedYear[this.selectedMonthNumber];
  }

  makeYearsDictionary(businessYears): SelectItemModel[] {
    const currYear = getMonth(this.currDate);
    const hasCurrYear = businessYears.some(year => Number(year[0]) === currYear);
    const res = businessYears.map(year => ({ name: year[0], value: Number(year[0]) }));

    if (!businessYears.length || !hasCurrYear) {
      res.push({ name: currYear.toString(), value: currYear });
    }

    return res;
  }

  isYearMode(): boolean {
    return this.mode === BusinessCalendarMode.Year;
  }

  onPeriodChange(event: BusinessCalendarMode) {
    this.mode = event;
    if (this.mode === BusinessCalendarMode.Year) {
      this.monthControl.disable();
    } else {
      this.monthControl.enable();
    }
  }

  getOptionSelectedYear(): SelectItemModel[] {
    return [this.yearsDictionary.find(year => year.value === this.selectedYearNumber)];
  }

  getOptionSelectedMonth(): SelectItemModel[] {
    const monthData = this.monthsDictionary.find(month => month.value === this.selectedMonthNumber);
    return monthData ? [monthData] : [];
  }

  onMonthSelectedChange(event: SelectItemModel[]) {
    if (event.length) {
      this.selectedMonthNumber = Number(event[0].value);
    }
  }

  onYearSelectedChange(event: SelectItemModel[]) {
    if (event.length) {
      this.selectedYearNumber = Number(event[0].value);
      this.updateSelectedYear();
    }
  }

  /**
   * FIXME - доделать как будет бэк
   * @param event
   */
  onFileUploadChange(event) {
    const file = event.currentTarget.files[0];
    this.filePath = file.name;

    this.fileUploader.upload(file).then(data => {
      const jsonData = parse(data);
      const businessYears = jsonData.data.slice(1);
      this.yearsDictionary = this.makeYearsDictionary(businessYears);

      this.importedBusinessYearsStorage = this.getBusinessYearsStorage(businessYears);
      this.updateSelectedYear();
    });
  }

  getBusinessYearsStorage(businessYears): BusinessYearsStorage {
    return businessYears.map(year => ({
      year: Number(year[0]),
      month: year.slice(1, 13).map(month => {
        return month.split(',').map(day => ({
          type: getDayType(day),
          value: getDayValue(day),
        }));
      }),
    }));
  }

  private generateYearCalendar(yearData: BusinessYearsStorageItem): SelectedYear {
    const year: SelectedYear = [];
    for (let monthCount = 0; monthCount < 12; monthCount++) {
      const businessDataMonth = yearData.month[monthCount] || [];
      const firstDay = new Date(yearData.year, monthCount);
      let firstDayOfWeek = startOfISOWeek(firstDay);
      const endOfMonthDay = endOfMonth(firstDay);
      const lastDayOfWeek = endOfISOWeek(endOfMonthDay);
      const calendarCellLength = differenceInDays(lastDayOfWeek, firstDayOfWeek);
      const monthData: Month = [];

      for (let calendarCellCount = 0; calendarCellCount <= calendarCellLength; calendarCellCount++) {
        const dayOfWeekNumber: DayOfWeekNumber = <DayOfWeekNumber>getISODay(firstDayOfWeek);

        if (dayOfWeekNumber === 1) {
          monthData.push([]);
        }

        const dayData: DayModel = this.getDayData(dayOfWeekNumber, firstDayOfWeek, endOfMonthDay, businessDataMonth);
        monthData[monthData.length - 1].push(dayData);

        firstDayOfWeek = addDays(firstDayOfWeek, 1);
      }
      year.push(monthData);
    }
    return year;
  }

  /**
   * @param dayOfWeekNumber
   * @param firstDayOfWeek
   * @param endOfMonthDay
   * @param businessDataMonth
   */
  private getDayData(
    dayOfWeekNumber: DayOfWeekNumber,
    firstDayOfWeek: Date,
    endOfMonthDay: Date,
    businessDataMonth,
  ): DayModel {
    const dayNumber = getDate(firstDayOfWeek);
    const isCurrMonth = endOfMonthDay.getMonth() === firstDayOfWeek.getMonth();
    const businessDataDay = businessDataMonth.find(day => day.value === dayNumber);
    let type = DayType.Work;

    if (isCurrMonth) {
      const isCurrentDay = isEqual(firstDayOfWeek, this.currDate);
      const isHoliday = dayOfWeekNumber === 6 || dayOfWeekNumber === 7;
      if (isCurrentDay) {
        type = DayType.Current;
      } else if (businessDataDay) {
        type = businessDataDay.type;
      } else if (isHoliday) {
        type = DayType.Holiday;
      }
    }

    return {
      value: dayNumber,
      type: type,
      isCurrMonth: isCurrMonth,
    };
  }
}
