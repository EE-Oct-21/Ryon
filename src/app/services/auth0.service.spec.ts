import { TestBed } from '@angular/core/testing';
import { AuthService } from '@auth0/auth0-angular';
import { of } from 'rxjs';

import { Auth0Service } from './auth0.service';

describe('Auth0Service', () => {
  let service: Auth0Service;

  let user = { 
    name: "Ryon"
  };
  
  const authServiceSpy = jasmine.createSpyObj('AuthService', ['user']);
  const userSpy = authServiceSpy.user.and.returnValue(of(user));

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

  it('should return an observable containing user authentication'), ()=>{
    service.getUser().subscribe(result => 
      expect(result.length).toBeGreaterThan(0));
  }
});
