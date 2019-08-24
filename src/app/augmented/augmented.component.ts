import { Component, OnInit, ElementRef, ViewContainerRef, ViewChild, AfterViewChecked  } from '@angular/core';
import { PositionModel } from '../shared/ar-view.model';
import { ScoreService } from '../_services/score.service';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-augmented',
  templateUrl: './augmented.component.html',
  styleUrls: ['./augmented.component.scss']
})

export class AugmentedComponent implements OnInit, AfterViewChecked {
  public screenWidth: number;
  public screenHeight: number;
  public landscape: boolean;

  private aframe = (window as any).AFRAME;
  private positions: PositionModel[];
  private rngIndex: number;
  private videoRef;

  @ViewChild('coinBlock') coinBlock: ElementRef;
  @ViewChild('cursor') cursor: ElementRef;
  @ViewChild('scene') sceneRef: ElementRef;


  options = {
    video    : {
        advanced: [{
        facingMode: 'environment'
      }]
    },
    audio    : false,
    width    : window.innerWidth,
    height   : window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight

  };

  constructor(private hostElement: ViewContainerRef, private scoreService: ScoreService, private auth: AuthenticationService) {
    this.positions = [
      {x: 0, y: 0 , z: 0},
      {x: 0.2, y: 0 , z: 0},
      {x: 0.4, y: 0 , z: 0},
      {x: 0.6, y: 0 , z: 0},
      {x: 0.8, y: 0 , z: 0},
      {x: 1, y: 0 , z: 0},
    ];
  }


  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight - 90;
    console.log(this.options);
    console.log('Screen Width: ' + this.screenWidth + '\nScreen Height: ' + this.screenHeight);
    this.aframe.registerComponent('cursor-listener', {
        init: () => {
          console.log(this.coinBlock);
          this.coinBlock.nativeElement.addEventListener('click', (evt) => {
            this.onHit(this.rngPosition());
            console.log('I was clicked at: ', evt.detail.intersection.point);
          });

          this.coinBlock.nativeElement.addEventListener('mouseenter', () => {
            this.cursor.nativeElement.setAttribute('material', 'color', '#FF000F');
          });
          this.coinBlock.nativeElement.addEventListener('mouseleave', () => {
            this.cursor.nativeElement.setAttribute('material', 'color', '#00ffff');
          });
        }
      });
    }

  ngAfterViewChecked() {
    this.videoRef = document.getElementById('video');
    // this.videoRef.style.transform = 'scaleY(1.2)';
    window.innerWidth > window.innerHeight ? this.landscape = true : this.landscape = false;
  }

  public rngPosition(): PositionModel {
    this.rngIndex = Math.floor((Math.random() * this.positions.length));
    return this.positions[this.rngIndex];
  }

  public onHit(newPosition: PositionModel) {
    this.coinBlock.nativeElement.object3D.position.set(newPosition.x, newPosition.y, newPosition.z);
  }

  firePoi() {
    // this.auth.login('testuser', 'testuser');
    this.scoreService.completePoi('5d5d1fb2fd641d3e24c9d938', 137);
    console.log('FIRED');
  }
}
