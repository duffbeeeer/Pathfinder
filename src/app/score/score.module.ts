import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreComponent } from './score.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [ScoreComponent],
  imports: [
    CommonModule, MatMenuModule
  ],
  exports: [ScoreComponent]
})
export class ScoreModule { }
