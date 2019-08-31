import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsComponent } from './maps.component';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBoL1fpHu6eozEg-4rvIT2JYrZPT4h5h18'
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


