import { Component } from '@angular/core';
import { Player } from './models/player/player.model';
import { OpendotaService } from './services/opendota.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EZDota-UI';

  constructor() { }

}

