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
  userStats$: Observable<Highscore>;

  username: string;
  userScore: number;
  position: number;
  constructor(private scoreService: ScoreService) {}

  ngOnInit(): void {
    this.scoreList$ = this.scoreService.getHighscoreList();
    this.userStats$ = this.scoreService.getHighscore();
    this.getStats();
  }

  updateScore() {
    console.log('updating');
    this.getStats();
  }

  getStats() {
    this.userStats$.forEach(res => {
      this.username = res.username;
      this.userScore = res.score;
      this.position = res.position;
    });
  }
}
