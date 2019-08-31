/// <reference types="@types/googlemaps" />
import { Component, OnInit, Input, ChangeDetectionStrategy, HostListener, ViewChildren, ElementRef, QueryList, AfterViewInit, ViewChild, Query, OnChanges, EventEmitter, Output } from '@angular/core';
import { mapStyles } from '../../assets/maps.style';
import { LocalPosition, MyPosition } from '../_services/geolocation.service';
import { Subscription } from 'rxjs';
import { AgmCircle, AgmMap, MapsAPILoader } from '@agm/core';



@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MapsComponent implements OnInit, OnChanges {

  @Input()
  currentPosition: Position;

  @Output()
  activateAugmented: EventEmitter<string> = new EventEmitter();

  title: 'pathfinder';
  landscape: boolean;
  dynamicStyling: {};
  lat: number;
  lng: number;
  screenWidth: number;
  screenHeight: number;
  waypoints: any;
  // origin: any;
  origin: MyPosition = {lat: 53.562699, lng: 9.987803};
  destination = { lat: 53.562699, lng: 9.987803 };
  travelMode = 'TRANSIT';
  styles = mapStyles;
  private updateSubscription: Subscription;
  showArButton: boolean;
  activeMarkerId: string;

  // agmCircle: Circle;

  @ViewChild('agmDirection') direction: ElementRef;
  @ViewChild('agmMap') mapshizzle: AgmMap;
  @ViewChildren('circle', { read: AgmCircle }) circles: QueryList<AgmCircle>;

  markers: LocalPosition[] = [
    { lat: 53.562136, lng: 9.988778, active: true, id: '1' },
    { lat: 53.560588, lng: 9.990415, active: true, id: '2' },
    { lat: 53.559102, lng: 9.989839, active: true, id: '3' },
    { lat: 53.565019, lng: 10.033581, active: true, id: '4' },
    { lat: 53.566846, lng: 10.031384, active: true, id: '5' },
  ];

  iconUrl = {
    url: '../../Pathfinder/assets/images/pathfinder-icon.png',
    // scaledSize: { height: 32, width: 25 }
  };

  constructor(private _mapsAPILoader: MapsAPILoader) {
    this.showArButton = false;
  }

  ngOnChanges() {
    if (this.currentPosition) {
      this.origin = { lat: this.currentPosition.coords.latitude, lng: this.currentPosition.coords.longitude };
      console.log(this.currentPosition.timestamp);
      this._mapsAPILoader.load().then(() => {
        if (this.currentPosition) {
          this.showArButton = false;
          const pos = new google.maps.LatLng({lat: this.currentPosition.coords.latitude, lng: this.currentPosition.coords.longitude});
          console.log(pos.toString());
          const circles = this.circles.toArray();
          for (const marker of this.markers) {
            const circle = new google.maps.Circle({center: {lat: marker.lat, lng: marker.lng }, radius: 25});
            if (circle.getBounds().contains(pos)) {
              this.showArButton = true;
              this.activeMarkerId = marker.id;
            }
            console.log(circle.getBounds().contains(pos));
          }
        }
      });
    }
  }

  ngOnInit() {
    console.log(this.currentPosition);

    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight - 60;
    window.innerWidth > window.innerHeight ? this.landscape = true : this.landscape = false;
    this.dynamicStyling = {width: this.screenWidth + 'px', height: this.screenHeight + 'px', top: '60px'};
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    window.innerWidth > window.innerHeight ? this.landscape = true : this.landscape = false;
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    }

  onStartGame() {
    this.activateAugmented.emit(this.activeMarkerId);
  }
}



