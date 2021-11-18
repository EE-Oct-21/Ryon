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

  splayer = new SPlayer;
  matches = new Matches;
  match = new Match;
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
      //console.log(Player)
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
    this.stratzService.getPlayerMatches(this.steamid).subscribe((matches: any) => {
      
      //initilize match object properties (since it is an array)
      this.matches.id = [];
      this.matches.duration = [];
      this.matches.isVictory = [];

      //add match information to match object
      for(let i = 0; i <= 10; ++i){
        if(matches[i]?.id !== undefined){
          this.matches.id.push(matches[i].id);
          this.matches.duration.push((matches[i].durationSeconds / 60).toFixed(2));
          this.matches.isVictory.push(matches[i].players[0].isVictory);

          //heroes, kills, deaths, assists, last hits, denies, GPM, EXPM, level, gold, goldspent, hero damage, tower damage, lane, role, items, backpack, hero healing, networth, neutral item

        }
      }
      //**********************************************************/
      // Gets match data from first match and stores in Match Model
      //**********************************************************/
      this.opendotaService.getMatch(this.matches.id[5]).subscribe((match: any) => {
        this.match = match;
        this.match.matchid = match?.match_id;

        //**********************************************************/
        //Start time
        //**********************************************************/
        let date = new Date(match?.start_time * 1000);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let seconds = "0" + date.getSeconds();
        let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        this.match.startTime = formattedTime;


        //**********************************************************/
        //Gold lead
        //**********************************************************/
        let radiantGoldLead = 0;
        let direGoldLead = 0;

        for(let i = 0; i < match?.radiant_gold_adv.length; ++i){
          if(match?.radiant_gold_adv[i] > 0){
            if(match?.radiant_gold_adv[i] > radiantGoldLead){
              radiantGoldLead = match?.radiant_gold_adv[i];
            }
          }
          else{
            if(match?.radiant_gold_adv[i] < direGoldLead){
              direGoldLead = match?.radiant_gold_adv[i];
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

        for(let i = 0; i < match?.radiant_xp_adv.length; ++i){
          if(match?.radiant_xp_adv[i] > 0){
            if(match?.radiant_xp_adv[i] > radiantXpLead){
              radiantXpLead = match?.radiant_xp_adv[i];
            }
          }
          else{
            if(match?.radiant_xp_adv[i] < direXpLead){
              direXpLead = match?.radiant_xp_adv[i];
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
        for(let i = 0; match?.players.length > 0; ++i){
          if(match?.players[i].account_id == this.steamid){
            this.match.deaths = match?.players[i].deaths;
          }
        }

      })
    });
  }
  //**********************************************************/
  // Saves match and player to database
  //**********************************************************/
  onSubmit2(){

    this.savePlayerService.addMatch(this.match);

    //If player exists, add match to player
    this.savePlayerService.getAllSavedPlayers().subscribe((players:any) => {
      for(let i=0; i < players.length ; i++){
        if(players.id == this.splayer.id){
            //add match to player
            this.splayer.matches.id.push(this.match);
        }
      }
    });
    this.savePlayerService.addPlayer(this.splayer);
  }

  ngOnInit(): void {
    
  }
}
