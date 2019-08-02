import { Component, OnInit } from '@angular/core';
import { ViewModel, View, initialView } from '../shared/active-view.model';
import { Observable } from 'rxjs';
import { GeolocationService } from '../shared/geolocation.service';


@Component({
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {

    view = View;
    currentView: ViewModel;
    currentPosition$: Observable<Position>;

    constructor(
      private geolocationService: GeolocationService
    ) {
      this.currentPosition$ = this.geolocationService.getCurrentPosition();
      this.currentPosition$.subscribe(x => console.log(x));
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
