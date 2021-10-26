import { getLocaleDayNames } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Hero } from 'src/app/models/hero/hero.model';
import { StratzService } from 'src/app/services/stratz.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  hero: Hero = new Hero;
  @Input() heroId!: number;
  

  constructor(private stratzService: StratzService) { }

  ngOnInit(): void {
    //This searches the api for the given hero id and sets the appropriate values
    this.stratzService.getHero().subscribe((object) => {
      for(let i = 1; i <= 135; ++i){
        if(object[i]?.id !== undefined)
        {
          if(object[i]?.id == this.heroId)
          {
            this.hero.id = object[i].id;
            this.hero.name = object[i].displayName;
          }
        }
      }
    });

  }
}


