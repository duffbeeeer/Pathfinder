import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../_services';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
            console.log(err.status)
            try{

                if (err.status === 403) {
                    // auto logout if 401 response returned from api
                    this.authenticationService.logout();
                    // location.reload(true);
                }
            } catch{
                console.log('nöö');
            }
            // const error = err.error.message || err.statusText;
            return [null];
        }));
    }
}
