import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Match } from 'src/app/models/match/match.model';
import { Matches } from 'src/app/models/matches/matches.model';
import { SPlayer } from 'src/app/models/s-player/splayer.model';
import { OpendotaService } from 'src/app/services/opendota.service';
import { SavePlayerService } from 'src/app/services/save-player.service';
import { StratzService } from 'src/app/services/stratz.service';

@Component({
  selector: 'app-splayer',
  templateUrl: './splayer.component.html',
  styleUrls: ['./splayer.component.scss']
})
//***********************************************************************************/
// This class retrieves data from various API's based on given steam ID, and displays.
// It also saves the given match and player.  If a player already exists, it adds the
//    match data to that player
//***********************************************************************************/
export class SplayerComponent implements OnInit {

  flag: boolean = false;
  splayer = new SPlayer;
  matches = new Matches;
  match = new Match;
  match2 = new Match;
  steamid = '';
  isTrue = false; //flag for displaying logo

  constructor(private savePlayerService: SavePlayerService, private stratzService: StratzService, private opendotaService: OpendotaService,@Inject(DOCUMENT) public document: Document, public auth: AuthService) {
   }
  
   onSubmit(){
    this.isTrue = true;
    //**********************************************************/
    // Gets player details and stores them in SPlayer model
    //**********************************************************/
    this.stratzService.getPlayer(this.steamid).subscribe((Player: any) => {
      this.splayer = Player;
      this.splayer.name = Player.steamAccount.name;
      this.splayer.id = Player.steamAccount.id;
      this.splayer.realName = Player.steamAccount.realName;
      this.splayer.avatar = Player.steamAccount.avatar;
      this.splayer.profileUri = Player.steamAccount.profileUri;
    }),
    //**********************************************************/
    // Gets 10 most recent matches and stores them all in Matches Model
    //**********************************************************/
    this.stratzService.getPlayerMatches(this.steamid).subscribe((match: any) => {
      
      //add match information to match object
      for(let i = 0; i <= 10 || this.flag == true; ++i){
        if(match[i]?.id !== undefined){
          this.match.matchId = match[i].id;
          this.match.duration = (match[i].durationSeconds / 60).toFixed(2);
          this.match.isVictory = match[i].players[0].isVictory;

          //**********************************************************/
          //Start time
          //**********************************************************/
          if(isNaN(match[i].start_time)){
            this.match.startTime = undefined;
          }
          else{
            let date = new Date(match[i]?.start_time * 1000);
            let hours = date.getHours();
            let minutes = "0" + date.getMinutes();
            let seconds = "0" + date.getSeconds();
            let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            this.match.startTime = formattedTime;
          }


          //**********************************************************/
          //Gold lead
          //**********************************************************/
          let radiantGoldLead = 0;
          let direGoldLead = 0;

          for(let j = 0; j < match?.radiant_gold_adv.length; ++j){
            console.log(j);
            if(match[i]?.radiant_gold_adv[j] > 0){
              if(match[i]?.radiant_gold_adv[j] > radiantGoldLead){
                radiantGoldLead = match[i]?.radiant_gold_adv[j];
              }
            }
            else{
              if(match[i]?.radiant_gold_adv[j] < direGoldLead){
                direGoldLead = match[i]?.radiant_gold_adv[j];
              }
            }
          }
          
          if(Math.abs(radiantGoldLead) > Math.abs(direGoldLead)){
            this.match.largestGoldLead = Math.abs(radiantGoldLead);
            this.match.largestGoldLeadTeam = "Radiant";
          }
          else{
            this.match.largestGoldLead = Math.abs(direGoldLead);
            this.match.largestGoldLeadTeam = "Dire";
          }

          //**********************************************************/
          //XP lead 
          //**********************************************************/
          let radiantXpLead = 0;
          let direXpLead = 0;

          for(let j = 0; j < match?.radiant_xp_adv.length; ++j){
            if(match[i]?.radiant_xp_adv[j] > 0){
              if(match[i]?.radiant_xp_adv[j] > radiantXpLead){
                radiantXpLead = match[i]?.radiant_xp_adv[j];
              }
            }
            else{
              if(match[i]?.radiant_xp_adv[j] < direXpLead){
                direXpLead = match[i]?.radiant_xp_adv[j];
              }
            }
          }

          if(Math.abs(radiantXpLead) > Math.abs(direXpLead)){
            this.match.largestXpLead = Math.abs(radiantXpLead);
            this.match.largestXpLeadTeam = "Radiant";
          }
          else{
            this.match.largestXpLead = Math.abs(direXpLead);
            this.match.largestXpLeadTeam = "Dire";
          }

          //**********************************************************/
          //Deaths
          //**********************************************************/
          for(let j = 0; match[i]?.players.length > 0; ++j){
            if(match[i]?.players[j].account_id == this.steamid){
              this.match.deaths = match[i]?.players[j].deaths;
            }
          }

          
          this.flag == true;
          //heroes, kills, deaths, assists, last hits, denies, GPM, EXPM, level, gold, goldspent, hero damage, tower damage, lane, role, items, backpack, hero healing, networth, neutral item

        }
      }
    });
  }
  //**********************************************************/
  // Saves match and player to database
  //**********************************************************/
  onSubmit2(){

    //call post match to successfully post match to database

    //set all values to null if dont exist
    if(this.match.matchId == undefined){
      this.match.matchId = 0;
    }
    if(this.match.duration == undefined){
      this.match.duration = "0";
    }
    if(this.match.isVictory == undefined){
      this.match.isVictory = true;
    }
    if(this.match.firstBloodTime == undefined){
      this.match.firstBloodTime = "0";
    }
    if(this.match.gameMode == undefined){
      this.match.gameMode = "0";
    }
    if(this.match.largestGoldLead == undefined){
      this.match.largestGoldLead = "0";
    }
    if(this.match.largestGoldLeadTeam == undefined){
      this.match.largestGoldLeadTeam = "0";
    }
    if(this.match.largestXpLead == undefined){
      this.match.largestXpLead = "0";
    }
    if(this.match.largestXpLeadTeam == undefined){
      this.match.largestXpLeadTeam = "0";
    }
    if(this.match.startTime == undefined){
      this.match.startTime = "0";
    }
    if(this.match.deaths == undefined){
      this.match.deaths = 0;
    }

    this.savePlayerService.getAllSavedMatches().subscribe((match: any) => {
    //this.match2.matchId = match[0].matchId;

    this.match2.matchId = 1000;
    this.match2.duration = "1";
    this.match2.isVictory = true;
    this.match2.firstBloodTime= "1";
    this.match2.gameMode = "1";
    this.match2.largestGoldLead = "1";
    this.match2.largestGoldLeadTeam = "1";
    this.match2.largestXpLead = "1";
    this.match2.largestXpLeadTeam = "1";
    this.match2.startTime = "1";
    this.match2.deaths = 1;

    console.log(this.match);

    this.savePlayerService.addMatch(this.match2);

    // //If player exists, add match to player
    // this.savePlayerService.getAllSavedPlayers().subscribe((players:any) => {
    //   for(let i=0; i < players.length ; i++){
    //     if(players.id == this.splayer.id){
    //         //add match to player
    //         this.splayer.matches.id.push(this.match);
    //     }
    //   }
    // });
    //this.savePlayerService.addPlayer(this.splayer);
  })}

  ngOnInit(): void {
    
  }
}
