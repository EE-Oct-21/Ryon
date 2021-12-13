import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Match } from 'src/app/models/match/match.model';
import { SPlayer } from 'src/app/models/s-player/splayer.model';
import { SavePlayerService } from 'src/app/services/save-player.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  playerId = '66914827';
  isPlayer = false;
  player!: SPlayer;
  constructor(private savePlayerService: SavePlayerService, public auth: AuthService) {
  }
  ngOnInit(): void {
    this.savePlayerService.getSavedPlayerById(this.playerId).subscribe((player: SPlayer) => {
      this.player = player;
    })
  }
  onClick(){
    this.isPlayer = true;
  }
}