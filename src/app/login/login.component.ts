import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, catchError, timeout } from 'rxjs/operators';
import { AuthenticationService } from '../_services';

import { Observable, throwError, interval } from 'rxjs';
import { HttpEvent, HttpErrorResponse } from '@angular/common/http';


@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})

export class LoginComponent implements OnInit {
    @Input()
    username: string;
    dynamicStyling: {};
    inputName: string;
    inputPassword: string;
    landscape: boolean;
    login$: Observable<any>;
    showGreetings: boolean;
    loginForm: FormGroup;
    submitted = false;
    returnUrl: string;
    authFailed: boolean;
    error = 'Der Benutzername oder das Passwort ist ungültig';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private router: Router
    ) { }

    ngOnInit() {
        this.authFailed = false;
        this.dynamicStyling = { width: window.innerWidth + 'px', height: window.innerHeight + 'px', top: '60px' }
        window.innerWidth > window.innerHeight ? this.landscape = true : this.landscape = false;
        this.authFailed = false;
        this.showGreetings = true;
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || 'home';
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.dynamicStyling = { width: window.innerWidth + 'px', height: window.innerHeight + 'px', top: '60px' };
        window.innerWidth > window.innerHeight ? this.landscape = true : this.landscape = false;
        if (window.innerWidth < window.innerHeight) {
            this.landscape = false;
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {

        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.login$ = this.authenticationService.login(this.f.username.value, this.f.password.value).pipe(catchError(this.errorHandler));
        this.login$.forEach(res => {
            if (res.headers.get('Authorization')) {
                const userToken = res.headers.get('Authorization');
                localStorage.setItem('currentUser', userToken);
                this.router.navigate(['']);
            }
        });
        setTimeout(() => {
            this.authFailed = true;
        }, 1000);
    }

    errorHandler(error: HttpErrorResponse) {
        return throwError(error.message);
    }
    onGreetings() {
        this.showGreetings = false;
    }

}
