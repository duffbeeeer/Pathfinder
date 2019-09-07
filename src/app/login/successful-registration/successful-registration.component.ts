import { Component, OnInit, HostListener } from '@angular/core';
import { AuthenticationService } from '../../_services';

@Component({
  selector: 'app-successful-registration',
  templateUrl: './successful-registration.component.html',
  styleUrls: ['./successful-registration.component.scss']
})
export class SuccessfulRegistrationComponent {

  username: string;
  password: string;
  landscape: boolean;

  constructor(private authenticationService: AuthenticationService) {
    this.username = this.authenticationService.userUsername;
    this.password = this.authenticationService.userPassword;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    window.innerWidth > window.innerHeight ? this.landscape = true : this.landscape = false;
    if (window.innerWidth < window.innerHeight) {
      this.landscape = false;
    }
  }
}
