import { Component, Input, OnInit } from '@angular/core';
import { Match } from 'src/app/models/match/match.model';
import { Matches } from 'src/app/models/matches/matches.model';
import { SPlayer } from 'src/app/models/s-player/splayer.model';
import { OpendotaService } from 'src/app/services/opendota.service';
import { StratzService } from 'src/app/services/stratz.service';

@Component({
  selector: 'app-splayer',
  templateUrl: './splayer.component.html',
  styleUrls: ['./splayer.component.scss']
})
export class SplayerComponent implements OnInit {

  @Input() splayer!: SPlayer;
  @Input() steamid!: string;
  @Input() matches!: Matches;
  @Input() match!: Match;

  constructor(private stratzService: StratzService, private opendotaService: OpendotaService) { }

  ngOnInit(): void {
    this.stratzService.getPlayer(this.steamid).subscribe((Player: any) => {
      //console.log(Player)
      this.splayer = Player;
      this.splayer.name = Player.steamAccount.name;
      this.splayer.id = Player.steamAccount.id;
      this.splayer.realName = Player.steamAccount.realName;
      this.splayer.avatar = Player.steamAccount.avatar;
      this.splayer.profileUri = Player.steamAccount.profileUri;
    }),
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
    }),
    this.opendotaService.getMatch("5321297322").subscribe((match: any) => {
      this.match = match;
      this.match.matchid = match?.match_id;
      for(let i = 0; i <= 19; ++i){
          
      }
    })
    ;
  }
}
