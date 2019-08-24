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
    // highScore$: Observable<Highscore[]>;

    constructor(
      private geolocationService: GeolocationService,
      private scoreService: ScoreService
    ) {
      this.currentPosition$ = this.geolocationService.getCurrentPosition();
      this.currentPosition$.subscribe(x => console.log(x));
      // this.poiList$ = this.scoreService.getPoiList();
      this.poiList$ = this.scoreService.getUserPoiList();
      // this.highScore$ = this.scoreService.getHighscoreList();
      // console.log(this.highScore$);
    }

    ngOnInit(): void {
        this.currentView = initialView;
    }

    onActivateMaps() {
        this.currentView.activeView = this.view.MapsComponent;
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
