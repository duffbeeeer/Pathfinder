import { Component, OnInit } from '@angular/core';
import { ViewModel, View, initialView } from '../shared/active-view.model';
import { Observable } from 'rxjs';
import { GeolocationService } from '../_services/geolocation.service';
import { ScoreService } from '../_services/score.service';
import { PointOfInterest, Highscore } from '../_models/score.model';


@Component({
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {

  view = View;
  currentView: ViewModel;
  currentPosition$: Observable<Position>;
  poiList$: Observable<PointOfInterest[]>;
  highScoreList$: Observable<Highscore[]>;
  userScore$: Observable<Highscore>;

  constructor(
    private geolocationService: GeolocationService,
    private scoreService: ScoreService
  ) {
    // get current position
    this.currentPosition$ = this.geolocationService.getCurrentPosition();
    this.currentPosition$.forEach(res => console.log('Lat: ' + res.coords.latitude + '\nLng: ' + res.coords.longitude + '\nTimestamp: ' + res.timestamp));

    //get userspecific Point of interest-list
    this.poiList$ = this.scoreService.getUserPoiList();
    this.poiList$.forEach(res => res.map(res => console.log('POI.id: ' + res.id + '\nPOI.isActive: ' + res.active)));

    // get Highscore List
    this.highScoreList$ = this.scoreService.getHighscoreList();
    this.highScoreList$.forEach(res => {
      res.map(res => {
        res.username == 'rick2' ? console.log('\n\n#' + res.position + ' ' + res.username + ' ' + res.score + 'pts\n\n') : null;
        console.log('User.Name: ' + res.username + '\nUser.Score: ' + res.score + '\nUser.Position: ' + res.position + '\n\n');
      })
    });
    //get Userscore
    this.userScore$ = this.scoreService.getHighscore();
  }

  ngOnInit(): void {
    this.currentView = initialView;
  }

  onActivateMaps() {
    this.currentView.activeView = this.view.MapsComponent;
    this.userScore$.forEach(res => {
      console.log(res);
    })
  }

  onActivateAugmented() {
    this.currentView.activeView = this.view.AugmentedComponent;
  }

  get isMapsActive() {
    return this.currentView.activeView === this.view.MapsComponent;
  }

  get isAugmentedActive() {
    return this.currentView.activeView === this.view.AugmentedComponent;
  }
}
