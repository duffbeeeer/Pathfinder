import { Component, OnInit, ElementRef, ViewContainerRef, ViewChild, AfterViewChecked, OnChanges, HostListener  } from '@angular/core';
import { PositionModel } from '../shared/ar-view.model'

@Component({
  selector: 'app-augmented',
  templateUrl: './augmented.component.html',
  styleUrls: ['./augmented.component.scss']
})

export class AugmentedComponent implements OnInit, AfterViewChecked, OnChanges {
  public screenWidth: number;
  public screenHeight: number;
  public landscape:boolean;
  
  private timer;
  private score: number;
  private timeLeft:number;
  private positions: PositionModel[];
  private rngIndex: number;
  private videoRef;
  
  @ViewChild('coinBlock') coinBlock: ElementRef;
  @ViewChild('cursor') cursor: ElementRef;
  @ViewChild('scene') sceneRef: ElementRef;
  @ViewChild('score') scoreRef: ElementRef;
  @ViewChild('timer') timerRef: ElementRef;
  
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    window.innerWidth>window.innerHeight? this.landscape = true : this.landscape = false;
  }
  options = {
    video    : {
        advanced: [{
          facingMode: "environment"
        }]
      },
      audio    : false,
      width    : window.innerWidth,
      height   : window.innerHeight,
      aspectRatio: window.innerWidth/window.innerHeight
      
    }
    
    constructor(private hostElement:ViewContainerRef) { 
      this.landscape
      this.positions = [
        {x:0, y:0 ,z:0},
        {x:0.2, y:0 ,z:0},
        {x:0.4, y:0 ,z:0},
        {x:0.6, y:0 ,z:0},
        {x:0.8, y:0 ,z:0},
        {x:1, y:0 ,z:0},
      ]
    }
    
    
    ngOnInit() {
      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight - 90;
      
      this.score = 0;

      this.coinBlock.nativeElement.addEventListener('click', (evt) => {
        this.onHit(this.rngPosition());
        this.score+=1;
        console.log('I was clicked at: ', evt.detail.intersection.point);     
        console.log(this.scoreRef.nativeElement.children[0].attributes.value    ) 
        this.scoreRef.nativeElement.children[0].setAttribute("value", "Score: " + this.score);    
      });
      
      this.coinBlock.nativeElement.addEventListener('mouseenter', () => {
        this.cursor.nativeElement.setAttribute('material', 'color', '#FF000F'); 
      });
      
      this.coinBlock.nativeElement.addEventListener('mouseleave', () => {
        this.cursor.nativeElement.setAttribute('material', 'color', '#00ffff'); 
      });
      this.startTimer(30);
    }
    
    ngAfterViewChecked(){
      this.videoRef = document.getElementById('video');
      this.videoRef.style.transform = "scaleY(1.2)";
      
    }
    

    startTimer(time: number) {
      this.timeLeft = time;
      setInterval(() => {
        if(this.timeLeft >= 0) {
          console.log(this.timeLeft)
          this.timeLeft-=0.1;
          this.timerRef.nativeElement.children[0].setAttribute("value", "Time: " + this.timeLeft);
        } else {
          this.timeLeft = 0;
        }
      },100)
    }

    public rngPosition(): PositionModel{
      this.rngIndex = Math.floor((Math.random() * this.positions.length));
      return this.positions[this.rngIndex];
    }
    
    public onHit(newPosition:PositionModel){
      this.coinBlock.nativeElement.object3D.position.set(newPosition.x, newPosition.y, newPosition.z);
    }
    
    test(){
      console.log("moin")
    }
  }
  