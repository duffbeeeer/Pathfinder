import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';



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
    // console.log('JWT TOKEN: ', token);
    if (token) {
      return true;
    }
    return false;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/login`, { username, password }, { observe: 'response' })
      .pipe(first());
  }


  register(username: string, password: string) {
    return this.http.post<any>('http://localhost:8080/user/sign-up', { username, password })
      .pipe(map(user => {
        this.userUsername = username;
        this.userPassword = password;
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }


}
