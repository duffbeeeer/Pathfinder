import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AuthGuard } from './_guards';
import { LoginComponent } from './login';
import { MapsComponent } from './maps/maps.component';
import { AugmentedComponent } from './augmented/augmented.component';
import { RegistrationComponent } from './login/registration/registration.component';
import { SuccessfulRegistrationComponent } from './login/successful-registration/successful-registration.component';

const routes: Routes = [
  {
      path: '',
      component: HomeComponent,
      canActivate: [AuthGuard]
  },
  {
      path: 'login',
      component: LoginComponent
  },
  {
      path: 'maps',
      component: MapsComponent
  },
  {
     path: 'register',
     component: RegistrationComponent
  },
  {
     path: 'success',
     component: SuccessfulRegistrationComponent
  },

  // otherwise redirect to home
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
