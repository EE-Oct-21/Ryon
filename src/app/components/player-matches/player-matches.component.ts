import { Component, Input, OnInit } from '@angular/core';
import { Match } from 'src/app/models/match/match.model';
import { StratzService } from 'src/app/services/stratz.service';

@Component({
  selector: 'app-player-matches',
  templateUrl: './player-matches.component.html',
  styleUrls: ['./player-matches.component.scss']
})
export class PlayerMatchesComponent implements OnInit {

  @Input() match!: Match;
  @Input() steamid!: string;

  constructor(private stratzService: StratzService) { }

  ngOnInit(): void {
    this.stratzService.getPlayerMatches(this.steamid).subscribe((match: any) => {
      
      //initilize match object properties (since it is an array)
      this.match.id = [];
      this.match.duration = [];
      this.match.isVictory = [];

      //add match information to match object
      for(let i = 0; i <= 10; ++i){
        if(match[i]?.id !== undefined){
          this.match.id.push(match[i].id);
          this.match.duration.push((match[i].durationSeconds / 60).toFixed(2));
          this.match.isVictory.push(match[i].players[0].isVictory);
        }
      }

      //heroes, kills, deaths, assists, last hits, denies, GPM, EXPM, level, gold, goldspent, hero damage, tower damage, lane, role, items, backpack, hero healing, networth, neutral item

    });
  }

}
