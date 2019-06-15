import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { JwtInterceptor, ErrorInterceptor, fakeBackendProvider } from './_helpers';
import { NavigationComponent } from './navigation/navigation.component';
import { NavigationModule } from './navigation/navigation.module';

@NgModule({
  imports: [
      BrowserModule,
      ReactiveFormsModule,
      HttpClientModule,
      AppRoutingModule,
      NavigationModule
  ],
  declarations: [
      AppComponent,
      HomeComponent,
      LoginComponent
  ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

      // provider used to create fake backend
      fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
