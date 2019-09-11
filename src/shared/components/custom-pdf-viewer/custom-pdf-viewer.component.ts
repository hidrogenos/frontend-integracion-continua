import {Component, OnInit} from '@angular/core';

//store
import {Store} from '../../../../node_modules/@ngrx/store';
import * as fromRoot from './../../../app/store';
import * as fromShared from './../../../shared/store';
//models
import {StoreModel} from '../../models/store.model';
import {HasPermisionService, PdfViewerService} from '../../services';
import {
    tap,
    take,
    switchMap,
    map
} from '../../../../node_modules/rxjs/operators';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'custom-pdf-viewer',
    styleUrls: ['custom-pdf-viewer.component.scss'],
    template: `
        <div *ngIf="url">
            <object
                    *ngIf="puedeImprimir"
                    [data]="url"
                    type="application/pdf"
                    width="100%"
                    height="800px"
            >
            </object>
            <pdf-viewer
                    *ngIf="!puedeImprimir"
                    [src]="basicUrl"
                    [render-text]="false"
                    [show-all]="false"
                    [(page)]="page"
                    [zoom]="zoom"
                    style="display: block;"
            ></pdf-viewer>
            <div class="test-fix" *ngIf="!puedeImprimir">
                <div class="boton-p" (click)="pageNext($event)"><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></div>
                <div class="boton-p" (click)="pagePrev($event)"><i class="fa fa-angle-left fa-2x" aria-hidden="true"></i></div>
                <div class="boton" (click)="zoomIn($event)"><i class="fa fa-plus" aria-hidden="true"></i></div>
                <div class="boton" (click)="zoomOut($event)"><i class="fa fa-minus" aria-hidden="true"></i></div>
            </div>
        </div>
    `
})
export class CustomPdfViewerComponent implements OnInit {
    page = 1;
    zoom = 1;
    url;
    basicUrl;
    puedeImprimir;

    constructor() {
    }

    ngOnInit() {
    }

    zoomIn(e) {
        if (this.zoom < 4) {
            this.zoom *= 2;
        }
    }

    zoomOut(e) {
        if (this.zoom > 0.25) {
            this.zoom = this.zoom / 2;
        }
    }

    pageNext($event){
        this.page++;
    }

    pagePrev($event){
        this.page--;
    }
}
