import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '@auth0/auth0-spa-js';
import { Match } from 'src/app/models/match/match.model';
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

  flag2: boolean = false;
  splayer = new SPlayer;
  match = new Match;
  match2 = new Match;
  steamid = '';
  isPlayer = false; //flag for displaying logo

  constructor(private savePlayerService: SavePlayerService, private stratzService: StratzService, private opendotaService: OpendotaService, @Inject(DOCUMENT) public document: Document, public auth: AuthService) {
  }

  onSubmit() {
    //**********************************************************/
    // Store authentication ID in model for future reference
    //**********************************************************/
    this.auth.user$.subscribe((data: any) => {
      this.match.authId = [];
      //console.log(data);
      this.match.authId.push(data.sub.substring(14,35));
      //console.log(this.match.authId);
   
    }),

    this.isPlayer = true;
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
        for (let i = 0; i <= 10; ++i) {
          if (match[i]?.id !== undefined) {
            this.match = match[i];


            //**********************************************************/
            //Start time
            //**********************************************************/

            let a = new Date(match[i]?.startDateTime * 1000);
            let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
            let year = a.getFullYear();
            let month = months[a.getMonth()];
            let date = a.getDate();
            let hour = a.getHours();
            let minutes = a.getMinutes();
            let seconds =  a.getSeconds();
            let formattedTime = month + ' ' + date + ', ' + year + ' at ' + hour + ':' + minutes + ':' + seconds; 
            this.match.startTime = formattedTime;

            //**********************************************************/
            // Gets more match data on given match id from OpenDota API
            //**********************************************************/
            this.opendotaService.getMatch(this.match.id).subscribe((match: any) => {
              //**********************************************************/
              //Gold lead
              //**********************************************************/
              let radiantGoldLead = 0;
              let direGoldLead = 0;

              for (let j = 0; j < match?.radiant_gold_adv?.length; ++j) {
                if (match.radiant_gold_adv[j] >= 0) {
                  if (match.radiant_gold_adv[j] > radiantGoldLead) {
                    radiantGoldLead = match.radiant_gold_adv[j];
                  }
                }
                else {
                  if (match.radiant_gold_adv[j] < direGoldLead) {
                    direGoldLead = match.radiant_gold_adv[j];
                  }
                }
              }

              if (Math.abs(radiantGoldLead) > Math.abs(direGoldLead)) {
                this.match.largestGoldLead = Math.abs(radiantGoldLead);
                this.match.largestGoldLeadTeam = "Radiant";
              }
              else {
                this.match.largestGoldLead = Math.abs(direGoldLead);
                this.match.largestGoldLeadTeam = "Dire";
              }

              //**********************************************************/
              //XP lead 
              //**********************************************************/
              let radiantXpLead = 0;
              let direXpLead = 0;

              for (let j = 0; j < match?.radiant_xp_adv?.length; ++j) {
                if (match.radiant_xp_adv[j] > 0) {
                  if (match.radiant_xp_adv[j] > radiantXpLead) {
                    radiantXpLead = match.radiant_xp_adv[j];
                  }
                }
                else {
                  if (match.radiant_xp_adv[j] < direXpLead) {
                    direXpLead = match.radiant_xp_adv[j];
                  }
                }
              }

              if (Math.abs(radiantXpLead) > Math.abs(direXpLead)) {
                this.match.largestXpLead = Math.abs(radiantXpLead);
                this.match.largestXpLeadTeam = "Radiant";
              }
              else {
                this.match.largestXpLead = Math.abs(direXpLead);
                this.match.largestXpLeadTeam = "Dire";
              }
              //**********************************************************/
              //Deaths
              //**********************************************************/
              for (let j = 0; match.players.length > 0; ++j) {
                if (match.players[j].account_id == this.steamid) {
                  this.match.deaths = match.players[j].deaths;
                }
              }
            });
            break;
            //heroes, kills, deaths, assists, last hits, denies, GPM, EXPM, level, gold, goldspent, hero damage, tower damage, lane, role, items, backpack, hero healing, networth, neutral item

          }
        }

        //initilize values if they dont exist so posting works
        if (this.match.id == undefined) {
          this.match.id = 0;
        }
        if (this.match.durationSeconds == undefined) {
          this.match.durationSeconds = "0";
        }
        if (this.match.victory == undefined) {
          this.match.victory = false;
        }
        if (this.match.firstBloodTime == undefined) {
          this.match.firstBloodTime = "0";
        }
        if (this.match.gameMode == undefined) {
          this.match.gameMode = "0";
        }
        if (this.match.heroes == undefined) {
          this.match.heroes = "0";
        }
        if (this.match.largestGoldLead == undefined) {
          this.match.largestGoldLead = "0";
        }
        if (this.match.largestGoldLeadTeam == undefined) {
          this.match.largestGoldLeadTeam = "0";
        }
        if (this.match.largestXpLead == undefined) {
          this.match.largestXpLead = "0";
        }
        if (this.match.largestXpLeadTeam == undefined) {
          this.match.largestXpLeadTeam = "0";
        }
        if (this.match.startTime == undefined) {
          this.match.startTime = "0";
        }
        if (this.match.deaths == undefined || this.match.deaths == null) {
          this.match.deaths = 0;
        }

      });
  }
  //**********************************************************/
  // Saves match and player to database
  //**********************************************************/
  onSubmit2() {

    this.flag2 = true;



    //call post match to successfully post match to database



    this.savePlayerService.getAllSavedMatches().subscribe((match: any) => {

      this.savePlayerService.addMatch(this.match);

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
    })
  }

  ngOnInit(): void {

  }
}
