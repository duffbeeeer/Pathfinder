import { Component, OnInit, ElementRef, ViewContainerRef, ViewChild, AfterViewChecked, HostListener } from '@angular/core';
import { PositionModel } from '../shared/ar-view.model';
import { ScoreService } from '../_services/score.service';
import { AuthenticationService } from '../_services';
import { Observable } from 'rxjs';
import { Highscore } from '../_models/score.model';
import { ViewModel, View, initialView } from '../shared/active-view.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-augmented',
  templateUrl: './augmented.component.html',
  styleUrls: ['./augmented.component.scss']
})

export class AugmentedComponent implements OnInit, AfterViewChecked {

  public timer;
  public videoRef;
  public view;

  public currentView: ViewModel;
  public landscape: boolean;
  public isRunning: boolean;
  public isCompleted: boolean;

  public overallScore: number;
  public screenHeight: number;
  public screenWidth: number;
  public rngIndex: number;
  public timeLeft: number;
  public points: number
  public dynamicFontColor: string;

  public positions: PositionModel[];
  public newPosition: PositionModel;
  public highscore$: Observable<Highscore>;

  public options = {
    video: {
      advanced: [{
        facingMode: 'environment'
      }]
    },
    audio: false,
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
  };

  @ViewChild('coinBlock') coinBlock: ElementRef;
  @ViewChild('cursor') cursor: ElementRef;
  @ViewChild('scene') sceneRef: ElementRef;
  @ViewChild('score') scoreRef: ElementRef;
  @ViewChild('timer') timerRef: ElementRef;
  @ViewChild('backToMaps') backBtnRef: ElementRef;



  constructor(
    private hostElement: ViewContainerRef,
    private scoreService: ScoreService,
    private auth: AuthenticationService,
    private router: Router) {
    this.positions = [
      { x: 0, y: 0, z: 0 },
      { x: 0.2, y: 0, z: 0 },
      { x: 0.4, y: 0, z: 0 },
      { x: 0.6, y: 0, z: 0 },
      { x: 0.8, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 },
    ];
    this.highscore$ = scoreService.getHighscore();
  }

  ngOnInit() {
    console.log(window.innerHeight);
    window.innerWidth > window.innerHeight ? this.landscape = true : this.landscape = false;
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight - 90;
    this.isCompleted = false;
    this.isRunning = false;
    this.overallScore = 0;

    this.coinBlock.nativeElement.addEventListener('click', (evt) => {
      this.onHit();
      // console.log('I was clicked at: ', evt.detail.intersection.point);
    });

    this.coinBlock.nativeElement.addEventListener('mouseenter', () => {
      this.cursor.nativeElement.setAttribute('material', 'color', '#FF000F');
    });

    this.coinBlock.nativeElement.addEventListener('mouseleave', () => {
      this.cursor.nativeElement.setAttribute('material', 'color', '#156EB0');
    });
    this.startTimer(30);
  }

  ngAfterViewChecked() {
    this.videoRef = document.getElementById('video');
    this.videoRef.style.transform = 'scaleY(1.2)';

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    window.innerWidth > window.innerHeight ? this.landscape = true : this.landscape = false;
    if (window.innerWidth < window.innerHeight) {
      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight;
      this.options = {
        video: {
          advanced: [{
            facingMode: 'environment'
          }]
        },
        audio: false,
        width: window.innerWidth,
        height: window.innerHeight,
        aspectRatio: window.innerWidth / window.innerHeight
      };
    }
  }

  startTimer(time: number) {
    // if (this.landscape === false) {
    if (true) {
      !this.isRunning ? this.isRunning = true : null;
      this.timeLeft = time;
      if (this.timerRef != undefined) {
        this.points = this.timeLeft * 100;
        this.timer = setInterval(() => {
          if (this.timeLeft >= 10) {
            this.timeLeft -= 0.01;
            this.points -= 1;
            this.dynamicFontColor='white';
          } else if (this.timeLeft >= 0.01) {
            this.timeLeft -= 0.01;
            this.points -= 1;
            this.dynamicFontColor='red';
          } else {
            this.timeLeft = 0
          }
          // this.timeLeft > 0.01 ? this.timeLeft -= 0.01 : this.timeLeft = 0;
          // this.timeLeft > 0.01 ? this.points -= 1 : null;
          this.timerRef.nativeElement.textContent = this.timeLeft.toFixed(2);
          if (this.timeLeft == 0) {
            this.addScore();
            this.isRunning = false;
            this.isCompleted = true;
          }
        }, 10);
      }
    }
  }

  public rngPosition() {

  }

  public onHit() {
    if (this.isRunning) {
      this.scoreRef.nativeElement.textContent = 'Score: ' + this.overallScore;
      this.rngIndex = Math.floor((Math.random() * this.positions.length));
      this.newPosition = this.positions[this.rngIndex];
      this.coinBlock.nativeElement.object3D.position.set(this.newPosition.x, this.newPosition.y, this.newPosition.z);
      this.overallScore += this.points;
      this.scoreRef.nativeElement.textContent = 'Score: ' + this.overallScore;
    }
  }

  back() {
    console.log("TODO: BACK TO MAPS")
  }

  addScore() {
    clearInterval(this.timer)
    // this.auth.login('kyatar1', 'kyatar1');
    // this.scoreService.completePoi('5d58e2e64f24ca11280a3e8a#', this.score);
    this.scoreService.completePoi('5d58e2e64f24ca11280a3e8a', this.overallScore);
  }

  onCamError(err) {
    console.log('No Webcam found.');
  }

}