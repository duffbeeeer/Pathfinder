import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
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
  scoreList: boolean;

  @ViewChild('userPosition') userPositionRef: ElementRef;
  @ViewChild('userName') userNameRef: ElementRef;
  @ViewChild('userScoreLbl') userScoreLblRef: ElementRef;
  @ViewChild('userScoreValue') userScoreValueRef: ElementRef;

  constructor(private scoreService: ScoreService, private renderer: Renderer2) {

    this.scoreList$ = this.scoreService.getHighscoreList();
    this.userStats$ = this.scoreService.getHighscore();
    this.userScore = { username: '', position: 0, score: 0 };
  }

  ngOnInit(): void {
    this.scoreList = false;
    setInterval(() => {
      this.updateScore();
    }, 5000);

    this.updateScore();
    // setTimeout(() => {
    //   this.updateScore();
    //   this.updateScore();
    //   this.updateScore();
    //   console.log('TIMEOUT DONE')
    // }, 500);
  }

  updateScore() {
    this.userStats$.forEach(res => {
      this.userPositionRef.nativeElement.innerText = '#' + res.position + ' ';
      this.userNameRef.nativeElement.innerText = res.username;
      this.userScoreLblRef.nativeElement.innerText = 'SCORE: ';
      this.userScoreValueRef.nativeElement.innerText = res.score;
    });
    this.scoreList$ = this.scoreService.getHighscoreList();
  }

  onClick() {
    if (!this.scoreList) {
      this.updateScore();
    }
    this.scoreList = !this.scoreList;
  }
}
