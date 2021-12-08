import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { NgbToastService } from 'ngb-toast';
import { SavedPlayerComponent } from '../components/saved-player/saved-player.component';
import { Match } from '../models/match/match.model';
import { SPlayer } from '../models/s-player/splayer.model';

import { SavePlayerService } from './save-player.service';

describe('SavePlayerService', () => {
  let httpTestingController: HttpTestingController;
  let service: SavePlayerService;
  let player = new SPlayer();
  let match = new Match();
  let baseUrl = 'https://ryon.ee-cognizantacademy.com'

  const toastServiceSpy = jasmine.createSpyObj('toastService', ['pop', 'show']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: NgbToastService, useValue: toastServiceSpy}
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(SavePlayerService);
  });

  afterEach(()=>{
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('addPlayer should make a POST call to the url', ()=>{
    let didAdd = service.addPlayer(player);
    let req = httpTestingController.expectOne(baseUrl+"/player");
    expect(req.request.method).toEqual("POST");
    expect(didAdd).toBe(true);
  });

  it('updatePlayer should make a PUT call to the url', ()=>{
    let didAdd = service.updatePlayer(player);
    let req = httpTestingController.expectOne(baseUrl+"/player");
    expect(req.request.method).toEqual("PUT");
    expect(didAdd).toBe(true);
  });

  it('deletePlayer should make a DELETE call to the url', ()=>{
    let didAdd = service.deletePlayer(player);
    let req = httpTestingController.expectOne(baseUrl+"/player/");
    expect(req.request.method).toEqual("DELETE");
    expect(didAdd).toBe(true);
  });

  it('addMatch should make a POST call to the url', ()=>{
    let didAdd = service.addMatch(match);
    let req = httpTestingController.expectOne(baseUrl+"/match");
    expect(req.request.method).toEqual("POST");
    expect(didAdd).toBe(true);
  });

  it('updateMatch should make a PUT call to the url', ()=>{
    let didAdd = service.updateMatch(match);
    let req = httpTestingController.expectOne(baseUrl+"/match");
    expect(req.request.method).toEqual("PUT");
    expect(didAdd).toBe(true);
  });

  it('deleteMatch should make a DELETE call to the url', ()=>{
    let didAdd = service.deleteMatch(match);
    let req = httpTestingController.expectOne(baseUrl+"/match/");
    expect(req.request.method).toEqual("DELETE");
    expect(didAdd).toBe(true);
  });

  it('getAllSavedPlayers should make a GET call to the url', ()=>{
    service.getAllSavedPlayers().subscribe();
    let req = httpTestingController.expectOne(baseUrl+"/players");
    expect(req.request.method).toEqual("GET");
  });

  it('getSavedPlayerById should make a GET call to the url', ()=>{
    service.getSavedPlayerById(1).subscribe();
    let req = httpTestingController.expectOne(baseUrl+"/player/1");
    expect(req.request.method).toEqual("GET");
  });

  it('getSavedPlayerByName should make a GET call to the url', ()=>{
    service.getSavedPlayerByName("Ryon").subscribe();
    let req = httpTestingController.expectOne(baseUrl+"/player/Ryon");
    expect(req.request.method).toEqual("GET");
  });

  it('getSavedMatch should make a GET call to the url', ()=>{
    service.getSavedMatch(1).subscribe();
    let req = httpTestingController.expectOne(baseUrl+"/match/id/1");
    expect(req.request.method).toEqual("GET");
  });

  it('getAllSavedMatches should make a GET call to the url', ()=>{
    service.getAllSavedMatches().subscribe();
    let req = httpTestingController.expectOne(baseUrl+"/matches");
    expect(req.request.method).toEqual("GET");
  });
});
