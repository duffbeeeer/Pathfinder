import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, first } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  loading: boolean;
  error: any;
  public userUsername: string;
  public userPassword: string;
  public userToken: string;

  constructor(private http: HttpClient, private router: Router) {
    this.userToken = localStorage.getItem('currentUser');
  }

  public isAuthenticated() {
    const token = localStorage.getItem('currentUser');
    console.log('JWTTOKEN ' + token);
    if (token) {
      return true;
    }
    return false;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`http://51.68.189.176/login`, { username, password }, { observe: 'response' })
      .pipe(first())
      .subscribe(user => {
        console.log('httpResponse', user);
        // login successful if there's a jwt token in the response
        const userToken = user.headers.get('Authorization');
        if (user && userToken) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          console.log('Ligin successful!', 'user token:', userToken, 'user: ', user);
          localStorage.setItem('currentUser', userToken);
          this.router.navigate(['']);
        }
        return user;
      },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  register(username: string, password: string) {
    console.log('register method' + username + ' ' + password);
    return this.http.post<any>('http://51.68.189.176/user/sign-up', { username, password })
      .pipe(map(user => {
        this.userUsername = username;
        this.userPassword = password;
        console.log(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }


}
