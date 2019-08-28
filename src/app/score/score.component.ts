import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
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

  userScore: Highscore;

  @ViewChild('userScore') userScoreBtn: ElementRef;

  constructor(private scoreService: ScoreService) { }

  ngOnInit(): void {
    this.scoreList$ = this.scoreService.getHighscoreList();
    this.userStats$ = this.scoreService.getHighscore();
    this.updateScore();
    setInterval(() => {
      this.updateScore();
    }, 1000);
  }

  updateScore() {
      this.userStats$.forEach(res => {
        if ( this.userScore) {
          this.userScore.username = res.username;
          this.userScore.score = res.score;
          this.userScore.position = res.position;

        }
      });
      this.scoreList$ = this.scoreService.getHighscoreList();
      if ( this.userScore) {
        const text = '#' + this.userScore.position + ' ' + this.userScore.username + '   ' + 'SCORE: ' + this.userScore;
        this.userScoreBtn.nativeElement.innerText = text;
      }
  }
}
