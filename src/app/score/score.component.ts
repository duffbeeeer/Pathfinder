import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Highscore } from '../_models/score.model';
import { Observable } from 'rxjs';
import { ScoreService } from '../_services/score.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreComponent implements OnInit {

    scoreList$: Observable<Highscore[]>;

    constructor(private scoreService: ScoreService) {
    }

    ngOnInit(): void {
      this.scoreList$ = this.scoreService.getHighscoreList();
    }

    updateScore() {
      console.log('updating');
      this.scoreList$ = this.scoreService.getHighscoreList();
    }
}
