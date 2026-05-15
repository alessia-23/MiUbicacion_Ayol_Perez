import { TestBed } from '@angular/core/testing';

import { Supabasev } from './supabase.service';

describe('Supabasev', () => {
  let service: Supabasev;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Supabasev);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
