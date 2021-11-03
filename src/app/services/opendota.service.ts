import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../models/player/player.model';

@Injectable({
  providedIn: 'root'
})
export class OpendotaService {

  endpoint: string = `https://api.opendota.com`;

  constructor(private http: HttpClient) { }

  getPlayer(id: any): Observable<Player>{
    return this.http.get<any>(`${this.endpoint}/api/players/${id}`);
  }
  getMatch(id: any): Observable<any>{
    return this.http.get<any>(`${this.endpoint}/api/matches/${id}`);
  }
}
