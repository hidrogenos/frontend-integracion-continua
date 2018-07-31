import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector
} from '@ngrx/store';

import * as fromLogin from './login.reducer';
import * as fromToken from './token.reducer';

export interface AuthState {
    token: fromToken.TokenState;
    login: fromLogin.LoginState;
}

export const reducers: ActionReducerMap<AuthState> = {
    token: fromToken.reducer,
    login: fromLogin.reducer
};

export const getAuthState = createFeatureSelector<AuthState>('auth');
