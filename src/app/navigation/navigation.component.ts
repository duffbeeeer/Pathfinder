import { Component } from '@angular/core';
import { AuthenticationService } from '../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  constructor(
        private router: Router,
        private authenticationService: AuthenticationService
  ) { }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
