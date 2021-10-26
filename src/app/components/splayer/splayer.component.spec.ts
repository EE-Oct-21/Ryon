import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplayerComponent } from './splayer.component';

describe('SplayerComponent', () => {
  let component: SplayerComponent;
  let fixture: ComponentFixture<SplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
