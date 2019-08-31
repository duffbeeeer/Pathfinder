import { Component, OnInit, Input, ChangeDetectionStrategy, HostListener, ViewChildren, ElementRef, QueryList, AfterViewInit, ViewChild, Query, OnChanges } from '@angular/core';
import { mapStyles } from '../../assets/maps.style';
import { LocalPosition } from '../_services/geolocation.service';
import { Subscription, interval } from 'rxjs';
import { AgmCircle, CircleManager, GoogleMapsAPIWrapper, LatLng, MapsAPILoader, AgmMap } from '@agm/core';
import { google, Circle, LatLngBounds } from '@agm/core/services/google-maps-types';
import { AgmDirection } from 'agm-direction/src/modules/agm-direction.module';


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MapsComponent implements OnInit, OnChanges, AfterViewInit {

  @Input()
  currentPosition: Position;

  // protected map: GoogleMapsAPIWrapper;



  title: 'pathfinder';
  landscape: boolean;
  dynamicStyling: {};
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
  activateAr: boolean;
  // agmCircle: Circle;

  @ViewChild('agmDirection') direction: ElementRef;
  @ViewChild('agmMaps') mapshizzle: AgmMap;
  @ViewChildren('circle', { read: AgmCircle }) circles: QueryList<AgmCircle>;

  markers: LocalPosition[] = [
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

  constructor(private mapsWrapper: GoogleMapsAPIWrapper) {

  }



   ngOnInit() {
    console.log();


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

  // ngOnDestroy() {
  //   this.updateSubscription.unsubscribe();
  // }
  ngAfterViewInit(): void {
    const circle = this.circles.toArray();
    circle[0].getBounds().then(bounds => console.log(bounds));
  }
  ngOnChanges() {
    if (this.currentPosition) {
      this.origin = { lat: this.currentPosition.coords.latitude, lng: this.currentPosition.coords.longitude };
      // console.log('obs pos ' + this.currentPosition.coords.latitude);
    }
  }
}



