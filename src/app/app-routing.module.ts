import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SplayerComponent } from './components/splayer/splayer.component';

const routes: Routes = [{path:'', component: HomepageComponent},{path:'player', component: SplayerComponent}];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
