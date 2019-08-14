import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AugmentedComponent } from './augmented.component';
import { WebcamModule } from 'ngx-webcam';
import { AframePipeModule } from 'angular-aframe-pipe';
import { WebCamModule } from 'ack-angular-webcam';

@NgModule({
  declarations: [AugmentedComponent],
  imports: [
    CommonModule,
    WebcamModule,
    AframePipeModule,
    WebCamModule
  ],
  exports: [AugmentedComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AugmentedModule { }
