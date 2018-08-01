import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

//store
import { Store } from '@ngrx/store';
import * as fromAuth from '../store';

// models
import { StoreModel } from '../../shared/models/store.model';
import { switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable()
export class LoggedGuard implements CanActivate {
    constructor(private store: Store<StoreModel>) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.isLogged().pipe(
            switchMap(logged => {
                if (logged) {
                    return of(true);
                } else {
                    this.store.dispatch(
                        new fromAuth.LoginSetRequestUrl({
                            requestUrl: state.url
                        })
                    );
                    this.store.dispatch(new fromAuth.Login());
                    return of(false);
                }
            })
        );
    }

    isLogged(): Observable<boolean> {
        return this.store.select(fromAuth.getLogged);
    }
}
