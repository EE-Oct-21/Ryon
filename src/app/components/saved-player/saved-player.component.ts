import { Component, Input, OnInit } from '@angular/core';
import { Match } from 'src/app/models/match/match.model';
import { SavePlayerService } from 'src/app/services/save-player.service';
import { NgbToastService } from 'ngb-toast';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-saved-player',
  templateUrl: './saved-player.component.html',
  styleUrls: ['./saved-player.component.scss']
})
export class SavedPlayerComponent implements OnInit {
  match = new Match;
  authId!: any;
  matchArray!: Match[];
  isPlayer = false;

  constructor(private savePlayerService: SavePlayerService, private auth: AuthService, private toastService: NgbToastService) { }

  ngOnInit(): void {
    //**********************************************************/
    // Fetch this user's ID and store it locally
    //**********************************************************/
    this.auth.user$.subscribe((data: any) => {
      if (data.sub) {
        this.authId = data.sub.substring(14, 20);
      }

    })
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

  }
  onClick() {
    this.isPlayer = true;
    this.matchArray.reverse();
  }
}
