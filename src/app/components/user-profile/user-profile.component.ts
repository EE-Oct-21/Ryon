import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Auth } from 'src/app/models/auth/auth.model';
import { SPlayer } from 'src/app/models/s-player/splayer.model';
import { SavePlayerService } from 'src/app/services/save-player.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  playerExists = true;
  auth = new Auth();
  playerId = '66914827';
  isPlayer = false;
  player!: SPlayer;
  authId!: any;
  steamId = '';

  constructor(private savePlayerService: SavePlayerService, public authentication: AuthService) {
  }
  ngOnInit(): void {
    //**********************************************************/
    // Fetch this user's ID and store it locally
    //**********************************************************/
    this.authentication.user$.subscribe((data: any) => {
      if (data.sub) {
        this.authId = data.sub.substring(14, 20);
      }
    });
    /**********************************************************/
    // Loop through matches, and display all of associated 
    //   player's match data
    //**********************************************************/
    this.savePlayerService.getSavedPlayerById(this.playerId).subscribe((player: SPlayer) => {
      this.player = player;
    });
    console.log(this.authId);
    this.savePlayerService.getAuth(this.authId).subscribe((object: any) => {
      console.log(object);
    });
  }
  onClick() {
    this.isPlayer = true;
  }

  onSubmit(){
    this.auth.steamId = this.steamId;
    this.auth.id = this.authId;
    this.savePlayerService.addAuth(this.auth);
  }
}