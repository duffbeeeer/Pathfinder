import { Component, OnInit, Input, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { mapStyles } from '../../assets/maps.style';
import { LocalPosition } from '../_services/geolocation.service';
import { Subscription, interval } from 'rxjs';


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MapsComponent implements OnInit {

  @Input()
  currentPosition: Position;

  title: 'pathfinder';
  landscape: boolean;

  lat: number;
  lng: number;
  screenWidth: number;
  screenHeight: number;
  waypoints: any;
  // origin: any;
  origin: LocalPosition;
  destination = { lat: 53.562699, lng: 9.987803 };
  travelMode = 'TRANSIT';
  styles = mapStyles;
  private updateSubscription: Subscription;

  markers = [
    { lat: 53.562136, lng: 9.988778 },
    { lat: 53.560588, lng: 9.990415 },
    { lat: 53.559102, lng: 9.989839 },
    { lat: 53.565019, lng: 10.033581 },
    { lat: 53.566846, lng: 10.031384 },
  ];

  iconUrl = {
    url: '../../assets/images/pathfinder-icon.png',
    // scaledSize: { height: 32, width: 25 }
  };

  ngOnInit(): void {
    // this.updateSubscription = interval(1000).subscribe(
    //   (val) => { this.updateStats();

    // });
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight - 60;
    window.innerWidth > window.innerHeight ? this.landscape = true : this.landscape = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    window.innerWidth > window.innerHeight ? this.landscape = true : this.landscape = false;
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    }
  
  // ngOnDestroy() {
  //   this.updateSubscription.unsubscribe();
  // }

  ngOnChanges() {
    if (this.currentPosition) {
      this.origin = { lat: this.currentPosition.coords.latitude, lng: this.currentPosition.coords.longitude };
      // console.log('obs pos ' + this.currentPosition.coords.latitude);
    }
  }

  private updateStats() {
    console.log('I am doing something every second');

  }
}

  // private getUserLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(position => {
  //       this.lat = position.coords.latitude;
  //       this.lng = position.coords.longitude;
  //       this.origin = { lat: this.lat, lng: this.lng };
  //       console.log(this.origin.lat);
  //     });
  //   }
  // }




