import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreComponent } from './score.component';
import { ScoreCompactViewComponent } from './score-compact-view/score-compact-view.component';
import { ScoreDetailViewComponent } from './score-detail-view/score-detail-view.component';

@NgModule({
  declarations: [ScoreComponent, ScoreCompactViewComponent, ScoreDetailViewComponent],
  imports: [
    CommonModule
  ],
  exports: [ScoreComponent, ScoreCompactViewComponent, ScoreDetailViewComponent]
})
export class ScoreModule { }
