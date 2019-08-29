import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Highscore } from '../../_models/score.model';

@Component({
  selector: 'app-score-detail-view',
  templateUrl: './score-detail-view.component.html',
  styleUrls: ['./score-detail-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreDetailViewComponent {

  @Input()
  scoreList: Highscore[];
}
