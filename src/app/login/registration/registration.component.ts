import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MustMatch } from '../../shared/must-match.validator';
import { AuthenticationService } from '../../_services';
import { first, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  login$: Observable<any>;
  authFailed: boolean;
  inputName: string;
  inputPassword: string;
  landscape: boolean;
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
  ) { }


  ngOnInit() {
    window.innerWidth > window.innerHeight ? this.landscape = true : this.landscape = false;
    this.authFailed = false;
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(8)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || 'success';
  }

  public get f() { return this.registerForm.controls; }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    window.innerWidth > window.innerHeight ? this.landscape = true : this.landscape = false;
    if (window.innerWidth < window.innerHeight) {
      this.landscape = false;
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.f.username.value + this.f.password.value);
    this.loading = true;
    this.authenticationService.register(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/success']);
          this.login$ = this.authenticationService.login(this.f.username.value, this.f.password.value).pipe(catchError(this.errorHandler));
          this.login$.forEach(res => {
            if (res.headers.get('Authorization')) {
              console.log(res.status);
              console.log(res.headers.get('Authorization'));
              const userToken = res.headers.get('Authorization');
              localStorage.setItem('currentUser', userToken);
              this.router.navigate(['/success']);
            }
          });
        },
        error => {
          this.authFailed = true;
          this.error = error;
          this.loading = false;
        });
    setTimeout(() => {
      this.authFailed = true;
      console.log(this.authFailed);
    }, 1000);
    this.authenticationService.logout();
  }
  errorHandler(error: HttpErrorResponse) {
    console.error('Authentication Failed =(');
    return throwError(error.message);
}
}
