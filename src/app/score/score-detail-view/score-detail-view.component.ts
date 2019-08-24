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

  // constructor() {
  //   console.log(this.players);
  // }
  // players: Player[] = [
  //   {
  //     username: 'torage',
  //     score: 4523
  //   },
  //   {
  //     username: 'torage1',
  //     score: 45232
  //   },
  //   {
  //     username: 'torage2',
  //     score: 453435
  //   },
  //   {
  //     username: 'torage3',
  //     score: 454435
  //   },
  //   {
  //     username: 'torage4',
  //     score: 453435
  //   }
  // ];

}
