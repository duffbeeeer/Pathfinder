import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AugmentedComponent } from './augmented.component';

@NgModule({
  declarations: [AugmentedComponent],
  imports: [
    CommonModule
  ],
  exports: [AugmentedComponent]
})
export class AugmentedModule { }
