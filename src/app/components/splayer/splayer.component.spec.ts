import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { Match } from 'src/app/models/match/match.model';
import { SPlayer } from 'src/app/models/s-player/splayer.model';

import { SplayerComponent } from './splayer.component';

describe('SplayerComponent', () => {
  let component: SplayerComponent;
  let fixture: ComponentFixture<SplayerComponent>;

  let match = new Match();
  match.matchId = 1;
  match.duration = "1";
  match.isVictory = true;
  match.firstBloodTime = "1";
  match.gameMode = "1";
  match.largestGoldLead = "1";
  match.largestGoldLeadTeam = "Dire";
  match.largestXpLead = "1";
  match.largestXpLeadTeam = "Radiant";
  match.startTime = "1";
  match.deaths = "1";

  let player = new SPlayer();
  player.name = "Ryon";
  player.id = 1;
  player.realName = "Real Ryon";
  player.avatar = "link";
  player.profileUri = "uri";
  player.match = match;

  const stratzServiceSpy = jasmine.createSpyObj('StratzService',[
    'getPlayer'
  ]);
  stratzServiceSpy.getPlayer.and.returnValue(of(player));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplayerComponent ],
      imports: [ AppModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
