import { Component, OnInit } from '@angular/core';
import { mapStyles } from '../../assets/maps.style';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  title: 'pathfinder';
  lat: number;
  lng: number;
  screenWidth: number;
  screenHeight: number;
  waypoints: any;
  // origin: any;
  origin = { lat: 53.569143, lng: 10.033014 };
  destination = { lat: 53.562699, lng: 9.987803 };
  travelMode = 'TRANSIT';
  styles = mapStyles;


  markers = [
    { lat: 53.562136, lng: 9.988778 },
    { lat: 53.560588, lng: 9.990415 },
    { lat: 53.559102, lng: 9.989839 },
    { lat: 53.565019, lng: 10.033581 },
    { lat: 53.566846, lng: 10.031384 },
  ];

  iconUrl = {
    url: 'http://torage.github.io/Pathfinder/assets/images/pathfinder-icon.png',
    scaledSize: { height: 32, width: 25 }
  };

  constructor() {
  }

  ngOnInit(): void {
    // this.getUserLocation();
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight -60;
  }


  private getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.origin = { lat: this.lat, lng: this.lng };
        console.log(this.origin.lat);
      });
    }
  }
}



