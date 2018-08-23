import {
    createSelector,
    createFeatureSelector,
} from '@ngrx/store';

import * as fromRoot from './../../../app/store';
import * as fromFeatures from './../reducers';
import * as fromDocumentoEstados from './../reducers/documento-estados.reducer';
import { DocumentoEstadoModel } from '../../models/documento-estado.model';

export const getDocumentoEstadosState = createSelector(
    fromFeatures.getSharedState,
    (state: fromFeatures.SharedState) => state.estados
);

export const getDocumentoEstadosEntities = createSelector(
    getDocumentoEstadosState,
    fromDocumentoEstados.getDocumentoEstadosEntities
);

export const getAllDocumentoEstados = createSelector(getDocumentoEstadosEntities, estados => {
    return Object.keys(estados).map(id => estados[parseInt(id, 10)]);
});

export const getDocumentoEstadosLoaded = createSelector(
    getDocumentoEstadosState,
    fromDocumentoEstados.getDocumentoEstadosLoaded
);
export const getDocumentoEstadosLoading = createSelector(
    getDocumentoEstadosState,
    fromDocumentoEstados.getDocumentoEstadosLoading
);