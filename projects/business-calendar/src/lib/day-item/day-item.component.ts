import { Component, OnInit, Input } from '@angular/core';
import { DayType } from '../models/day-type';
import { DayModel } from '../models/day-model';

@Component({
  selector: 'am-day-item',
  templateUrl: './day-item.component.html',
  styleUrls: ['./day-item.component.scss']
})
export class DayItemComponent implements OnInit {
  @Input() isCompactMode = false;
  @Input() day: DayModel;

  constructor() {}

  ngOnInit() {}

  isWorkDay() {
    return this.day.type === DayType.Work;
  }

  isShortDay() {
    return this.day.type === DayType.Short;
  }

  isHoliday() {
    return this.day.type === DayType.Holiday;
  }

  isCurrent() {
    return this.day.type === DayType.Current;
  }
}
