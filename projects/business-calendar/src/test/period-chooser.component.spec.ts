import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PeriodChooserComponent } from '../lib/period-chooser/period-chooser.component';
import { BusinessCalendarMode } from '../lib/models/business-calendar-mode.enum';

describe('PeriodChooserComponent', () => {
  let component: PeriodChooserComponent;
  let fixture: ComponentFixture<PeriodChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should switch year', () => {
    component.mode = BusinessCalendarMode.Month;
    component.valueChange.subscribe((mode: BusinessCalendarMode) => expect(mode).toBe(BusinessCalendarMode.Year));
    component.onSwitchYear();
  });

  it('should switch month', () => {
    component.mode = BusinessCalendarMode.Year;
    component.valueChange.subscribe((mode: BusinessCalendarMode) => expect(mode).toBe(BusinessCalendarMode.Month));
    component.onSwitchMonth();
  });
});
