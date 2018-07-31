import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as fromActions from '../actions';
import * as fromLoginSelectors from '../selectors';
import * as fromRoot from '../../../app/store';
import { switchMap, map, catchError } from 'rxjs/operators';
import { LoginService } from '../../services';
import { UsuarioModel } from '../../../shared/models/usuario.model';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { of } from 'rxjs';

@Injectable()
export class LoginEffect {
    constructor(
        private actions$: Actions,
        private loginService: LoginService,
        private store: Store<StoreModel>
    ) {}

    @Effect()
    login$ = this.actions$.ofType(fromActions.LOGIN).pipe(
        switchMap(action => {
            return this.loginService.login().pipe(
                map(
                    response =>
                        new fromActions.LoginSuccess({
                            user: response
                        })
                ),
                catchError(error => of(new fromActions.LoginFail()))
            );
        })
    );

    @Effect()
    loginSuccess$ = this.actions$.ofType(fromActions.LOGIN_SUCCESS).pipe(
        map((action: fromActions.LoginSuccess) => action.payload),
        switchMap(payload => {
            return this.store.select(fromLoginSelectors.getRequestUrl).pipe(
                map(requestUrl => {
                    if (requestUrl) {
                        return new fromRoot.Go({
                            path: [requestUrl]
                        });
                    } else {
                        return new fromRoot.Go({
                            path: ['']
                        });
                    }
                })
            );
        })
    );

    @Effect()
    loginFail$ = this.actions$
        .ofType(fromActions.LOGIN_FAIL)
        .pipe(
            map(
                (action: fromActions.LoginFail) =>
                    new fromRoot.Go({ path: ['login'] })
            )
        );
}
