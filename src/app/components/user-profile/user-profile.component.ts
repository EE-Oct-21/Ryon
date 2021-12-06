import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Match } from 'src/app/models/match/match.model';
import { SavePlayerService } from 'src/app/services/save-player.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  authId!: any;
  matchArray!: Match[];
  isPlayer = false;

  constructor(private savePlayerService: SavePlayerService, public auth: AuthService) {
  }
  ngOnInit(): void {

    //**********************************************************/
    // Fetch this user's ID and store it locally
    //**********************************************************/
    this.auth.user$.subscribe((data: any) => {
      this.authId = data.sub.substring(14, 20);

      //**********************************************************/
      // Loop through matches, and display any match that has this
      //    user's auth ID associated with it
      //**********************************************************/
      this.savePlayerService.getAllSavedMatches().subscribe((matchArray: any) => {
        this.matchArray = [];
        for (let i = 0; i < matchArray.length; ++i) {
          if (matchArray[i].authId.toString().includes(this.authId)) {
            this.matchArray.push(matchArray[i]);
          }
        }
      })
    })
  }
  onClick() {
    this.isPlayer = true;
  }
}