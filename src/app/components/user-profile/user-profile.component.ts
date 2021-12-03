import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { SavePlayerService } from 'src/app/services/save-player.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  constructor(private savePlayerService: SavePlayerService, public auth: AuthService) {

  }
  ngOnInit(): void {
    this.savePlayerService.getAllSavedMatches().subscribe((matchArray: any) => {
      console.log(matchArray);
    })
  }
  //need to show all match objects with this users auth ID :)
}