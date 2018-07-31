import { Action } from '@ngrx/store';
import { UsuarioModel } from '../../../shared/models/usuario.model';

//login
export const LOGIN = '[Auth] Login';
export const LOGIN_FAIL = '[Auth] Login Fail';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_LOGOUT = '[Auth] Login Logout';
export const LOGIN_SET_REQUEST_URL = '[Auth] Login Set Request URL';

export class Login implements Action {
    readonly type = LOGIN;
    constructor() {}
}

export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;
    constructor(public payload: { user: UsuarioModel }) {}
}

export class LoginFail implements Action {
    readonly type = LOGIN_FAIL;
    constructor() {}
}
export class LoginSetRequestUrl implements Action {
    readonly type = LOGIN_SET_REQUEST_URL;
    constructor(public payload: { requestUrl: string }) {}
}

//action types

export type LoginAcction =
    | Login
    | LoginSuccess
    | LoginFail
    | LoginSetRequestUrl;
