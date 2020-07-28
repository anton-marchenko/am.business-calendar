import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { BusinessCalendarComponent } from './components/business-calendar/business-calendar.component';
import { PeriodChooserComponent } from './components/period-chooser/period-chooser.component';
import { MonthItemComponent } from './components/month-item/month-item.component';
import { DayItemComponent } from './components/day-item/day-item.component';



@NgModule({
  declarations: [BusinessCalendarComponent, PeriodChooserComponent, MonthItemComponent, DayItemComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule
  ],
  exports: [BusinessCalendarComponent]
})
export class BusinessCalendarModule { }
