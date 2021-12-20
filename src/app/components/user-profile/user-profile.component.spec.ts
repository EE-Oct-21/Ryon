import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, of } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { Auth } from 'src/app/models/auth/auth.model';
import { SPlayer } from 'src/app/models/s-player/splayer.model';
import { Auth0Service } from 'src/app/services/auth0.service';
import { SavePlayerService } from 'src/app/services/save-player.service';

import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  let steamId = '66914827';

  let player = new SPlayer();
  let auth = new Auth();

  let user = {
    name: "Ryon",
    email: "ryon137@gmail.com"
  };

  const savePlayerServiceSpy = jasmine.createSpyObj('SavePlayerService',[
    'getSavedPlayerById', 'getAuth'
  ]);
  const getSavedPlayerByIdSpy = savePlayerServiceSpy.getSavedPlayerById.and.returnValue(of(player));
  const getAuthSpy = savePlayerServiceSpy.getAuth.and.returnValue(of(auth));

  const auth0Spy = jasmine.createSpyObj('Auth0Service',['getUser']);
  const getUserSpy = auth0Spy.getUser.and.returnValue(of(user));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileComponent ],
      providers: [
        { provide: SavePlayerService, useValue: savePlayerServiceSpy },
        { provide: Auth0Service, useValue: auth0Spy }
      ],
      imports: [ AppModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    component.steamId = steamId;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should displayEnter your Steam ID', ()=>{
  //   const headerTag = fixture.debugElement.nativeElement.querySelector('#userDetails');
  //   expect(headerTag.textContent).toBe("Enter your Steam ID");
  // });
});
