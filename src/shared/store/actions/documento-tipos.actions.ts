import { Action } from '@ngrx/store';

import { DocumentoTipoModel } from '../../models/documento-tipo.model';

export const LOAD_DOCUMENTO_TIPOS = '[Documento tipos] Load documento tipos';
export const LOAD_DOCUMENTO_TIPOS_FAIL = '[Documento tipos] Load documento tipos fail';
export const LOAD_DOCUMENTO_TIPOS_SUCCESS = '[Documento tipos] Load documento tipos success';

export class LoadDocumentoTipos implements Action {
    readonly type = LOAD_DOCUMENTO_TIPOS;
    constructor(public payload: any) { }
}

export class LoadDocumentoTiposFail implements Action {
    readonly type = LOAD_DOCUMENTO_TIPOS_FAIL;
    constructor(public payload: any) { }
}

export class LoadDocumentoTiposSuccess implements Action {
    readonly type = LOAD_DOCUMENTO_TIPOS_SUCCESS;
    constructor(public payload: DocumentoTipoModel[]) { }
}

export type DocumentoTiposAction = LoadDocumentoTipos | LoadDocumentoTiposFail | LoadDocumentoTiposSuccess;
