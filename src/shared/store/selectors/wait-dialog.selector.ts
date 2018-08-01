import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';

import * as fromWaitDialog from '../reducers/wait-dialog.reducer';

export const getWaitDialogState = createSelector(
    fromFeature.getSharedState,
    (sharedState: fromFeature.SharedState) => sharedState.waitDialog
);

export const getWaitDialogShow = createSelector(
    getWaitDialogState,
    fromWaitDialog.getWaitDialogShow
);

export const getWaitDialogHeader = createSelector(
    getWaitDialogState,
    fromWaitDialog.getWaitDialogHeader
);

export const getWaitDialogBody = createSelector(
    getWaitDialogState,
    fromWaitDialog.getWaitDialogBody
);
