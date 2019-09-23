import { Component, OnInit } from '@angular/core';
import { ViewModel, View, initialView } from '../shared/active-view.model';
import { Observable, BehaviorSubject, Subscribable } from 'rxjs';
import { GeolocationService } from '../_services/geolocation.service';
import { ScoreService } from '../_services/score.service';
import { PointOfInterest, Highscore } from '../_models/score.model';


@Component({
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

  public poiId: string;

  view = View;
  currentView: ViewModel;
  currentPosition$: Observable<Position>;

  poiUserList$: Observable<PointOfInterest[]>;
  poiList$: Observable<PointOfInterest[]>;
  highScoreList$: Observable<Highscore[]>;
  userScore$: Observable<Highscore>;

  constructor(
    private geolocationService: GeolocationService,
    private scoreService: ScoreService
  ) {
    this.currentPosition$ = this.geolocationService.getCurrentPosition();
    this.poiUserList$ = this.scoreService.getUserPoiList();
    this.currentPosition$.forEach(res => {
      console.log('Lat: ' + res.coords.latitude + '\nLng: ' + res.coords.longitude + '\nTimestamp: ' + res.timestamp);
    });

    this.poiUserList$.forEach(res => res.map(res => console.log('USER POI.id: ' + res.id + '\nUSER POI.isActive: ' + res.active)));
  }

  ngOnInit(): void {
    this.currentView = initialView;
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(async (pos) => {
        this.currentPosition$ = this.geolocationService.getCurrentPosition();
        this.currentPosition$.forEach(res =>
          console.log('Lat: ' + res.coords.latitude + '\nLng: ' + res.coords.longitude + '\nTimestamp: ' + res.timestamp));
      });
    }
  }

  onActivateMaps() {
    this.poiUserList$ = this.scoreService.getUserPoiList();
    this.currentView.activeView = this.view.MapsComponent;
  }

  onActivateAugmented(event: string) {
    this.poiId = event;
    this.currentView.activeView = this.view.AugmentedComponent;
  }

  get isMapsActive() {
    return this.currentView.activeView === this.view.MapsComponent;
  }

  get isAugmentedActive() {
    return this.currentView.activeView === this.view.AugmentedComponent;
  }

}
