import { Component, OnInit, HostListener } from '@angular/core';
import { WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';

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
  constructor() { }

  ngOnInit() {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
        console.log(WebcamUtil.getAvailableVideoInputs);
        this.showNextWebcam(true);
      });
    this.getScreenSize;
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight - 90;
    console.log("Screen Width: " + this.screenWidth + " Screen Height: " + this.screenHeight);
  }

  public handleInitError(error: WebcamInitError): void {
    if (error.mediaStreamError && error.mediaStreamError.name === "NotAllowedError") {
      console.warn("Camera access was not allowed by user!");
    }
  }

  @HostListener('window: resize', ['$event'])
  getScreenSize(event?: Event) {
    const win = !!event ? (event.target as Window) : window;
    this.screenWidth = win.innerWidth;
    this.screenHeight = win.innerHeight - 90;
    console.log("height: " + this.screenHeight + " width: " + this.screenWidth);
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
