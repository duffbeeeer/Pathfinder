import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsComponent } from './maps.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC76G02b0O-c2AJhsX9nmcn06_0clEcNUM'
    })
  ],
  declarations: [
    MapsComponent
  ],
  exports: [
    MapsComponent
  ]
})
export class MapsModule { }
