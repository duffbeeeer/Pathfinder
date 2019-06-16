import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AuthGuard } from './_guards';
import { LoginComponent } from './login';
import { MapsComponent } from './maps/maps.component';

const routes: Routes = [
  {
      path: '',
      component: LoginComponent
      // canActivate: [AuthGuard]
  },
  {
      path: 'home',
      component: HomeComponent
  },
  {
      path: 'maps',
      component: MapsComponent
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
