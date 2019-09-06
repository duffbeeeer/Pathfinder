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
    this.updateScore();
    setInterval(() => {
      this.updateScore();
    }, 3000);
  }

  updateScore() {
    this.userStats$.forEach(res => {
      this.userScore.username = res.username;
      this.userScore.score = res.score;
      this.userScore.position = res.position;
    });
    this.scoreList$ = this.scoreService.getHighscoreList();
    this.userPositionRef.nativeElement.innerText = '#' + this.userScore.position + ' ';
    this.userNameRef.nativeElement.innerText = this.userScore.username;
    this.renderer.setStyle(this.userNameRef.nativeElement, 'margin-top', '3px');
    this.userScoreLblRef.nativeElement.innerText = 'SCORE: ';
    this.userScoreValueRef.nativeElement.innerText = this.userScore.score;
  }

  onClick() {
    if (!this.scoreList) {
      this.updateScore();
    }
    this.scoreList = !this.scoreList;
  }
}
