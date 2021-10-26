import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player/player.model';
import { OpendotaService } from 'src/app/services/opendota.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input() player!: Player;
  @Input() steamid!: string;

  constructor(private opendotaService: OpendotaService) { }

  ngOnInit(): void {
    this.opendotaService.getPlayer(this.steamid).subscribe((player: any) => {
      //console.log(player.profile.avatarfull);
      this.player = player;
      this.player.account_id = player.profile.account_id;
      this.player.personaname = player.profile.personaname;
      this.player.name = player.profile.name;
      this.player.avatar = player.profile.avatarfull;
      this.player.profileurl = player.profile.profileurl;
      this.player.mmr_estimate = player.mmr_estimate.estimate;
    });
  }

}
