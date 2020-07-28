import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BusinessCalendarComponent } from './business-calendar.component';
import { PeriodChooserComponent } from './period-chooser/period-chooser.component';
import { MonthItemComponent } from './month-item/month-item.component';
import { DayItemComponent } from './day-item/day-item.component';



@NgModule({
  declarations: [BusinessCalendarComponent, PeriodChooserComponent, MonthItemComponent, DayItemComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [BusinessCalendarComponent]
})
export class BusinessCalendarModule { }
