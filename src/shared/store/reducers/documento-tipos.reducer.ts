import * as fromDocumentoTipos from '../actions/documento-tipos.actions';
import { DocumentoTipoModel } from '../../models/documento-tipo.model';

export interface DocumentoTipoState {
    tipos: { [id: number]: DocumentoTipoModel };
    loaded: boolean;
    loading: boolean;
}

export const initialState: DocumentoTipoState = {
    tipos: {},
    loaded: false,
    loading: false,
};

export function reducer(
    state = initialState,
    action: fromDocumentoTipos.DocumentoTiposAction
): DocumentoTipoState {
    switch (action.type) {
        case fromDocumentoTipos.LOAD_DOCUMENTO_TIPOS: {
            return {
                ...state,
                loading: true,
            };
        }

        case fromDocumentoTipos.LOAD_DOCUMENTO_TIPOS_SUCCESS: {
            const docs = action.payload;

            const tipos = docs.reduce(
                (entities: { [id: number]: DocumentoTipoModel }, documento: DocumentoTipoModel) => {
                    return {
                        ...entities,
                        [documento.id]: documento,
                    };
                },
                {
                    ...state.tipos,
                }
            );

            return {
                ...state,
                loading: false,
                loaded: true,
                tipos,
            };
        }

        case fromDocumentoTipos.LOAD_DOCUMENTO_TIPOS_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false,
            };
        }
    }

    return state;
}

export const getDocumentoTiposEntities = (state: DocumentoTipoState) => state.tipos;
export const getDocumentoTiposLoading = (state: DocumentoTipoState) => state.loading;
export const getDocumentoTiposLoaded = (state: DocumentoTipoState) => state.loaded;