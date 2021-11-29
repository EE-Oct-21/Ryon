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

  hero = new Hero;
  heroId = '135';
  

  constructor(private stratzService: StratzService) { }

  ngOnInit(): void {
    //**********************************************************/
    // Searches the API for the given hero ID and then stores the hero data
    //**********************************************************/
    this.stratzService.getHero().subscribe((heroes: any) => {
      for(let i = 1; i <= heroes.length; ++i){
        if(heroes[i]?.id !== undefined)
        {
          if(heroes[i]?.id == this.heroId)
          {
            console.log(heroes[i].displayName);
            console.log(heroes[i].displayName);
            this.hero.id = heroes[i].id;
            this.hero.displayName = heroes[i].displayName;       
          }
        }
      }
    });

  }
}


