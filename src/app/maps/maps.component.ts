import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
    title: 'pathfinder';
    lat: number;
    lng: number;
    waypoints: any;
    origin: any;
    destination = {lat: 53.569143, lng: 10.033014};
    travelMode = 'TRANSIT';

    constructor() {

    }

    ngOnInit(): void {
          this.getUserLocation();
    }

    private getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.origin = {lat: this.lat, lng: this.lng};
          console.log(this.origin.lat);
        });
      }
    }
 }



