import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../_services';
import { Router } from '@angular/router';
import { ViewModel, View, initialView } from '../shared/active-view.model';
import { PointOfInterest } from '../_models/score.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  view = View;

  currentView: ViewModel;

  @Output()
  activateMaps: EventEmitter<any> = new EventEmitter();

  @Output()
  activateAugmented: EventEmitter<any> = new EventEmitter();

  constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
  ) {}

   ngOnInit(): void {
     this.currentView = initialView;
   }

  onActivateMaps() {
    this.activateMaps.emit();
  }

  onActivateAugmented() {
    this.activateAugmented.emit();
  }

  switchView() {
    if (this.currentView.activeView === this.view.MapsComponent) {
      this.currentView.activeView = this.view.AugmentedComponent;
      this.onActivateAugmented();
      console.log('switching to augmented');
    } else {
      this.currentView.activeView = this.view.MapsComponent;
      this.onActivateMaps();
      console.log('switching to maps');
    }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  get isMapsActive() {
    return this.currentView.activeView === this.view.MapsComponent;
  }
}
