import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MustMatch } from '../../shared/must-match.validator';
import { AuthenticationService } from '../../_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(5)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      }, {
        validator: MustMatch('password', 'confirmPassword')
      });
      // console.log(this.registerForm.value + 'value');

      this.returnUrl = this.route.snapshot.queryParams.returnUrl || 'success';
  }

  public get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.f.username.value+this.f.password.value)
    this.loading = true;
    this.authenticationService.register(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });

  }
}
