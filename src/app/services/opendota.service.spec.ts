import { TestBed } from '@angular/core/testing';

import { OpendotaService } from './opendota.service';

describe('OpendotaService', () => {
  let service: OpendotaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpendotaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
