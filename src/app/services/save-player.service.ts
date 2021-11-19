import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Match } from '../models/match/match.model';
import { SPlayer } from '../models/s-player/splayer.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SavePlayerService {

  //endpoint: string = 'https://ryon.ee-cognizantacademy.com';
  endpoint: string = 'http://ryonbackend-env.eba-pbjsc7zw.us-east-2.elasticbeanstalk.com';

  postHeader =  {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  addPlayer(player: SPlayer): boolean{
    this.http.post<SPlayer>(this.endpoint+"/player", player,
     this.postHeader).subscribe(res => {
    }, (err) => {
      console.log(err);
      catchError(this.handleError<any>());
    });
  return true;
  }

  updatePlayer(player: SPlayer): boolean{
    this.http.put<SPlayer>(this.endpoint+"/player", player,
     this.postHeader).subscribe(res => {
    }, (err) => {
      console.log(err);
    });
  return true;
  }

  deletePlayer(player: SPlayer): boolean{
    this.http.delete<SPlayer>(this.endpoint+"/player/", player.id)
    .subscribe(res => {
    }, (err) => {
      console.log(err);
    });
  return true;
  }

  addMatch(match: Match): boolean{
    this.http.post<Match>(this.endpoint+"/match", match,
     this.postHeader).subscribe(res => {
    }, (err) => {
      console.log(err);
    });
  return true;
  }

  updateMatch(match: Match): boolean{
    this.http.put<Match>(this.endpoint+"/match", match,
     this.postHeader).subscribe(res => {
    }, (err) => {
      console.log(err);
    });
  return true;
  }

  deleteMatch(match: Match): boolean{
    this.http.delete<Match>(this.endpoint+"/match/", match.matchId)
    .subscribe(res => {
    }, (err) => {
      console.log(err);
    });
  return true;
  }

  getAllSavedPlayers(): Observable<SPlayer>{
    return this.http.get<any>(`${this.endpoint}/players`);
  }

  getSavedPlayerById(id: any): Observable<SPlayer>{
    return this.http.get<any>(`${this.endpoint}/player/${id}`);
  }
  getSavedPlayerByName(name: any): Observable<SPlayer>{
    return this.http.get<any>(`${this.endpoint}/player/${name}`);
  }

  getSavedMatch(id:any): Observable<Match>{
    return this.http.get<any>(`${this.endpoint}/match/id/${id}`);
  }

  getAllSavedMatches(): Observable<Match>{
    return this.http.get<any>(`${this.endpoint}/matches`);
  }

  private handleError<T>( result?: T) {
    return (error: any): Observable<T> => {
      console.log('An Error occured' + error);
      return new Observable();
    }
  }
}
