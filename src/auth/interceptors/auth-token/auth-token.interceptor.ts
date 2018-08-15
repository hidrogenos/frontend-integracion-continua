import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { Store } from '@ngrx/store';

import * as fromAuthStore from './../../../auth/store';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
    constructor(
        private authStore: Store<fromAuthStore.AuthState>,
        private messageService: MessageService
    ) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const modified = req.clone({
            setHeaders: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        });
        return next.handle(modified).pipe(
            catchError(err => {
                if (err instanceof HttpErrorResponse) {
                    this.messageService.add({ key: 'global-toast', severity: 'error', summary: err.status.toString(), detail: err.statusText });
                } else {
                    this.messageService.add({ key: 'global-toast', severity: 'error', summary: 'Error', detail: 'Contacte con el administrador' });
                }
                return throwError(err);
            })
        );
    }
}
