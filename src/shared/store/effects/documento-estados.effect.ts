import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as documentoEstadosActions from '../actions/documento-estados.actions';
import * as fromServices from '../../services';

@Injectable()
export class DocumentoEstadosEffects {
    constructor(
        private actions$: Actions,
        private documentoEstadoService: fromServices.DocumentoEstadoService
    ) { }

    @Effect()
    loadDocumentoEstados$ = this.actions$.ofType(documentoEstadosActions.LOAD_DOCUMENTO_ESTADOS).pipe(
        switchMap(() => {
            return this.documentoEstadoService
                .getDocumentoEstados()
                .pipe(
                    map(documentoEstados => {
                        return new documentoEstadosActions.LoadDocumentoEstadosSuccess(documentoEstados)
                    }),
                    catchError(error => of(new documentoEstadosActions.LoadDocumentoEstadosFail(error)))
                );
        })
    );
}