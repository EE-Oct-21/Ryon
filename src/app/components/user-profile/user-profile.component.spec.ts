import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, of } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { Auth } from 'src/app/models/auth/auth.model';
import { Match } from 'src/app/models/match/match.model';
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

  let match = new Match();
  match.id = 1;
  match.authId = [1,2,3];
  match.durationSeconds = "1";
  match.victory = true;
  match.players = [{isVictory!: true, heroId!: 11}]
  match.firstBloodTime = "1";
  match.gameMode = "1";
  match.largestGoldLead = "1";
  match.largestGoldLeadTeam = "Dire";
  match.largestXpLead = "1";
  match.largestXpLeadTeam = "Radiant";
  match.startTime = "1";
  match.deaths = 11;
  match.radiant_gold_adv = [0, -34, 405, 224];
  match.radiant_xp_adv = [0, 24, 212, 211];
  match.heroes = "Outworld Destroyer";

  player.name = "Ryon";
  player.id = 1;
  player.realName = "Real Ryon";
  player.avatar = "link";
  player.profileUri = "uri";
  player.matchesList = [match];

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

  it('should display Enter your Steam ID if player does not exist', ()=>{
    component.playerExists = false;
    fixture.detectChanges();

    const headerTag = fixture.debugElement.nativeElement.querySelector('#userDetails');
    expect(headerTag.textContent).toBe("Enter your Steam ID");
  });

  it('should display submit button if player does not exist', ()=>{
    component.playerExists = false;
    fixture.detectChanges();
    
    const headerTag = fixture.debugElement.nativeElement.querySelector('#submitButton');
    expect(headerTag.textContent).toBe("Submit");
  });

  it('should display Account Information', ()=>{
    const headerTag = fixture.debugElement.nativeElement.querySelector('#userDetails');
    expect(headerTag.textContent).toBe("Account Information");
  });

  it('should display User name', ()=>{
    const headerTag = fixture.debugElement.nativeElement.querySelector('#userName');
    expect(headerTag.textContent).toBe("User Name: " + user.name);
  });

  it('should display User email', ()=>{
    const headerTag = fixture.debugElement.nativeElement.querySelector('#userEmail');
    expect(headerTag.textContent).toBe("User Email: " + user.email);
  });

  it('should display player avatar if player exists', ()=>{
    component.playerExists = true;
    fixture.detectChanges();

    const headerTag = fixture.debugElement.nativeElement.querySelector('#image');
    expect(headerTag.textContent).toBe("");
  });
});
