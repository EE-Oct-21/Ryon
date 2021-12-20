import { TestBed } from '@angular/core/testing';
import { AuthService } from '@auth0/auth0-angular';

import { Auth0Service } from './auth0.service';

describe('Auth0Service', () => {
  let service: Auth0Service;
  
  const authServiceSpy = jasmine.createSpyObj('AuthService', ['user']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });
    service = TestBed.inject(Auth0Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
