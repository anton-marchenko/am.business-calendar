import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessCalendarComponent } from './business-calendar.component';

describe('BusinessCalendarComponent', () => {
  let component: BusinessCalendarComponent;
  let fixture: ComponentFixture<BusinessCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
