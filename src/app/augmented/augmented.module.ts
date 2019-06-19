import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AugmentedComponent } from './augmented.component';
import { WebcamModule } from 'ngx-webcam';

@NgModule({
  declarations: [AugmentedComponent],
  imports: [
    CommonModule,
    WebcamModule
  ],
  exports: [AugmentedComponent]
})
export class AugmentedModule { }
