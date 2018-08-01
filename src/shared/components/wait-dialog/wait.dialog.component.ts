import { Component, OnInit } from '@angular/core';

// store
import { Store } from '@ngrx/store';
import * as fromShared from '../../store';

//models
import { StoreModel } from '../../models/store.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'wait-dialog',
    styleUrls: ['wait-dialog.component.scss'],
    template: `
        <p-dialog 
            [header]="header$ | async" 
            [(visible)]="display"
            [modal]="true">
            {{ body$ | async }}
        </p-dialog>
    `
})
export class WaitDialogComponent implements OnInit {
    display: boolean;
    header$: Observable<string> = this.store.select(
        fromShared.getWaitDialogHeader
    );
    body$: Observable<string> = this.store.select(fromShared.getWaitDialogBody);

    constructor(private store: Store<StoreModel>) {}

    ngOnInit() {
        this.store
            .select(fromShared.getWaitDialogShow)
            .subscribe(show => (this.display = show));
    }
}
