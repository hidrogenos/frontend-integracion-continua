import * as fromDocumentoEstados from '../actions/documento-estados.actions';
import { DocumentoEstadoModel } from '../../models/documento-estado.model';

export interface DocumentoEstadoState {
    estados: { [id: number]: DocumentoEstadoModel };
    loaded: boolean;
    loading: boolean;
}

export const initialState: DocumentoEstadoState = {
    estados: {},
    loaded: false,
    loading: false,
};

export function reducer(
    state = initialState,
    action: fromDocumentoEstados.DocumentoEstadosAction
): DocumentoEstadoState {
    switch (action.type) {
        case fromDocumentoEstados.LOAD_DOCUMENTO_ESTADOS: {
            return {
                ...state,
                loading: true,
            };
        }

        case fromDocumentoEstados.LOAD_DOCUMENTO_ESTADOS_SUCCESS: {
            const docs = action.payload;

            const estados = docs.reduce(
                (entities: { [id: number]: DocumentoEstadoModel }, documento: DocumentoEstadoModel) => {
                    return {
                        ...entities,
                        [documento.id]: documento,
                    };
                },
                {
                    ...state.estados,
                }
            );

            return {
                ...state,
                loading: false,
                loaded: true,
                estados,
            };
        }

        case fromDocumentoEstados.LOAD_DOCUMENTO_ESTADOS_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false,
            };
        }
    }

    return state;
}

export const getDocumentoEstadosEntities = (state: DocumentoEstadoState) => state.estados;
export const getDocumentoEstadosLoading = (state: DocumentoEstadoState) => state.loading;
export const getDocumentoEstadosLoaded = (state: DocumentoEstadoState) => state.loaded;