import { TestBed } from '@angular/core/testing';

import { StratzService } from './stratz.service';

describe('StratzService', () => {
  let service: StratzService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StratzService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
