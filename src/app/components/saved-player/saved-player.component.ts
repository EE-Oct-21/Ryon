import { Component, Input, OnInit } from '@angular/core';
import { Match } from 'src/app/models/match/match.model';
import { SavePlayerService } from 'src/app/services/save-player.service';
import { NgbToastService } from 'ngb-toast';

@Component({
  selector: 'app-saved-player',
  templateUrl: './saved-player.component.html',
  styleUrls: ['./saved-player.component.scss']
})
export class SavedPlayerComponent implements OnInit {
  match = new Match;
  @Input() matchId: any;
  @Input() steamId: any;

  constructor( private savePlayerService: SavePlayerService, private toastService: NgbToastService) { }

  ngOnInit(): void {

    //**********************************************************/
    // Gets more match data on given match id from OpenDota API
    //**********************************************************/
    this.savePlayerService.getSavedMatch(this.matchId).subscribe((match: any) => {
      this.match = match;
    });
  }
}

