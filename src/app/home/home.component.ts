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
  addPois$: Observable<any>;
  completePoi$: Observable<any>;

  poiUserList$: Observable<PointOfInterest[]>;
  poiList$: Observable<PointOfInterest[]>;
  highScoreList$: Observable<Highscore[]>;
  userScore$: Observable<Highscore>;

  constructor(
    private geolocationService: GeolocationService,
    private scoreService: ScoreService
  ) {
    //complete Poi ausgabe
    // this.completePoi$ = scoreService.completePoi('1', 1000);
    // this.completePoi$.forEach(res => {
    //   console.log(res.id);
    // })
    
    // get current position
    this.currentPosition$ = this.geolocationService.getCurrentPosition();
    this.poiUserList$ = this.scoreService.getUserPoiList();
    this.currentPosition$.forEach(res => {
      console.log('Lat: ' + res.coords.latitude + '\nLng: ' + res.coords.longitude + '\nTimestamp: ' + res.timestamp)
    });

    // get userspecific Point of interest-list

    this.poiUserList$.forEach(res => res.map(res => console.log('USER POI.id: ' + res.id + '\nUSER POI.isActive: ' + res.active)));

    // get Point of interest-list
    // this.poiList$ = this.scoreService.getPoiList();
    // this.poiList$.forEach(res => res.map(res => console.log('POI.id: ' + res.id + '\nPOI.isActive: ' + res.active)));

    // get Highscore List
    // this.highScoreList$ = this.scoreService.getHighscoreList();
    // this.highScoreList$.forEach(res => {
    // res.map(res => {
    // res.username == 'rick2' ? console.log('\n\n#' + res.position + ' ' + res.username + ' ' + res.score + 'pts\n\n') : null;
    // console.log('User.Name: ' + res.username + '\nUser.Score: ' + res.score + '\nUser.Position: ' + res.position + '\n\n');
    // });
    // });

    // get Userscore
    // this.userScore$ = this.scoreService.getHighscore();
    // this.userScore$.forEach(res => {
    // console.log('USERSCORE:\nUsername: ' + res.username + '\nScore: ' + res.score + '\nPosition: ' + res.position);
    // console.log('User.Name: ' + res.username + '\nUser.Score: ' + res.score + '\nUser.Position: ' + res.position + '\n\n')
    // });
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
    console.log(event);
    this.currentView.activeView = this.view.AugmentedComponent;
  }

  get isMapsActive() {
    return this.currentView.activeView === this.view.MapsComponent;
  }

  get isAugmentedActive() {
    return this.currentView.activeView === this.view.AugmentedComponent;
  }

}
