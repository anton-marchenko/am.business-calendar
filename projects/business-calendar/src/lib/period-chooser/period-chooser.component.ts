import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BusinessCalendarMode } from '../models/business-calendar-mode.enum';

@Component({
  selector: 'am-period-chooser',
  templateUrl: './period-chooser.component.html',
  styleUrls: ['./period-chooser.component.scss']
})
export class PeriodChooserComponent implements OnInit {
  @Input() mode: BusinessCalendarMode = BusinessCalendarMode.Month;
  @Output() valueChange: EventEmitter<BusinessCalendarMode> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  isYearMode(): boolean {
    return this.mode === BusinessCalendarMode.Year;
  }

  onSwitchMonth() {
    this.onSwitchPeriod(BusinessCalendarMode.Month);
  }

  onSwitchYear() {
    this.onSwitchPeriod(BusinessCalendarMode.Year);
  }

  onSwitchPeriod(mode: BusinessCalendarMode) {
    this.mode = mode;
    this.valueChange.emit(mode);
  }
}
