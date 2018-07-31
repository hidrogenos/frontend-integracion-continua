import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import * as fromAuthStore from './../../../auth/store';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
    constructor(private authStore: Store<fromAuthStore.AuthState>) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const modified = req.clone({
            setHeaders: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        });
        return next.handle(modified);
    }
}
