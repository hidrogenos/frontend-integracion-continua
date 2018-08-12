import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromLogin from '../reducers/token.reducer';

export const getTokenState = createSelector(
    fromFeature.getAuthState,
    (state: fromFeature.AuthState) => state.token
);

export const getLoading = createSelector(
    getTokenState,
    fromLogin.getTokenLoading
);
