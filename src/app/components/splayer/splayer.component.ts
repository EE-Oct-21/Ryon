import { Component, Input, OnInit } from '@angular/core';
import { SPlayer } from 'src/app/models/s-player/splayer.model';
import { StratzService } from 'src/app/services/stratz.service';

@Component({
  selector: 'app-splayer',
  templateUrl: './splayer.component.html',
  styleUrls: ['./splayer.component.scss']
})
export class SplayerComponent implements OnInit {

  @Input() splayer!: SPlayer;
  @Input() steamid!: string;

  constructor(private stratzService: StratzService) { }

  ngOnInit(): void {
    this.stratzService.getPlayer(this.steamid).subscribe((Player: any) => {
      //console.log(Player)
      this.splayer = Player;
      this.splayer.name = Player.steamAccount.name;
      this.splayer.id = Player.steamAccount.id;
      this.splayer.realName = Player.steamAccount.realName;
      this.splayer.avatar = Player.steamAccount.avatar;
      this.splayer.profileUri = Player.steamAccount.profileUri;
    });
  }

}
