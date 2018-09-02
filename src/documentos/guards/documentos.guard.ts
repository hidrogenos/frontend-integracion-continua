import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import * as fromSharedStore from './../../shared/store';
import * as fromRootStore from './../../app/store';
import { Store } from '@ngrx/store';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { DocsDocumentoService } from '../services';
import { HasPermisionService } from '../../shared/services';

import { environment } from './../../environments/environment';

@Injectable()
export class DocumentosGuard implements CanActivate {
    constructor(
        private store: Store<fromSharedStore.SharedState>,
        private docsDocumentoService: DocsDocumentoService,
        private hasPermisionService: HasPermisionService
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        return this.checkStore().pipe(
            switchMap(() => {
                return this.validarPermiso(route.params.tipoId).pipe(
                    switchMap((tienePermiso) => {
                        if (tienePermiso) {
                            return of(true)
                        } else {
                            this.store.dispatch(
                                new fromRootStore.Go({ path: ['acceso-denegado'] })
                            );
                            return of(false)
                        }
                    })
                )
            }),
            catchError(() => of(false))
        )
    }

    checkStore() {
        return this.checkStoreEstados().pipe(
            catchError(() => {
                new fromSharedStore.LoadDocumentoEstadosFail({})
                return of(false)
            }))
    }

    checkStoreEstados() {
        return this.store.select(fromSharedStore.getDocumentoEstadosLoaded).pipe(
            switchMap((loaded) => {
                if (!loaded) {
                    this.store.dispatch(new fromSharedStore.LoadDocumentoEstados({}));
                }
                return of(true);
            })
        )
    }

    validarPermiso(idTipoDoc) {
        return this.docsDocumentoService.getPermisosByTipoDoc(idTipoDoc).pipe(
            switchMap((permisos) => {
                let permisoVerLista = this.docsDocumentoService.filtrarPermisoDocumento(permisos, environment.permiso_documento.ver_lista_documentos);
                return this.hasPermision(permisoVerLista)
            })
        )
    }

    hasPermision(id: number): Observable<boolean> {
        return this.hasPermisionService.hasPermision(id).pipe(
            take(1)
        );
    }
}