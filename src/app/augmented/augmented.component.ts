import { Component, OnInit, ElementRef, ViewContainerRef, ViewChild, AfterViewChecked, HostListener, Input, EventEmitter, Output } from '@angular/core';
import { PositionModel } from '../_shared/ar-view.model';
import { ScoreService } from '../_services/score.service';
import { AuthenticationService } from '../_services';
import { Observable } from 'rxjs';
import { Highscore } from '../_shared/score.model';
import { ViewModel } from '../_shared/active-view.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-augmented',
  templateUrl: './augmented.component.html',
  styleUrls: ['./augmented.component.scss']
})

export class AugmentedComponent implements OnInit, AfterViewChecked {

  @Input()
  public poiId: string;

  @Output()
  activateMaps: EventEmitter<any> = new EventEmitter();

  userStats$: Observable<Highscore>;
  scoreList$: Observable<Highscore[]>;
  scoreArray: Highscore[];
  public timer;
  public videoRef;
  public videoContainerRef;
  public view;
  public currentView: ViewModel;
  public landscape: boolean;
  public isRunning: boolean;
  public isCompleted: boolean;
  public gyroActive: boolean;

  public overallScore: number;
  public screenHeight: number;
  public screenWidth: number;
  public rngIndex: number;
  public timeLeft: number;
  public points: number;
  public dynamicFontColor: string;

  public positions: PositionModel[];
  public newPosition: PositionModel;
  public highscore$: Observable<Highscore>;
  public userScore: Highscore;
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

  userPositionRef;
  userNameRef;
  userScoreLblRef;
  userScoreValueRef;


  constructor(
    private hostElement: ViewContainerRef,
    private scoreService: ScoreService,
    private auth: AuthenticationService,
    private router: Router) {
    this.scoreList$ = this.scoreService.getHighscoreList();
    this.userStats$ = this.scoreService.getHighscore();
    this.scoreList$.forEach(res => {
      this.scoreArray = res;
    });

    this.positions = [
      {
        x: this.rngValue(0, 4),
        y: this.rngValue(0, 0.5),
        z: 1.5
      }
    ];
    this.highscore$ = scoreService.getHighscore();
  }


  ngOnInit() {
    this.userPositionRef = document.getElementById('userPositionId');
    this.userNameRef = document.getElementById('usernameId');
    this.userScoreLblRef = document.getElementById('userScoreLblId');
    this.userScoreValueRef = document.getElementById('userScoreValueId');
    console.log(this.userNameRef);
    console.log(this.userPositionRef);
    console.log(this.userScoreLblRef);
    console.log(this.userScoreValueRef);
    // alert(this.detectBrowser(navigator.userAgent));
    console.log(this.coinBlock);
    window.addEventListener('devicemotion', (event) => {
      if (!event.rotationRate.alpha || !event.rotationRate.beta || !event.rotationRate.gamma) {
        // alert('Please check you safari settings');
      }
    });
    window.innerWidth > window.innerHeight ? this.landscape = true : this.landscape = false;
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight - 90;
    this.isCompleted = false;
    this.isRunning = false;
    this.overallScore = 0;

    this.coinBlock.nativeElement.addEventListener('click', (evt) => {
      this.onHit();
      console.log('I was clicked at: ', evt.detail.intersection.point);

    });

    this.coinBlock.nativeElement.addEventListener('mouseenter', () => {
      this.cursor.nativeElement.setAttribute('material', 'color', '#FF000F');
    });

    this.coinBlock.nativeElement.addEventListener('mouseleave', () => {
      this.cursor.nativeElement.setAttribute('material', 'color', '#156EB0');
    });
    this.startTimer(30);
    setTimeout(() => {
      this.videoRef = document.getElementById('video');
      this.videoContainerRef = document.getElementById('cam');
      const testVideoHeight = this.videoRef.height;
      const testVideoContainerHeight = this.videoContainerRef.clientHeight;
      const yScale = testVideoHeight / testVideoContainerHeight;
      console.log('Yscalefactor!: ', yScale);
      this.videoRef.style.transform = `scaleY(${yScale})`;
      }, 1000);
  }

  ngAfterViewChecked() {

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log(window.innerHeight)
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
    if (this.landscape === false) {
      // if (true) {
      if (!this.isRunning) {
        this.isRunning = !this.isRunning;
      }
      this.timeLeft = time;
      if (this.timerRef !== undefined) {
        this.points = 3000 + this.timeLeft * 100;
        this.timer = setInterval(() => {
          if (this.timeLeft >= 10) {
            this.timeLeft -= 0.01;
            this.points -= 1;
            this.dynamicFontColor = 'white';
          } else if (this.timeLeft >= 0.01) {
            this.timeLeft -= 0.01;
            this.points -= 1;
            this.dynamicFontColor = 'red';
          } else {
            this.timeLeft = 0;
          }
          this.timerRef.nativeElement.textContent = this.timeLeft.toFixed(2);
          if (this.timeLeft === 0) {
            this.addScore();
            this.scoreList$ = this.scoreService.getHighscoreList();
            this.isRunning = false;
          }
        }, 10);
      }
    }
  }


  detectBrowser(userAgent) {
    const chrome = /.*(Chrome\/).*(Safari\/).*/g;
    const firefox = /.*(Firefox\/).*/g;
    const safari = /.*(Version\/).*(Safari\/).*/g;
    const opera = /.*(Chrome\/).*(Safari\/).*(OPR\/).*/g;
    const edge = /.*(Chrome\/).*(Safari\/).*(Edge\/).*/g;
    const ie = /.*(Trident\/7).*(rv:).*/g;

    if (opera.exec(userAgent)) {
      return 'Opera';
    }
    if (edge.exec(userAgent)) {
      return 'Edge';
    }
    if (chrome.exec(userAgent)) {
      return 'Chrome';
    }
    if (safari.exec(userAgent)) {
      return 'Safari';
    }
    if (firefox.exec(userAgent)) {
      return 'Firefox';
    }
    if (ie.exec(userAgent)) {
      return 'Internet Explorer';
    }

    return 'not supported';
  }

  public rngPosition() {

  }

  public onHit() {
    if (this.isRunning) {
      this.positions = [
        {
          x: this.rngValue(0, 4),
          y: this.rngValue(0, 0.5),
          z: 1.5
        }
      ];
      this.rngIndex = Math.floor((Math.random() * this.positions.length));
      console.log('rngindex', this.rngIndex);
      this.newPosition = this.positions[this.rngIndex];
      console.log('Coinblock at: ', this.newPosition);
      this.coinBlock.nativeElement.object3D.position.set(this.newPosition.x, this.newPosition.y, this.newPosition.z);
      this.overallScore += this.points;
      this.scoreRef.nativeElement.textContent = ' ' + this.overallScore;
    }
  }

  back() {
    this.activateMaps.emit();
    console.log('TODO: BACK TO MAPS');
    console.log('rng index', Math.floor((Math.random() * this.positions.length)));
    // console.log(this.rngValue(0, 4));
  }

  rngValue(from: number, to: number) {
    let multiplier: number;
    multiplier = Math.floor(Math.random() * 2) === 1 ? 1 : -1;
    return ((Math.random() * (from - to) + to) * multiplier);
  }
  addScore() {
    clearInterval(this.timer);
    console.log(this.poiId);
    this.scoreService.completePoi(this.poiId, this.overallScore);
    console.log(this.scoreList$.forEach(res => console.log(res)));
    // this.scoreList$ = this.scoreService.getHighscoreList();
    this.scoreList$.forEach(res => {
      this.scoreArray = res;
    });
    console.log(this.scoreList$.forEach(res => console.log(res)));
    this.isCompleted = true;
  }

  onCamError(err) {
    console.log('No Webcam found.');
  }
}
