import { TestBed } from '@angular/core/testing';

import { SavePlayerService } from './save-player.service';

describe('SavePlayerService', () => {
  let service: SavePlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavePlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
