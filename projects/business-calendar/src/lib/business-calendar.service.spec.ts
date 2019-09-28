import { TestBed } from '@angular/core/testing';

import { BusinessCalendarService } from './business-calendar.service';

describe('BusinessCalendarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusinessCalendarService = TestBed.get(BusinessCalendarService);
    expect(service).toBeTruthy();
  });
});
