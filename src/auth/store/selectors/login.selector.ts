import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromLogin from '../reducers/login.reducer';

//login state

export const getLoginState = createSelector(
    fromFeature.getAuthState,
    (state: fromFeature.AuthState) => state.login
);

export const getLogged = createSelector(getLoginState, fromLogin.getLogged);

export const getLogging = createSelector(getLoginState, fromLogin.getLogging);

export const getRequestUrl = createSelector(
    getLoginState,
    fromLogin.getRequestUrl
);

export const getUser = createSelector(getLoginState, fromLogin.getUser);

export const getPermisions = createSelector(
    getUser,
    usuario => usuario.perfil.permisos
);
