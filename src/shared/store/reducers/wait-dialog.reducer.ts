import * as fromWaitDialogActions from '../actions';

export interface WaitDialogState {
    show: boolean;
    header: string;
    body: string;
}

export const initialState: WaitDialogState = {
    show: false,
    header: '',
    body: ''
};

export function reducer(
    state: WaitDialogState = initialState,
    action: fromWaitDialogActions.WaitDialogAction
) {
    switch (action.type) {
        case fromWaitDialogActions.HIDE_WAIT_DIALOG: {
            return {
                ...state,
                show: false,
                header: '',
                body: ''
            };
        }

        case fromWaitDialogActions.SHOW_WAIT_DIALOG: {
            const payload = action.payload;
            return {
                ...state,
                show: true,
                header: payload.header,
                body: payload.body
            };
        }
    }

    return state;
}

export const getWaitDialogShow = (state: WaitDialogState) => state.show;
export const getWaitDialogHeader = (state: WaitDialogState) => state.header;
export const getWaitDialogBody = (state: WaitDialogState) => state.body;
