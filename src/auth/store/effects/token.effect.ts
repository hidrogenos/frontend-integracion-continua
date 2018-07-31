import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';

//store
import { Effect, Actions } from '@ngrx/effects';
import { TokenService } from '../../services/token/token.service';
import * as fromActions from '../actions';
import * as fromRoot from '../../../app/store';

@Injectable()
export class TokenEffect {
    constructor(
        private actions$: Actions,
        private tokenService: TokenService
    ) {}

    @Effect()
    getToken$ = this.actions$.ofType(fromActions.GET_TOKEN).pipe(
        map((action: fromActions.GetToken) => action.payload),
        switchMap(credentials => {
            return this.tokenService.getToken(credentials).pipe(
                map(
                    token =>
                        new fromActions.GetTokenSuccess({
                            token
                        })
                ),
                catchError((error: any) =>
                    of(new fromActions.GetTokenFail(error))
                )
            );
        })
    );

    @Effect()
    getTokenSuccess$ = this.actions$.ofType(fromActions.GET_TOKEN_SUCCESS).pipe(
        map((action: fromActions.GetTokenSuccess) => action.payload),
        tap(requestData =>
            localStorage.setItem('access_token', requestData.token.access_token)
        ),
        map(requestData => new fromActions.Login())
    );

    @Effect()
    getTokenFail$ = this.actions$.ofType(fromActions.GET_TOKEN_FAIL).pipe(
        map(action => {
            return new fromRoot.Go({ path: ['/auth/login'] });
        })
    );

    @Effect()
    forgetToken$ = this.actions$.ofType(fromActions.FORGET_TOKEN).pipe(
        map(() => localStorage.clear()),
        map(action => {
            return new fromRoot.Go({ path: ['/auth/login'] });
        })
    );
}
