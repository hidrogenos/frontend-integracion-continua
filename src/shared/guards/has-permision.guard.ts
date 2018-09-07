import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromShared from '../store';
import * as fromRoot from '../../app/store';
import { of } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';
import { HasPermisionService } from '../services';

@Injectable()
export class HasPermisionGuard implements CanActivate{


    constructor (
        private store: Store<fromShared.SharedState>,
        private hasPermisionService: HasPermisionService
    ){}

    canActivate(){
        // this.store.select
       return this.store.select(fromRoot.getRouterState).pipe(
            take(1),
            switchMap((response: any) => {
                let permiso = response.state.data.requiredPermision;
                return this.validarPermiso(permiso);
            })
        )
    }

    validarPermiso(id: number){
        return this.hasPermisionService.hasPermision(id).pipe(
            take(1),
            switchMap(respuesta =>{
                if (respuesta) {
                    return of(true)
                }else{
                    this.store.dispatch(
                        new fromRoot.Go({ path: ['acceso-denegado'] })
                    );
                    return of(false);
                }
            })
        )
    }

}