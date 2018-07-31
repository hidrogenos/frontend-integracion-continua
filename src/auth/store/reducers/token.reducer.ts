import * as fromActions from './../actions';

export interface TokenState {
    loaded: boolean;
    loading: boolean;
    fail: boolean;
}

export const initialState: TokenState = {
    loaded: false,
    loading: false,
    fail: false
};

export function reducer(
    state = initialState,
    action: fromActions.TokenAcction
): TokenState {
    switch (action.type) {
        case fromActions.GET_TOKEN: {
            return {
                ...state,
                loading: true,
                loaded: false,
                fail: false
            };
        }

        case fromActions.GET_TOKEN_FAIL: {
            return {
                ...state,
                loaded: false,
                loading: false,
                fail: true
            };
        }

        case fromActions.GET_TOKEN_SUCCESS: {
            const data = action.payload;
            return {
                ...state,
                loaded: true,
                loading: false,
                fail: false
            };
        }

        case fromActions.FORGET_TOKEN: {
            return {
                ...state,
                loaded: false,
                loading: false,
                fail: false
            };
        }
    }

    return state;
}

export const getTokenLoading = (state: TokenState) => state.loading;
export const getTokenLoaded = (state: TokenState) => state.loaded;
export const getTokenFail = (state: TokenState) => state.fail;
