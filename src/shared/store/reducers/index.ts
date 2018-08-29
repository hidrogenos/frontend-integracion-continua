import * as fromEstados from './documento-estados.reducer';
import * as fromTiposDocumento from './documento-tipos.reducer';
import * as fromWaitDialogReducer from './wait-dialog.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface SharedState {
    estados: fromEstados.DocumentoEstadoState;
    tiposdocumento: fromTiposDocumento.DocumentoTipoState;
    waitDialog: fromWaitDialogReducer.WaitDialogState;
}

export const reducers: ActionReducerMap<SharedState> = {
    estados: fromEstados.reducer,
    tiposdocumento: fromTiposDocumento.reducer,
    waitDialog: fromWaitDialogReducer.reducer
};

export const getSharedState = createFeatureSelector<SharedState>('shared');
