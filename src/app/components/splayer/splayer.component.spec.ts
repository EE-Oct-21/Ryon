import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { Match } from 'src/app/models/match/match.model';
import { SPlayer } from 'src/app/models/s-player/splayer.model';
import { SavePlayerService } from 'src/app/services/save-player.service';
import { StratzService } from 'src/app/services/stratz.service';

import { SplayerComponent } from './splayer.component';

describe('SplayerComponent', () => {
  let component: SplayerComponent;
  let fixture: ComponentFixture<SplayerComponent>;

  let match = new Match();
  match.matchId = 1;
  match.duration = "1";
  match.victory = true;
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
    'getPlayer', 'getPlayerMatches']);
  const getPlayerSpy = stratzServiceSpy.getPlayer.and.returnValue(of(player));
  const getPlayerMatchesSpy = stratzServiceSpy.getPlayerMatches.and.returnValue(of(match));

  const savePlayerServiceSpy = jasmine.createSpyObj('SavePlayerService',[
    'getAllSavedMatches', 'addMatch']);
    const getAllSavedMatchesSpy = savePlayerServiceSpy.getAllSavedMatches.and.returnValue(of(match));
    const addMatch = savePlayerServiceSpy.addMatch.and.returnValue(of(match));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplayerComponent ],
      imports: [ AppModule ],
      providers: [
        { provide: StratzService, useValue: stratzServiceSpy },
        { provide: SavePlayerService, useValue: savePlayerServiceSpy }
      ]
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

  it('should display the player details', ()=>{
    const headerTag = fixture.debugElement.nativeElement.querySelector('h1');
    expect(headerTag.textContent).toBe(player.name);
  });
});
