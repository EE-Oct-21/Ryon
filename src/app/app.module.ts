import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SplayerComponent } from './components/splayer/splayer.component';
import { HeroComponent } from './components/hero/hero.component';
import { AuthModule } from '@auth0/auth0-angular';
import { AuthButtonComponent } from './components/auth-button/auth-button.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    SplayerComponent,
    HeroComponent,
    AuthButtonComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    AuthModule.forRoot({
      domain: 'dev-ulpdvjy2.us.auth0.com',
      clientId: 'k6E8BCBB1pmYMyAFxpuCw6j025SS3Mdq'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
