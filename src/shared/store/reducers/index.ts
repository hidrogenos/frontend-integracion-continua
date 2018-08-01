import * as fromWaitDialogReducer from './wait-dialog.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface SharedState {
    waitDialog: fromWaitDialogReducer.WaitDialogState;
}

export const reducers: ActionReducerMap<SharedState> = {
    waitDialog: fromWaitDialogReducer.reducer
};

export const getSharedState = createFeatureSelector<SharedState>('shared');
