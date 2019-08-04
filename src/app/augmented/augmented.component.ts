import { Component, OnInit, HostListener, ElementRef, ViewContainerRef, ViewChild, AfterViewInit,  } from '@angular/core';
import { WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { element } from '@angular/core/src/render3';
import { PositionModel } from '../shared/ar-view.model'

// require('aframe-event-set-component');
declare var require: any;
@Component({
  selector: 'app-augmented',
  templateUrl: './augmented.component.html',
  styleUrls: ['./augmented.component.scss']
})
export class AugmentedComponent implements OnInit, AfterViewInit {
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
  public  screenWidth: number;
  public screenHeight: number;
  private aframe = (window as any).AFRAME;
  private positions: PositionModel[];
  private rngIndex;
  private videoStream;
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
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight - 90;
    // this.videoStream = document.getElementById("videoStream");
    // this.videoStream.src = navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: { exact: "environment" } } }).then( (id) => console.log(id));
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
    // navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: { exact: "environment" } } }).then((value)=>console.log(value));
    // console.log(navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: { exact: "environment" } } }));
    
    
    // navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: { exact: "environment" } } })
    // .then((test)=> {
    //   let stream:any = document.getElementById("videoStream")
    //   stream.src = test.id;
    //   console.log(test.id);
    //   console.log(stream);
    //   console.log(stream.src);
    // })
    // .catch((damn)=>
    // console.dir(damn));

    if (navigator.mediaDevices.getUserMedia) {
      let video: any = document.getElementById("videoStream");
      navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: { exact: "environment" } } })
        .then(function (stream) {
          video.srcObject = stream;
          video.play();
          console.log("video");
          console.log(video.srcObject);
        })
        .catch(function (err0r) {
          console.log("Something went wrong!");
          console.log(err0r);
        });
    }
    
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
 
}
