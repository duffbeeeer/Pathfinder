import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, catchError } from 'rxjs/operators';
import { AuthenticationService } from '../_services';

import { Observable, throwError } from 'rxjs';
import { HttpEvent, HttpErrorResponse } from '@angular/common/http';


@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})

export class LoginComponent implements OnInit {
    login$: Observable<any>;
    @Input()
    username: string;
    showGreetings: boolean;
    loginForm: FormGroup;
    submitted = false;
    returnUrl: string;
    authFailed: boolean = false;
    error = 'Der Benutzername oder das Passwort ist ungültig';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private router: Router
    ) { }

    ngOnInit() {
        this.authFailed = false;
        console.log('loginfailed!', this.authFailed);
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

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.authFailed = true;
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.login$ = this.authenticationService.login(this.f.username.value, this.f.password.value).pipe(catchError(this.errorHandler));
        this.login$.forEach(res => {
            if (res.headers.get('Authorization')) {
                console.log(res.status);
                console.log(res.headers.get('Authorization'));
                const userToken = res.headers.get('Authorization');
                localStorage.setItem('currentUser', userToken);
                this.router.navigate(['']);
            }
        });
    }

    errorHandler(error: HttpErrorResponse) {
        console.error('Authentication Failed =(');
        return throwError(error.message);
    }
    onGreetings() {
        this.showGreetings = false;
    }
    
}
// login(username: string, password: string) {
    //   return this.http.post<any>(`https://vps723941.ovh.net:9090/login`, { username, password }, { observe: 'response' })
    //     .pipe(first())
    //     .subscribe(user => {
    //       console.log('httpResponse', user.statusText);
    //       this.userUsername = username;
    //       // login successful if there's a jwt token in the response
    //       const userToken = user.headers.get('Authorization');
    //       if (user && userToken) {
    //         // store user details and jwt token in local storage to keep user logged in between page refreshes
    //         console.log('Ligin successful!', 'user token:', userToken, 'user: ', user);
    //         localStorage.setItem('currentUser', userToken);
    //         this.router.navigate(['']);
    //       }
    //       return user;
    //     },
    //       error => {
    //         this.error = error;
    //         this.loading = false;
    //       });
    // }