import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'am-business-calendar',
  template: `
    <p>
      business-calendar works!
        <am-period-chooser></am-period-chooser>
    </p>
  `,
  styles: []
})
export class BusinessCalendarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
