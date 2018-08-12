import { Injectable } from '@angular/core';
import { Store } from '../../../../../node_modules/@ngrx/store';
import { StoreModel } from '../../../models/store.model';
import * as fromAuth from './../../../../auth/store';
import { map } from '../../../../../node_modules/rxjs/operators';
import { of, Observable } from '../../../../../node_modules/rxjs';

@Injectable()
export class HasPermisionService {
    constructor(private store: Store<StoreModel>) {}

    hasPermision(id: number): Observable<boolean> {
        return this.store.select(fromAuth.getPermisions).pipe(
            map(permisions => {
                return permisions.findIndex(permision => permision.id == id) !=
                    -1
                    ? true
                    : false;
            })
        );
    }
}
