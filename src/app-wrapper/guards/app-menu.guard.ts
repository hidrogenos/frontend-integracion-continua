import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import * as fromSharedStore from './../../shared/store';
import { Store } from '@ngrx/store';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AppMenuGuard implements CanActivate {
    constructor(
        private store: Store<fromSharedStore.SharedState>
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        )
    }

    checkStore() {
        return this.checkStoreTiposDocumento().pipe(
            catchError((err) => {
                console.log(err)
                new fromSharedStore.LoadDocumentoTiposFail({})
                return of(false)
            }))
    }

    checkStoreTiposDocumento() {
        return this.store.select(fromSharedStore.getDocumentoEstadosLoaded).pipe(
            switchMap((loaded) => {
                if (!loaded) {
                    this.store.dispatch(new fromSharedStore.LoadDocumentoTipos({}));
                }
                return of(true);
            })
        )
    }

}