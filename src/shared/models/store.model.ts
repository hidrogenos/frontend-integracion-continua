import { TokenState } from '../../auth/store/reducers/token.reducer';
import { LoginState } from '../../auth/store/reducers/login.reducer';

export interface StoreModel {
    auth: {
        token: TokenState;
        login: LoginState;
    };
}
