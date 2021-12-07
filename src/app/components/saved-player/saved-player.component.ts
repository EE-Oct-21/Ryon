import { Component, Input, OnInit } from '@angular/core';
import { Match } from 'src/app/models/match/match.model';
import { OpendotaService } from 'src/app/services/opendota.service';
import { SavePlayerService } from 'src/app/services/save-player.service';
import { NgbToastService } from 'ngb-toast';

@Component({
  selector: 'app-saved-player',
  templateUrl: './saved-player.component.html',
  styleUrls: ['./saved-player.component.scss']
})
export class SavedPlayerComponent implements OnInit {
  match = new Match;
  @Input() matchId: any;
  @Input() steamId: any;

  constructor(private opendotaService: OpendotaService, private savePlayerService: SavePlayerService, private toastService: NgbToastService) { }

  ngOnInit(): void {

    //**********************************************************/
    // Gets more match data on given match id from OpenDota API
    //**********************************************************/
    this.opendotaService.getMatch(this.matchId).subscribe((match: any) => {
      this.match = match;

      let a = new Date(match.start_time * 1000);
      let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      let year = a.getFullYear();
      let month = months[a.getMonth()];
      let date = a.getDate();
      let hour = a.getHours();
      let minutes = a.getMinutes();
      let seconds = a.getSeconds();
      let formattedTime = month + ' ' + date + ', ' + year + ' at ' + hour + ':' + minutes + ':' + seconds;
      this.match.start_time = formattedTime;
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
      this.match.deaths = match.players[0].deaths;

    });
    //heroes, kills, deaths, assists, last hits, denies, GPM, EXPM, level, gold, goldspent, hero damage, tower damage, lane, role, items, backpack, hero healing, networth, neutral item

  }
}

