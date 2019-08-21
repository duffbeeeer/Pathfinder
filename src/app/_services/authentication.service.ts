import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    loading: boolean;
    error: any;
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }



    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        const httpOptions = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post<User>(`http://localhost:8080/login`, { username, password }, {headers: httpOptions, observe: 'response'})
            .subscribe(user => {
                console.log(user);
                // login successful if there's a jwt token in the response
                const userToken = user.headers.get('Authorization');
                if (user && userToken) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    console.log(userToken);
                    localStorage.setItem('currentUser', userToken);
                    this.currentUserSubject.next(user.body);
                }

                return user;
            },
            error => {
              this.error = error;
              this.loading = false;
          });
    }

    register(username: string, password: string) {
        console.log('register method'+username+' '+password);
        return this.http.post<any>('http://localhost:8080/user/sign-up', {username, password})
          .pipe(map(user => {
            console.log(user);
            return user;
          }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
