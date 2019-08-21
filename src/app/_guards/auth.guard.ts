import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../_services';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate() {
      console.log('trying to auth');
      if (!this.authenticationService.isAuthenticated()) {
        this.router.navigate(['login']);
        return false;
      }
      return true;
    }
}
