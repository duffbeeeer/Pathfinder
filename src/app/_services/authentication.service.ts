import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';



@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  loading: boolean;
  error: any;
  loginError: boolean;
  public userUsername: string;
  public userPassword: string;
  public userToken: string;

  constructor(private http: HttpClient, private router: Router) {
    this.userToken = localStorage.getItem('currentUser');
    this.loginError = false;
  }

  public isAuthenticated() {
    const token = localStorage.getItem('currentUser');
    console.log('JWTTOKEN ' + token);
    if (token) {
      return true;
    }
    return false;
  }


  // completePoi(id: string, value: number): Observable<any> {
  //   console.log('POI ID: ' + id + '\nScore: ' + value);
  //   return this.http.post<PointOfInterest[]>
  //     (`https://vps723941.ovh.net:9090/user/pointsofinterest/${id}/complete/${value}`, { observe: 'response' }).pipe(first());
  // }


  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`https://vps723941.ovh.net:9090/login`, { username, password }, { observe: 'response' })
      .pipe(first());
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

  register(username: string, password: string) {
    console.log('register method' + username + ' ' + password);
    return this.http.post<any>('https://vps723941.ovh.net:9090/user/sign-up', { username, password })
      .pipe(map(user => {
        this.userUsername = username;
        this.userPassword = password;
        console.log(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    // localStorage.removeItem('currentUser');
    this.router.navigate(['']);
  }


}
