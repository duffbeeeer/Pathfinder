import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from '../_services';
import { User } from '../_models';
import { Observable } from 'rxjs';


@Component({
  templateUrl: 'home.component.html'
})

export class HomeComponent {
    isMapsActive$: Observable<boolean>;
    isArActive$: Observable<boolean>;
    isScoreActive: Observable<boolean>;
    
    users: User[] = [];

    constructor(private userService: UserService) { }

    // ngOnInit() {
    //     this.userService.getAll().pipe(first()).subscribe(users => {
    //         this.users = users;
    //     });
    // }
}
