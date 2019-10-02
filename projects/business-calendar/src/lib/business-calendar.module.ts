import { NgModule } from '@angular/core';
import { BusinessCalendarComponent } from './business-calendar.component';
import { PeriodChooserComponent } from './period-chooser/period-chooser.component';



@NgModule({
  declarations: [BusinessCalendarComponent, PeriodChooserComponent],
  imports: [
  ],
  exports: [BusinessCalendarComponent]
})
export class BusinessCalendarModule { }
