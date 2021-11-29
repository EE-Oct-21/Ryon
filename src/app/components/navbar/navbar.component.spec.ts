import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [ AppModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have link for Protractor', ()=>{
    const home = fixture.debugElement.nativeElement.querySelector('#home'); 
    expect(home.textContent).toBe("Protractor");
  });

  it('should have link for Profile when Authenticated', ()=>{
    //need to mock authentication and create condition for when user is authenticated
    const profile = fixture.debugElement.nativeElement.querySelector('#profile'); 
    //expect(profile.textContent).toBe("Profile");
  });

  it('link should navigate to / and /profile', ()=>{
    const anchorTags = fixture.debugElement.nativeElement.querySelectorAll('a');
    expect(anchorTags[0].getAttribute("routerlink")).toEqual("");
    //expect(anchorTags[1].getAttribute("routerlink")).toEqual("/profile");
  })


});
