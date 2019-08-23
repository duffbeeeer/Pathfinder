import { Component, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { AuthenticationService } from '../_services';
import { Router } from '@angular/router';
import { ViewModel, View, initialView } from '../shared/active-view.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  screenWidth: number;
  screenHeight: number;
  view = View;
  currentView: ViewModel;

  @Output()
  activateMaps: EventEmitter<any> = new EventEmitter();

  @Output()
  activateAugmented: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.currentView = initialView;
    this.screenWidth = window.innerWidth;
    this.screenHeight = 60;
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

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = 60;
  }

  get isMapsActive() {
    return this.currentView.activeView === this.view.MapsComponent;
  }
}
