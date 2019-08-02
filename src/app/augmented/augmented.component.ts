import { Component, OnInit, HostListener, ElementRef, ViewContainerRef, ViewChild,  } from '@angular/core';
import { WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { element } from '@angular/core/src/render3';
require('aframe-event-set-component');
declare var require: any;
@Component({
  selector: 'app-augmented',
  templateUrl: './augmented.component.html',
  styleUrls: ['./augmented.component.scss']
})
export class AugmentedComponent implements OnInit {
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
  public deviceId: string;
  public screenWidth: number;
  public screenHeight: number;
  public multipleWebcamsAvailable = false;
  newX: number;
  newY: number;
  newZ: number;
  height:number = 0.5;
  aframed = (window as any).AFRAME;
  
  constructor(private hostElement:ViewContainerRef) { }
  
  @ViewChild('coinlock') coinBlock;
  
  ngOnInit() {
    console.log(this.aframed);
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight - 90;
    console.log("Screen Width: " + this.screenWidth + " Screen Height: " + this.screenHeight);
    
    
    
    this.aframed.registerComponent('cursor-listener', {
      init: function () {
        var lastIndex = -1;
        var COLORS = ['red', 'green', 'blue'];
        this.el.addEventListener('click', function (evt) {
          lastIndex = (lastIndex + 1) % COLORS.length;
          this.object3D.position.set(0, 0.5, 0);
          console.log('I was clicked at: ', evt.detail.intersection.point);
        });
      }
    });

    
    this.aframed.registerComponent('elem-click', {
      init: function () {
          const el = this.el;
          el.addEventListener('click', function (evt) {
              console.log('Hi!')
          });
      }
    });
  }
  public func(){
    // this.newX = Math.floor(Math.random() * Math.floor(1))+1
    // this.newY = Math.floor(Math.random() * Math.floor(1))+1
    // this.newZ = Math.floor(Math.random() * Math.floor(1))+1
    // this.coinBlock.nativeElement.object3D.position.set(1,2,3);
    // console.log(this.coinBlock.nativeElement.object3D);
    // console.log(this.cursor.nativeElement.object3D.el.attributes);
    // console.log(this.aframe.nativeElement.components.raycaster.refreshObjects());
    this.height-=0.3;
    // this.aframe.nativeElement.components.raycaster.refreshObjects();
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
