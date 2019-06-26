import { Component, OnInit, HostListener } from '@angular/core';
import { WebcamInitError } from 'ngx-webcam';

@Component({
  selector: 'app-augmented',
  templateUrl: './augmented.component.html',
  styleUrls: ['./augmented.component.scss']
})
export class AugmentedComponent implements OnInit {
  public screenWidth: number;
  public screenHeight: number;
  constructor() { }

  ngOnInit() {
    this.getScreenSize;
    this.screenWidth = window.innerWidth;
    this.screenHeight= window.innerHeight-90;
    console.log("innerWidth: "+this.screenWidth+"innerHeight: "+this.screenHeight)
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
    this.screenHeight = win.innerHeight-90;
    console.log("height: "+this.screenHeight +" width: " +this.screenWidth);
  }
  
}
