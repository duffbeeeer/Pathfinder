import { Component, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  @Output()
  isMapsActive: EventEmitter<any> = new EventEmitter();

  constructor(
        private router: Router,
        private authenticationService: AuthenticationService
  ) { }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
