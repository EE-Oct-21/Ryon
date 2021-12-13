import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
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
  authId!: any;

  constructor(private savePlayerService: SavePlayerService, public auth: AuthService) {
  }
  ngOnInit(): void {
    //**********************************************************/
    // Fetch this user's ID and store it locally
    //**********************************************************/
    this.auth.user$.subscribe((data: any) => {
      if (data.sub) {
        this.authId = data.sub.substring(14, 20);
      }
    })
    /**********************************************************/
    // Loop through matches, and display all of associated 
    //   player's match data
    //**********************************************************/
    this.savePlayerService.getSavedPlayerById(this.playerId).subscribe((player: SPlayer) => {
      this.player = player;
    });
  }
  onClick() {
    this.isPlayer = true;
  }
}