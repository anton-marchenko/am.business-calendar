import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PeriodChooserComponent } from '../lib/period-chooser/period-chooser.component';

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
});
