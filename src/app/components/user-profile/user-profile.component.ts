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

  constructor(private savePlayerService: SavePlayerService, public auth: AuthService) {
  }
  ngOnInit(): void {

    //**********************************************************/
    // Fetch this user's ID and store it locally
    //**********************************************************/
    this.auth.user$.subscribe((data: any) => {
        this.authId = data.sub.substring(14,20);
        console.log(this.authId);
    
    //**********************************************************/
    // Loop through matches, and display any match that has this
    //    user's auth ID associated with it
    //**********************************************************/
    this.savePlayerService.getAllSavedMatches().subscribe((matchArray: any) => {
      this.matchArray = [];
      console.log(matchArray);
      console.log(this.matchArray);
      console.log("Right before for loop");
      for(let i = 0; i < matchArray.length; ++i){
        console.log("Inside for loop");
        console.log(this.authId);
        console.log(matchArray[i].authId + ' ' + this.authId);
        console.log(typeof matchArray[i].authId);
        console.log(typeof this.authId);
        console.log(matchArray[i].authId.includes(this.authId));
        if(matchArray[i].authId.includes(this.authId)){
          console.log("Inside if");
          this.matchArray.push(matchArray[i]);
          console.log(this.matchArray);
        }
      }
    })
  })
  }
  //need to show all match objects with this users auth ID :)
}