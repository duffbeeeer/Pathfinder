import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${config.apiUrl}/users`);
    }

    // getUserById(userId: number ) {
    //     return this.http.get<User[]>('/users').pipe(map( users => {
    //       let userValue: User;
    //       for (const user of users ) {
    //         if (user.id === userId) {
    //           userValue = user;
    //           }
    //         return userValue;
    //         }
    //     }));
    // }
}
