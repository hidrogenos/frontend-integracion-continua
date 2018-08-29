import { Action } from '@ngrx/store';

import { DocumentoEstadoModel } from '../../models/documento-estado.model';

export const LOAD_DOCUMENTO_ESTADOS = '[Documento estados] Load documento estados';
export const LOAD_DOCUMENTO_ESTADOS_FAIL = '[Documento estados] Load documento estados fail';
export const LOAD_DOCUMENTO_ESTADOS_SUCCESS = '[Documento estados] Load documento estados success';

export class LoadDocumentoEstados implements Action {
    readonly type = LOAD_DOCUMENTO_ESTADOS;
    constructor(public payload: any) { }
}

export class LoadDocumentoEstadosFail implements Action {
    readonly type = LOAD_DOCUMENTO_ESTADOS_FAIL;
    constructor(public payload: any) { }
}

export class LoadDocumentoEstadosSuccess implements Action {
    readonly type = LOAD_DOCUMENTO_ESTADOS_SUCCESS;
    constructor(public payload: DocumentoEstadoModel[]) { }
}

export type DocumentoEstadosAction = LoadDocumentoEstados | LoadDocumentoEstadosFail | LoadDocumentoEstadosSuccess;
