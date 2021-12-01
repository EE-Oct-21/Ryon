import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { Match } from 'src/app/models/match/match.model';
import { SPlayer } from 'src/app/models/s-player/splayer.model';
import { OpendotaService } from 'src/app/services/opendota.service';
import { SavePlayerService } from 'src/app/services/save-player.service';
import { StratzService } from 'src/app/services/stratz.service';

import { SplayerComponent } from './splayer.component';

describe('SplayerComponent', () => {
  let component: SplayerComponent;
  let fixture: ComponentFixture<SplayerComponent>;

  let steamid = '1';


  let match = new Match();
  match.id = 1;
  match.durationSeconds = "1";
  match.victory = true;
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


  let match2 = new Match();
  match2.id = 2;
  match2.durationSeconds = "1";
  match2.victory = true;
  match2.firstBloodTime = "1";
  match2.gameMode = "1";
  match2.largestGoldLead = "1";
  match2.largestGoldLeadTeam = "Dire";
  match2.largestXpLead = "1";
  match2.largestXpLeadTeam = "Radiant";
  match2.startTime = "1";
  match2.deaths = 10;

  let matchArray = [match,match2]

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
  const getPlayerMatchesSpy = stratzServiceSpy.getPlayerMatches.and.returnValue(of(matchArray));

  const savePlayerServiceSpy = jasmine.createSpyObj('SavePlayerService',[
    'getAllSavedMatches', 'addMatch']);
    const getAllSavedMatchesSpy = savePlayerServiceSpy.getAllSavedMatches.and.returnValue(of(match));
    const addMatchSpy = savePlayerServiceSpy.addMatch.and.returnValue(of(match));

  const opendotaServiceSpy = jasmine.createSpyObj('OpendotaService',['getMatch']);
  const getMatchSpy = opendotaServiceSpy.getMatch.and.returnValue(of(match));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplayerComponent ],
      imports: [ AppModule ],
      providers: [
        { provide: StratzService, useValue: stratzServiceSpy },
        { provide: SavePlayerService, useValue: savePlayerServiceSpy },
        { provide: OpendotaService, useValue: opendotaServiceSpy },
        { provide: steamid, useValue: '66914827' }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the player name when submit button is clicked and steamid is provided', ()=>{
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submitButton');

    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    
    const headerTag = fixture.debugElement.nativeElement.querySelector('#playerName');
    expect(headerTag.textContent).toBe(player.name);
  });

  it('should display the player id when submit button is clicked and steamid is provided', ()=>{
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submitButton');

    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    
    const headerTag = fixture.debugElement.nativeElement.querySelector('#playerId');
    expect(headerTag.textContent).toBe("Steam ID: " + player.id);
  });

  it('should display the player real name when submit button is clicked and steamid is provided', ()=>{
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submitButton');

    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    
    const headerTag = fixture.debugElement.nativeElement.querySelector('#realName');
    expect(headerTag.textContent).toBe("Real Name: " + player.realName);
  });

  it('should display most recent match details when submit button is clicked and steamid is provided', ()=>{
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submitButton');

    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    
    const headerTag = fixture.debugElement.nativeElement.querySelector('#recentDetails');
    expect(headerTag.textContent).toBe("Most recent match details:");
  });


  it('should display the match id when submit button is clicked and steamid is provided', ()=>{
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submitButton');

    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    
    const headerTag = fixture.debugElement.nativeElement.querySelector('#matchId');
    expect(headerTag.textContent).toBe("The match id was " + match.id + ".");
  });

  it('should display the match duration when submit button is clicked and steamid is provided', ()=>{
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submitButton');

    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    
    const headerTag = fixture.debugElement.nativeElement.querySelector('#matchDuration');
    expect(headerTag.textContent).toBe("It lasted " + (match.durationSeconds / 60).toFixed(2) + " minutes.");
  });

  it('should display victory when submit button is clicked and steamid is provided and victory is true', ()=>{
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submitButton');

    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const headerTag = fixture.debugElement.nativeElement.querySelector('#matchVictory');

    expect(headerTag.textContent).toBe("You won.");
    
  });

  it('should display largest gold lead and corresponding team when submit button is clicked and steamid is provided', ()=>{
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submitButton');

    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const goldLead = fixture.debugElement.nativeElement.querySelector('#goldLead');

    expect(goldLead.textContent).toBe(" " + match.largestGoldLeadTeam +  " had the highest gold lead of " + match.largestGoldLead + " gold.");
    
  });

  it('should display largest xp lead and corresponding team when submit button is clicked and steamid is provided', ()=>{
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submitButton');

    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const goldLead = fixture.debugElement.nativeElement.querySelector('#xpLead');

    expect(goldLead.textContent).toBe(" " + match.largestXpLeadTeam +  " had the highest experience lead of " + match.largestXpLead + " experience.");
    
  });

  it('should display the start time when submit button is clicked and steamid is provided', ()=>{
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submitButton');

    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    const headerTag = fixture.debugElement.nativeElement.querySelector('#startTime');
    expect(headerTag.textContent).toBe("The match began at " + match.startTime + ". ");

  });
  
  it('should display the deaths when submit button is clicked and steamid is provided', ()=>{
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submitButton');

    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    const headerTag = fixture.debugElement.nativeElement.querySelector('#deaths');
    expect(headerTag.textContent).toBe("You died " + match.deaths + " times.");

  });

  it('should display the special message when submit button is clicked and steamid is provided and deaths are greater than 10', ()=>{
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submitButton');

    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    const headerTag = fixture.debugElement.nativeElement.querySelector('#feed');
    expect(headerTag.textContent).toBe("You fed.");
  });

  it('should display logo when no id is provided', ()=>{

    const headerTag = fixture.debugElement.nativeElement.querySelector('#protractor');
    expect(headerTag['src']).toContain('favicon.ico');

  });

  // it('should display save match button if user is logged in', ()=>{

  //   const headerTag = fixture.debugElement.nativeElement.querySelector('#saveMatchButton');
  //   expect(headerTag.textContent).toBe("Save Match");

  // });
});
