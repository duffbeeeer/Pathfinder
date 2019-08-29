import { Component, OnInit, ElementRef, ViewContainerRef, ViewChild, AfterViewChecked, HostListener, Input } from '@angular/core';
import { PositionModel } from '../shared/ar-view.model';
import { ScoreService } from '../_services/score.service';
import { AuthenticationService } from '../_services';
import { Observable } from 'rxjs';
import { Highscore, PointOfInterest } from '../_models/score.model';
import { ViewModel, View, initialView } from '../shared/active-view.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-augmented',
  templateUrl: './augmented.component.html',
  styleUrls: ['./augmented.component.scss']
})

export class AugmentedComponent implements OnInit, AfterViewChecked {

  @Input()
  public poiId: PointOfInterest;

  public timer;
  public videoRef;
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

  videoDevices: MediaDeviceInfo[];


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
    if (MediaDeviceInfo) {
      console.log('yay');
      console.log(MediaDeviceInfo);
    }
    if (!MediaDeviceInfo) {
      console.log('noope');
      console.log(MediaDeviceInfo);
    }
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
            this.isRunning = false;
            this.isCompleted = true;
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
      this.rngIndex = Math.floor((Math.random() * this.positions.length));
      this.newPosition = this.positions[this.rngIndex];
      this.coinBlock.nativeElement.object3D.position.set(this.newPosition.x, this.newPosition.y, this.newPosition.z);
      this.overallScore += this.points;
      this.scoreRef.nativeElement.textContent = ' ' + this.overallScore;
    }
  }

  back() {
    console.log('TODO: BACK TO MAPS');
  }

  addScore() {
    clearInterval(this.timer);
    // this.auth.login('kyatar1', 'kyatar1');
    // this.scoreService.completePoi('5d58e2e64f24ca11280a3e8a#', this.score);
    this.scoreService.completePoi(this.poiId.id, this.overallScore);
  }

  onCamError(err) {
    console.log('No Webcam found.');
  }

}
