import { Component, Input, OnInit, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from 'src/app/models/hero/hero.model';
import { Matches } from 'src/app/models/matches/matches.model';
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
  matches: Matches = new Matches;
  hero: Hero = new Hero;
  steamId = '66914827';
  isId = false;

  onSubmit(){
    this.isId = true;
  }

  constructor() { }

  ngOnInit(): void {

  }
}
