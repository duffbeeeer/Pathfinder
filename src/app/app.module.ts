import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { NavigationModule } from './navigation/navigation.module';
import { MapsModule } from './maps/maps.module';
import { AugmentedModule } from './augmented/augmented.module';
import { ScoreModule } from './score/score.module';
import { GeolocationService } from './_services/geolocation.service';
import { RegistrationComponent } from './login/registration/registration.component';
import { SuccessfulRegistrationComponent } from './login/successful-registration/successful-registration.component';
import { ScoreService } from './_services/score.service';

@NgModule({
  imports: [
      BrowserModule,
      ReactiveFormsModule,
      HttpClientModule,
      AppRoutingModule,
      NavigationModule,
      MapsModule,
      AugmentedModule,
      ScoreModule,
      FormsModule
  ],
  declarations: [
      AppComponent,
      HomeComponent,
      LoginComponent,
      RegistrationComponent,
      SuccessfulRegistrationComponent
  ],
  providers: [
      { provide: GeolocationService, useClass: GeolocationService },
      { provide: ScoreService, useClass: ScoreService },
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

      // provider used to create fake backend
      // fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
