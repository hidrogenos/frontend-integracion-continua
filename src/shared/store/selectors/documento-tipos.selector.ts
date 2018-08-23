import {
    createSelector,
    createFeatureSelector,
} from '@ngrx/store';

import * as fromRoot from './../../../app/store';
import * as fromFeatures from './../reducers';
import * as fromDocumentoTipos from './../reducers/documento-tipos.reducer';
import { DocumentoTipoModel } from '../../models/documento-tipo.model';

export const getDocumentoTiposState = createSelector(
    fromFeatures.getSharedState,
    (state: fromFeatures.SharedState) => state.tiposdocumento
);

export const getDocumentoTiposEntities = createSelector(
    getDocumentoTiposState,
    fromDocumentoTipos.getDocumentoTiposEntities
);

export const getSelectedDocumentoTipo = createSelector(
    getDocumentoTiposEntities,
    fromRoot.getRouterState,
    (tipos, router): DocumentoTipoModel => {
        return router.state && tipos[router.state.params.tipoId]
    }
)

export const getAllDocumentoTipos = createSelector(getDocumentoTiposEntities, documentos => {
    return Object.keys(documentos).map(id => documentos[parseInt(id, 10)]);
});

export const getDocumentoTiposLoaded = createSelector(
    getDocumentoTiposState,
    fromDocumentoTipos.getDocumentoTiposLoaded
);
export const getDocumentoTiposLoading = createSelector(
    getDocumentoTiposState,
    fromDocumentoTipos.getDocumentoTiposLoading
);