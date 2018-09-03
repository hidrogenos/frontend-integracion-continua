import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import * as fromAuthStore from './../../auth/store';
import * as fromRootStore from './../../app/store';
import { environment } from './../../environments/environment';
import { Store } from '@ngrx/store';
import { tap, filter, take, switchMap, catchError, map } from 'rxjs/operators';
import { of, Observable, forkJoin } from 'rxjs';
import { DocumentoService, HasPermisionService } from '../../shared/services';
import { DocumentoModel } from '../../shared/models/documento.model';
import { UsuarioModel } from '../../shared/models/usuario.model';
import { DocsDocumentoService } from '../services';
import { DocumentoPermisoTipoDocumentoModel } from '../../shared/models/documento-permiso-tipo-documento.model';

@Injectable()
export class DocumentoGuard implements CanActivate {
    constructor(
        private store: Store<fromAuthStore.AuthState>,
        private documentoService: DocumentoService,
        private docsDocumentoService: DocsDocumentoService,
        private hasPermisionService: HasPermisionService,
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        return this.tienePermisos(route.params.documentoId).pipe(
            switchMap(([permisoElaborar, permisoRevisar, permisoAprobar]) => {
                if (permisoElaborar || permisoRevisar || permisoAprobar) {
                    return of(true)
                } else {
                    return this.checkStoreUser().pipe(
                        switchMap((usuario: any) => {
                            if (usuario) {
                                return this.validateUser(route.params.documentoId, usuario);
                            } else {
                                return of(false);
                            }
                        })
                    )
                }
            })
        )
    }


    checkStoreUser() {
        return this.store.select(fromAuthStore.getUser).pipe(
            map((usuario) => {
                if (!usuario) {
                    this.store.dispatch(new fromAuthStore.LoginFail());
                    return of(false);
                } else {
                    return usuario;
                }
            })
        )
    }

    validateUser(idDocumento, usuario: UsuarioModel): Observable<boolean> {
        return this.documentoService.getDocumentoById(idDocumento).pipe(
            switchMap((documento: DocumentoModel) => {
                return this.validarPermisoUsuarioDocumento(documento, usuario);
            })
        )
    }

    validarPermisoUsuarioDocumento(documento, usuario): Observable<boolean> {
        if (documento.id_responsable_crea == usuario.id
            || documento.id_responsable_elabora == usuario.id
            || documento.id_responsable_revisa == usuario.id
            || documento.id_responsable_aprueba == usuario.id
            || usuario.es_jefe) {
            return of(true);
        } else {
            return this.docsDocumentoService.usuarioPerteneceProcesoDocumento(usuario.id, documento.id).pipe(
                switchMap((response: any[]) => {
                    if (response.length > 0) {
                        return of(true);
                    } else {
                        this.store.dispatch(
                            new fromRootStore.Go({ path: ['acceso-denegado'] })
                        );
                        return of(false);
                    }
                })
            )
        }
    }

    tienePermisos(idDocumento: number) {
        return this.docsDocumentoService.getPermisosByDoc(idDocumento)
            .pipe(
                switchMap((response: DocumentoPermisoTipoDocumentoModel[]) => {
                    let permisoElaborarAjenos = this.docsDocumentoService.filtrarPermisoDocumento(response, environment.permiso_documento.elaborar_ajenos);
                    let permisoRevisarAjenos = this.docsDocumentoService.filtrarPermisoDocumento(response, environment.permiso_documento.revisar_ajenos);
                    let permisoAprobarAjenos = this.docsDocumentoService.filtrarPermisoDocumento(response, environment.permiso_documento.aprobar_ajenos);
                    return forkJoin(
                        this.hasPermision(permisoElaborarAjenos),
                        this.hasPermision(permisoRevisarAjenos),
                        this.hasPermision(permisoAprobarAjenos)
                    )
                })
            )
    }

    hasPermision(id: number): Observable<boolean> {
        return this.hasPermisionService.hasPermision(id).pipe(
            take(1)
        );
    }


}