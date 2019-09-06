/// <reference types="@types/googlemaps" />
import { Component, OnInit, Input, ChangeDetectionStrategy, HostListener, ViewChildren, ElementRef, QueryList, AfterViewInit, ViewChild, Query, OnChanges, EventEmitter, Output } from '@angular/core';
import { mapStyles } from '../../assets/maps.style';
import { MyPosition } from '../_services/geolocation.service';
import { MapsAPILoader } from '@agm/core';
import { PointOfInterest } from '../_models/score.model';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MapsComponent implements OnInit, OnChanges {

  @Input()
  currentPosition: Position;

  @Input()
  poiUserList: PointOfInterest[];

  @Output()
  activateAugmented: EventEmitter<string> = new EventEmitter();

  destinationReached: boolean;
  title: 'pathfinder';
  landscape: boolean;
  dynamicStyling: {};
  screenWidth: number;
  screenHeight: number;
  waypoints: any;
  // origin: any;
  origin: MyPosition = { lat: 53.562699, lng: 9.987803 };
  destination = { lat: 53.569252, lng: 10.034879 };
  travelMode = 'TRANSIT';
  styles = mapStyles;
  showArButton: boolean;
  activeMarkerId: string;
  renderOptions = { preserveViewport: true };
  mapCentered = false;
  mapCenter = {
    lat: this.mapCentered ? null : this.origin.lat,
    lng: this.mapCentered ? null : this.origin.lng
  };

  markers: PointOfInterest[];

  iconUrl = {
    url: '../../assets/images/pathfinder-icon.png',
    // scaledSize: { height: 32, width: 25 }
  };

  constructor(private _mapsAPILoader: MapsAPILoader) {
    this.showArButton = false;
  }

  ngOnChanges() {
    if (this.currentPosition && this.poiUserList) {
      if (!this.mapCentered) {
        this.mapCentered = true;
      }
      this.markers = this.poiUserList;
      this.origin = { lat: this.currentPosition.coords.latitude, lng: this.currentPosition.coords.longitude };
      this._mapsAPILoader.load().then(() => {
        this.matchCircles();
        this.checkIfDestinationReached();
      });
    }
  }

  ngOnInit() {
    // console.log(this.currentPosition);
    this.destinationReached = false;
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight - 60;
    window.innerWidth > window.innerHeight ? this.landscape = true : this.landscape = false;
    this.dynamicStyling = { width: this.screenWidth + 'px', height: this.screenHeight + 'px', top: '60px' };
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.dynamicStyling = { width: this.screenWidth + 'px', height: this.screenHeight + 'px', top: '60px' };
    window.innerWidth > window.innerHeight ? this.landscape = true : this.landscape = false;
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

  onStartGame() {
    this.activateAugmented.emit(this.activeMarkerId);
  }

  matchCircles() {
    this.showArButton = false;
    const pos = new google.maps.LatLng({ lat: this.currentPosition.coords.latitude, lng: this.currentPosition.coords.longitude });
    for (const poi of this.poiUserList) {
      // console.log(poi);
      const circle = new google.maps.Circle({ center: { lat: poi.lat, lng: poi.lng }, radius: 50 });
      if (circle.getBounds().contains(pos) && poi.active) {
        // console.log(circle.getCenter().lat(), pos.lat() );
        this.showArButton = true;
        this.activeMarkerId = poi.id;
      }
    }
  }

  checkIfDestinationReached() {
    if (this.currentPosition) {
      const dest = new google.maps.LatLng({ lat: this.destination.lat, lng: this.destination.lng });
      const circle = new google.maps.Circle({ center: { lat: this.destination.lat, lng: this.destination.lng }, radius: 75 });
      if (circle.getBounds().contains(dest)) {
        this.destinationReached = true;
      }
    }
  }

  onClick() {
    this.destinationReached = !this.destinationReached;
  }
  trackByFn(index, item) {
    return item; // or item.id
  }
}


