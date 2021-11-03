import { Component, Input, OnInit } from '@angular/core';
import { Matches } from 'src/app/models/matches/matches.model';
import { StratzService } from 'src/app/services/stratz.service';

@Component({
  selector: 'app-player-matches',
  templateUrl: './player-matches.component.html',
  styleUrls: ['./player-matches.component.scss']
})
export class PlayerMatchesComponent implements OnInit {

  @Input() matches!: Matches;
  @Input() steamid!: string;

  constructor(private stratzService: StratzService) { }

  ngOnInit(): void {
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
        }
      }

      //heroes, kills, deaths, assists, last hits, denies, GPM, EXPM, level, gold, goldspent, hero damage, tower damage, lane, role, items, backpack, hero healing, networth, neutral item

    });
  }

}
