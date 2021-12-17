import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { Match } from 'src/app/models/match/match.model';
import { SavePlayerService } from 'src/app/services/save-player.service';

import { SavedPlayerComponent } from './saved-player.component';

describe('SavedPlayerComponent', () => {
  let component: SavedPlayerComponent;
  let fixture: ComponentFixture<SavedPlayerComponent>;

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

  let matchArray = {match};

  const savePlayerServiceSpy = jasmine.createSpyObj('SavePlayerService',['getAllSavedMatches']);
  const getAllSavedMatchesSpy = savePlayerServiceSpy.getAllSavedMatches.and.returnValue(of(matchArray));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedPlayerComponent ],
      imports: [ AppModule ],
      providers: [
        { provide: SavePlayerService, useValue: savePlayerServiceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display All saved Matches', ()=>{    
    const headerTag = fixture.debugElement.nativeElement.querySelector('#userDetails');
    expect(headerTag.textContent).toBe("All Saved Matches");
  });

  it('should display all match ids', ()=>{
    const pTag = fixture.debugElement.nativeElement.querySelector('#matchLabel');
    expect(pTag.textContent).toBe("Match " + match.id);
  });
});
