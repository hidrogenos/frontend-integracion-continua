import { Action } from '@ngrx/store';

//token
export const GET_TOKEN = '[Auth] Get Token';
export const GET_TOKEN_FAIL = '[Auth] Get Token Fail';
export const GET_TOKEN_SUCCESS = '[Auth] Get Token Success';
export const FORGET_TOKEN = '[Auth] Forget Token';

export class GetToken implements Action {
    readonly type = GET_TOKEN;
    constructor(
        public payload: {
            grant_type: string;
            client_id: number;
            client_secret: string;
            username: string;
            password: string;
            scope: string;
        }
    ) {}
}

export class GetTokenFail implements Action {
    readonly type = GET_TOKEN_FAIL;
    constructor(public payload: any) {}
}

export class GetTokenSuccess implements Action {
    readonly type = GET_TOKEN_SUCCESS;
    constructor(public payload: { token: any }) {}
}

export class ForgetToken implements Action {
    readonly type = FORGET_TOKEN;
}

//action types

export type TokenAcction =
    | GetToken
    | GetTokenFail
    | GetTokenSuccess
    | ForgetToken;
