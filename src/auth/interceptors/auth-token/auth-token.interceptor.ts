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

import * as fromShared from './../../../shared/store';
import * as fromAuthStore from './../../../auth/store';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
    constructor(
        private authStore: Store<fromAuthStore.AuthState>,
        private store: Store<fromShared.SharedState>,
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
                this.handleError(err);
                return throwError(err);
            })
        );
    }

    handleError(err) {
        this.store.dispatch(new fromShared.HideWaitDialog());
        if (err instanceof HttpErrorResponse && err.status !== 401) {
            let message;
            if (err.error.message !== "") {
                message = err.error.message;
            } else {
                message = err.message;
            }
            this.messageService.add({ severity: 'error', summary: err.status.toString(), detail: message });
        } else if (err.status == 401) {
            this.messageService.add({ severity: 'severity', summary: 'Credenciales incorrectas', detail: 'Verifique los datos e intentelo nuevamente' });
        } else if (err.status !== 401) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Contacte con el administrador' });
        }
    }
}
