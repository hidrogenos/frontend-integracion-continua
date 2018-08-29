import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as documentoTiposActions from '../actions/documento-tipos.actions';
import * as fromServices from '../../services';

@Injectable()
export class DocumentoTiposEffects {
    constructor(
        private actions$: Actions,
        private documentoTipoService: fromServices.DocumentoTipoService
    ) { }

    @Effect()
    loadDocumentoTipos$ = this.actions$.ofType(documentoTiposActions.LOAD_DOCUMENTO_TIPOS).pipe(
        switchMap(() => {
            return this.documentoTipoService
                .getDocumentoTipos()
                .pipe(
                    map(documentoTipos => {
                        return new documentoTiposActions.LoadDocumentoTiposSuccess(documentoTipos)
                    }),
                    catchError(error => of(new documentoTiposActions.LoadDocumentoTiposFail(error)))
                );
        })
    );
}