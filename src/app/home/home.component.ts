import { Component, OnInit } from '@angular/core';
import { ViewModel, View, initialView } from '../shared/active-view.model';


@Component({
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {

    view = View;
    currentView: ViewModel;

    constructor() { }

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
