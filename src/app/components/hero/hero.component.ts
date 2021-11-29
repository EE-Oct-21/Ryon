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
  heroId = 136;
  

  constructor(private stratzService: StratzService) { }

  ngOnInit(): void {
    //**********************************************************/
    // Searches the API for the given hero ID and then stores the hero data
    //**********************************************************/
    this.stratzService.getHero().subscribe((heroes: any) => {
      console.log(heroes);
      console.log(this.hero);
      //temp logic for code coverage
      this.hero.id = heroes.id;
      this.hero.name = heroes.name;

      for(let i = 1; i <= 136; ++i){
        if(heroes[i]?.id !== undefined)//not getting here
        {
          console.log("passed first if");
          if(heroes[i]?.id == this.heroId)
          {
            this.hero.id = heroes[i].id;
            this.hero.name = heroes[i].displayName;
            console.log("passed second if");         
          }
        }
      }
    });

  }
}


