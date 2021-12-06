import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { Match } from 'src/app/models/match/match.model';
import { OpendotaService } from 'src/app/services/opendota.service';

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

  const opendotaServiceSpy = jasmine.createSpyObj('OpendotaService',['getMatch']);
  const getMatchSpy = opendotaServiceSpy.getMatch.and.returnValue(of(match));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedPlayerComponent ],
      imports: [ AppModule ],
      providers: [
        { provide: OpendotaService, useValue: opendotaServiceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
