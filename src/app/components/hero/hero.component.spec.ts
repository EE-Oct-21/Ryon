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
  hero.id = '135';
  hero.name = "Dawnbreaker";

  const stratzServiceSpy = jasmine.createSpyObj('StratzService',['getHero']);
  stratzServiceSpy.getHero.and.returnValue(of(hero));

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
    expect(heroId.textContent).toBe(hero.id);
  });

  it('should display correct hero given name', ()=> {
    const heroName = fixture.debugElement.nativeElement.querySelector('#heroName');
    expect(heroName.textContent).toBe(hero.name);
  });

});
