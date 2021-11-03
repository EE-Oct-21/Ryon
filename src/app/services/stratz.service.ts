import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Matches } from '../models/matches/matches.model';
import { SPlayer } from '../models/s-player/splayer.model';

@Injectable({
  providedIn: 'root'
})
export class StratzService {

  endpoint: string = `https://api.stratz.com`;

  constructor(private http: HttpClient) {
    
   }

  getPlayer(id: any): Observable<SPlayer> {
    return this.http.get<any>(`${this.endpoint}/api/v1/Player/${id}`);
  }
  getPlayerMatches(id:any): Observable<Matches> {
    return this.http.get<any>(`${this.endpoint}/api/v1/Player/${id}/matches`);
  }
  getHero(): Observable<any>{
    return this.http.get<any>(`${this.endpoint}/api/v1/Hero`);
  }
  getMatch(id:any): Observable<any>{
    return this.http.get<any>(`${this.endpoint}/api/v1/Match/${id}`);
  }
}
