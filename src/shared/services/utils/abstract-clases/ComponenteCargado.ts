import { Store } from '@ngrx/store';
import { StoreModel } from '../../../models/store.model';
import * as fromShared from '../../../store';
import * as fromAuth from '../../../../auth/store';

export abstract class ComponenteCargado {

    fromAuth = fromAuth;

    constructor(private sharedStore: Store<StoreModel>){

    }
    

    hideWaitDialog() {
        this.sharedStore.dispatch(new fromShared.HideWaitDialog());
    }

    showWaitDialog(header: string, body?: string) {
        this.sharedStore.dispatch(new fromShared.ShowWaitDialog({ header, body }));
    }
}