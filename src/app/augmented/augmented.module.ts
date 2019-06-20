import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AugmentedComponent } from './augmented.component';
import { WebcamModule } from 'ngx-webcam';

@NgModule({
  declarations: [AugmentedComponent],
  imports: [
    CommonModule,
    WebcamModule
  ],
  exports: [AugmentedComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AugmentedModule { }
