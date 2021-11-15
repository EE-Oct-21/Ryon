import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SPlayer } from '../models/s-player/splayer.model';

@Injectable({
  providedIn: 'root'
})
//**********************************************************/
// Connects to Open Dota API to retrieve data
//**********************************************************/
export class OpendotaService {

  endpoint: string = `https://api.opendota.com`;

  constructor(private http: HttpClient) { }

  getPlayer(id: any): Observable<SPlayer>{
    return this.http.get<any>(`${this.endpoint}/api/players/${id}`);
  }
  getMatch(id: any): Observable<any>{
    return this.http.get<any>(`${this.endpoint}/api/matches/${id}`);
  }
}
