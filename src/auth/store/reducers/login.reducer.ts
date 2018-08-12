import * as fromActions from './../actions';
import { UsuarioModel } from '../../../shared/models/usuario.model';

export interface LoginState {
    user: UsuarioModel;
    logged: boolean;
    logging: boolean;
    requestUrl: string;
}

export const initialState: LoginState = {
    user: null,
    logged: false,
    logging: false,
    requestUrl: undefined
};

export function reducer(
    state = initialState,
    action: fromActions.LoginAcction
): LoginState {
    switch (action.type) {
        case fromActions.LOGIN: {
            return {
                ...state,
                user: null,
                logged: false,
                logging: true
            };
        }

        case fromActions.LOGIN_FAIL: {
            return {
                ...state,
                user: null,
                logged: false,
                logging: false
            };
        }

        case fromActions.LOGIN_SUCCESS: {
            return {
                ...state,
                user: action.payload.user,
                logged: true,
                logging: false
            };
        }

        case fromActions.LOGIN_SET_REQUEST_URL: {
            return {
                ...state,
                requestUrl: action.payload.requestUrl
            };
        }

        case fromActions.LOGIN_LOGOUT: {
            return {
                ...state,
                user: null,
                logged: false,
                logging: false
            };
        }
    }

    return state;
}

export const getUser = (state: LoginState) => state.user;
export const getLogged = (state: LoginState) => state.logged;
export const getLogging = (state: LoginState) => state.logging;
export const getRequestUrl = (state: LoginState) => state.requestUrl;
