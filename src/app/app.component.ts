import {Component, OnInit, HostListener} from '@angular/core';

import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  screenHeight: number;
  screenWidth: number;

  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;

  public errors: WebcamInitError[] = [];


  
  constructor() {
    this.getScreenSize();
}
  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: Event) {
    const win = !!event ? (event.target as Window) : window;
    this.screenWidth = win.innerWidth;
    this.screenHeight = win.innerHeight;
    console.log(this.screenHeight, this.screenWidth);
  }
  
  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }
}