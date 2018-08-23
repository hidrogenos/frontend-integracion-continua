import { Component, OnInit } from '@angular/core';

//store
import { Store } from '../../../../node_modules/@ngrx/store';
import * as fromRoot from './../../../app/store';
import * as fromShared from './../../../shared/store';
//models
import { StoreModel } from '../../models/store.model';
import { HasPermisionService, PdfViewerService } from '../../services';
import {
    tap,
    take,
    switchMap,
    map
} from '../../../../node_modules/rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'pdf-viewer',
    styleUrls: ['pdf-viewer.component.scss'],
    template: `
        <div *ngIf="url">
            <object [data]="url" type="application/pdf" width="100%" height="800px">
            </object>
        </div>
    `
})
export class PdfViewerComponent implements OnInit {
    page: number = 1;
    zoom: number = 1;
    url;

    constructor() {}

    ngOnInit() {}
}
