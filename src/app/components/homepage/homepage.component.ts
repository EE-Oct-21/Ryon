import { Component, Input, OnInit, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from 'src/app/models/hero/hero.model';
import { Match } from 'src/app/models/match/match.model';
import { Player } from 'src/app/models/player/player.model';
import { SPlayer } from 'src/app/models/s-player/splayer.model';
import { OpendotaService } from 'src/app/services/opendota.service';
import { StratzService } from 'src/app/services/stratz.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  player: Player = new Player;
  splayer: SPlayer = new SPlayer;
  match: Match = new Match;
  hero: Hero = new Hero;

  constructor() { }

  ngOnInit(): void {

  }
}
