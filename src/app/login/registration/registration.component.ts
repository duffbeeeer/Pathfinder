import { Component, OnInit, HostListener } from '@angular/core';
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
    // console.log(this.registerForm.value + 'value');

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
    console.log('submitted register')
    if (this.registerForm.invalid) {
      console.log('invalid registrationform')
      return;
    }
    console.log(this.f.username.value + this.f.password.value);
    this.loading = true;
    this.authenticationService.register(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
    setTimeout(() => {
      this.authFailed = true;
      console.log(this.authFailed);
    }, 1000);
  }
}
