import { Component } from '@angular/core';
import { HasPermisionService } from '../../../shared/services';

import * as fromRootStore from '../../../app/store';
import { Store } from '@ngrx/store';

@Component({
    selector: 'bandeja-entrada',
    template: `
        <div>
            <be-documentos-vigentes-asoc *ngIf="hasPermision([1000]) | async" 
                (onSelectDocumento)="redirectToDocumento($event)"></be-documentos-vigentes-asoc>
        </div>
    `
})
export class BandejaEntradaComponent {
    constructor(
        private hasPermisionService: HasPermisionService,
        private store: Store<fromRootStore.State>
    ) { }

    hasPermision(requiredPermision: number) {
        return this.hasPermisionService.hasPermision(requiredPermision);
    }

    redirectToDocumento(idDocumento: number) {
        this.store.dispatch(
            new fromRootStore.Go({
                path: [`/documentos/detalle/${idDocumento}`]
            })
        );
    }
}