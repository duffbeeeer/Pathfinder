import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsComponent } from './maps.component';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC76G02b0O-c2AJhsX9nmcn06_0clEcNUM'
    }),
    AgmDirectionModule
  ],
  declarations: [
    MapsComponent
  ],
  exports: [
    MapsComponent
  ]
})
export class MapsModule { }
