import { Action } from "@ngrx/store";

export const SHOW_WAIT_DIALOG = '[shared] Show wait dialog';
export const HIDE_WAIT_DIALOG = '[shared] Hide wait dialog';

export class ShowWaitDialog implements Action {
    readonly type = SHOW_WAIT_DIALOG;
    constructor(public payload: {header: string, body?: string}){}
}

export class HideWaitDialog implements Action {
    readonly type = HIDE_WAIT_DIALOG;
}

export type WaitDialogAction = ShowWaitDialog | HideWaitDialog;