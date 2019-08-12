import { Component, OnInit, HostListener, ElementRef, ViewContainerRef, ViewChild, AfterViewInit,  } from '@angular/core';
import { WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { element } from '@angular/core/src/render3';
import { PositionModel } from '../shared/ar-view.model'
require('aframe-event-set-component');
declare var require: any;
@Component({
  selector: 'app-augmented',
  templateUrl: './augmented.component.html',
  styleUrls: ['./augmented.component.scss']
})
export class AugmentedComponent implements OnInit, AfterViewInit {
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
  private deviceId: string;
  private screenWidth: number;
  private screenHeight: number;
  private multipleWebcamsAvailable = false;
  private aframe = (window as any).AFRAME;
  private positions: PositionModel[];
  private rngIndex;
  @ViewChild('coinBlock') coinBlock: ElementRef;
  @ViewChild('cursor') cursor: ElementRef;
  
  constructor(private hostElement:ViewContainerRef) { 
    this.positions = [
      {x:0, y:0 ,z:0},
      {x:0.2, y:0 ,z:0},
      {x:0.4, y:0 ,z:0},
      {x:0.6, y:0 ,z:0},
      {x:0.8, y:0 ,z:0},
      {x:1, y:0 ,z:0},
    ]

  }
  
  
  ngAfterViewInit(){
    console.log(this.coinBlock)
  }
  ngOnInit() {
    // console.log(this.aframed);
    // console.log(this.coinBlock.nativeElement)
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight - 90;
    console.log("Screen Width: " + this.screenWidth + " Screen Height: " + this.screenHeight);
    
    
    
    // this.aframed.registerComponent('cursor-listener',{
    //   init: function () {
    //     var lastIndex = -1;
    //     var COLORS = ['red', 'green', 'blue'];
    //     this.el.addEventListener('click', function (evt) {
    //       lastIndex = (lastIndex + 1) % COLORS.length;
    //       this.object3D.position.set(0, 0.5, 0);
    //       console.log('I was clicked at: ', evt.detail.intersection.point);
    //     });
    //   }
    // });
    this.aframe.registerComponent('cursor-listener',{
      init: () => {
        console.log(this.coinBlock);
        this.coinBlock.nativeElement.addEventListener('click', (evt) => {
          this.onHit(this.rngPosition());
          console.log('I was clicked at: ', evt.detail.intersection.point);          
        });

        this.coinBlock.nativeElement.addEventListener('mouseenter', () => {
          console.log("#FF000F");
          this.cursor.nativeElement.setAttribute('material', 'color', '#FF000F'); 
        });
        this.coinBlock.nativeElement.addEventListener('mouseleave', () => {
          console.log("#FF000F");
          this.cursor.nativeElement.setAttribute('material', 'color', '#00ffff'); 
        });
        
        
      }

    });

  }

  public rngPosition(): PositionModel{
    console.log(this.positions.length)
    this.rngIndex = Math.floor((Math.random() * this.positions.length));
    return this.positions[this.rngIndex];
  }

  public onHit(newPosition:PositionModel){
    
    this.coinBlock.nativeElement.object3D.position.set(newPosition.x, newPosition.y, newPosition.z);
  }


  public handleInitError(error: WebcamInitError): void {
    if (error.mediaStreamError && error.mediaStreamError.name === "NotAllowedError") {
      console.warn("Camera access was not allowed by user!");
    }
  }


  public randomPosition(): string {
    console.log("yay");
    return "_event: mouseup; position: 0.003 0.003 0.003"
  }
  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    console.log(directionOrDeviceId + "-.-");
    this.nextWebcam.next(directionOrDeviceId);
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }
}
