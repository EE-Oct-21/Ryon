import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { Hero } from 'src/app/models/hero/hero.model';
import { StratzService } from 'src/app/services/stratz.service';


import { HeroComponent } from './hero.component';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;

  let hero = new Hero();
  hero.id = '1';
  hero.displayName = 'Axe';

  let hero1 = new Hero();
  hero1.id = '2';
  hero1.displayName = 'Anti-Mage';

  let hero2 = new Hero();
  hero2.id = '135';
  hero2.displayName = 'Dawnbreaker';

  let heroes = [hero, hero1, hero2]

  const stratzServiceSpy = jasmine.createSpyObj('StratzService',['getHero']);
  stratzServiceSpy.getHero.and.returnValue(of(heroes));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroComponent ],
      imports: [ AppModule ],
      providers: [
        { provide: StratzService, useValue: stratzServiceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct hero given ID', ()=> {
    const heroId = fixture.debugElement.nativeElement.querySelector('#heroId');
    expect(heroId.textContent).toBe(heroes[2].id);
  });

  it('should display correct hero given name', ()=> {
    const heroName = fixture.debugElement.nativeElement.querySelector('#heroName');
    expect(heroName.textContent).toBe(heroes[2].displayName);
  });

});
