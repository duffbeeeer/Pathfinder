import { Component, OnInit, ElementRef, ViewContainerRef, ViewChild, AfterViewChecked, HostListener } from '@angular/core';
import { PositionModel } from '../shared/ar-view.model';
import { ScoreService } from '../_services/score.service';
import { AuthenticationService } from '../_services';
import { Observable } from 'rxjs';
import { Highscore } from '../_models/score.model';

@Component({
  selector: 'app-augmented',
  templateUrl: './augmented.component.html',
  styleUrls: ['./augmented.component.scss']
})

export class AugmentedComponent implements OnInit, AfterViewChecked {

  public screenWidth: number;
  public screenHeight: number;
  public landscape: boolean;
  public highscore$: Observable<Highscore>;
  private timer;
  private score: number;
  private timeLeft: number;
  private positions: PositionModel[];
  private rngIndex: number;
  private videoRef;

  @ViewChild('coinBlock') coinBlock: ElementRef;
  @ViewChild('cursor') cursor: ElementRef;
  @ViewChild('scene') sceneRef: ElementRef;
  @ViewChild('score') scoreRef: ElementRef;
  @ViewChild('timer') timerRef: ElementRef;

  options = {
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

  constructor(private hostElement: ViewContainerRef, private scoreService: ScoreService, private auth: AuthenticationService) {
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


  ngOnInit() {
    // document.documentElement.requestFullscreen();
    // window.screen.orientation.lock('portrait');
    window.innerWidth > window.innerHeight ? this.landscape = true : this.landscape = false;
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight - 90;

    this.score = 0;

    this.coinBlock.nativeElement.addEventListener('click', (evt) => {
      this.onHit(this.rngPosition());
      console.log('I was clicked at: ', evt.detail.intersection.point);

      console.log(this.scoreRef.nativeElement.children[0].attributes.value);
      this.scoreRef.nativeElement.children[0].setAttribute('value', 'Score: ' + this.score);
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


  startTimer(time: number) {
    if (this.landscape === false) {
      this.timeLeft = time;
      if(this.timerRef!=undefined){

        this.timer = setInterval(() => {
          this.timeLeft > 0.1 ? this.timeLeft -= 0.1 : this.timeLeft = 0;
          this.timerRef.nativeElement.children[0].setAttribute("value", "Time: " + this.timeLeft.toFixed(1));
          this.timerRef.nativeElement.textContent = 'Time: ' + this.timeLeft.toFixed(1);
        }, 100);
      }
    }
  }

  public rngPosition(): PositionModel {
    this.rngIndex = Math.floor((Math.random() * this.positions.length));
    return this.positions[this.rngIndex];
  }

  public onHit(newPosition: PositionModel) {
    this.coinBlock.nativeElement.object3D.position.set(newPosition.x, newPosition.y, newPosition.z);
    this.score += 1;
    this.scoreRef.nativeElement.textContent = 'Score: ' + this.score;
  }

  onCamError(err) {
    console.log('No Webcam found.');
  }

  firePoi() {
    this.auth.login('kyatar ', 'kyatar');
    this.scoreService.completePoi('5d5d1fb2fd641d3e24c9d938', 137);
    console.log('FIRED');
  }
}
