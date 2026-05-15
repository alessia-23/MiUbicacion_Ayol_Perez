import { TestBed } from '@angular/core/testing';

import { Geolocationionic } from './geolocation.service';

describe('Geolocationionic', () => {
  let service: Geolocationionic;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Geolocationionic);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
