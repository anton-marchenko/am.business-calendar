import { Component, OnInit, Input } from '@angular/core';

const monthNames = [
  ['mon', 'Monday'],
  ['tue', 'Tuesday'],
  ['wed', 'Wednesday'],
  ['thu', 'Thursday'],
  ['fri', 'Friday'],
  ['sat', 'Saturday'],
  ['sun', 'Sunday'],
];

@Component({
  selector: 'am-month-item',
  templateUrl: './month-item.component.html',
  styleUrls: ['./month-item.component.scss']
})
export class MonthItemComponent implements OnInit {
  @Input() isCompactMode = false;
  @Input() monthName: string;
  @Input() monthData = [];

  constructor() { }

  ngOnInit() { }

  get monthNamesList(): { name: string; isHoliday: boolean }[] {
    return monthNames.map((item, index) => {
      const name = this.isCompactMode ? item[0] : item[1];
      const isHolidayIndex = index === 5 || index === 6;
      return {
        name,
        isHoliday: isHolidayIndex,
      };
    });
  }
}
