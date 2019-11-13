import { Component, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { AuthenticationService } from '../_services';
import { Router } from '@angular/router';
import { ViewModel, View, initialView } from '../_shared/active-view.model';
import { PointOfInterest } from '../_shared/score.model';

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
  showInfobox: boolean;

  @Output()
  activateMaps: EventEmitter<any> = new EventEmitter();

  @Output()
  activateAugmented: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.showInfobox = false;
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

  onShowInfobox() {
    this.showInfobox = !this.showInfobox;
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
