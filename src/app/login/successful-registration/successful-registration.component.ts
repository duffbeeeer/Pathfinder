import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services';

@Component({
  selector: 'app-successful-registration',
  templateUrl: './successful-registration.component.html',
  styleUrls: ['./successful-registration.component.scss']
})
export class SuccessfulRegistrationComponent {

  username: string;
  password: string;

  constructor(private authenticationService: AuthenticationService) {
    this.username = this.authenticationService.userUsername;
    this.password = this.authenticationService.userPassword;
  }
}
