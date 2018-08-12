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
    printPermision: boolean;
    page: number = 1;
    zoom: number = 1;
    url;

    constructor(
        private store: Store<StoreModel>,
        private hasPermisionService: HasPermisionService,
        private pdfViewerService: PdfViewerService,
        private sanitizer: DomSanitizer
    ) {}

    ngOnInit() {
        this.showWaitDialog('Consultado documento, un momento por favor...');
        this.store
            .select(fromRoot.getRouterState)
            .pipe(take(1))
            .subscribe(routeState => {
                console.log(routeState);
                const params = routeState.state.params;
                this.getDocumentoByTipo(
                    parseInt(params.id_tipo_documento),
                    parseInt(params.id_documento),
                    params.nombre_doc
                );
            });
    }

    getDocumentoByTipo(
        tipoDocumento: number,
        idDocumento: number,
        nombreDocumento: string
    ) {
        switch (tipoDocumento) {
            case 1:
                this.getManualCalidad(idDocumento, nombreDocumento);
                break;

            default:
                break;
        }
    }

    getManualCalidad(idDocumento, nombreDocumento) {
        this.pdfViewerService
            .getManualCalidad(idDocumento)
            .pipe(
                map(response => {
                    console.log(response);
                    const blob = new Blob([response], {
                        type: 'application/pdf'
                    });
                    return window.URL.createObjectURL(blob);
                }),
                switchMap(url => {
                    return this.hasPermisionService.hasPermision(100).pipe(
                        map(printPermision => {
                            return printPermision
                                ? this.sanitizer.bypassSecurityTrustResourceUrl(
                                      `${url}#toolbar=1&navpanes=1`
                                  )
                                : this.sanitizer.bypassSecurityTrustResourceUrl(
                                      `${url}#toolbar=0&navpanes=1`
                                  );
                        })
                    );
                })
            )
            .subscribe(response => {
                this.url = response;
                this.hideWaitDialog();
            });
    }

    hideWaitDialog() {
        this.store.dispatch(new fromShared.HideWaitDialog());
    }

    showWaitDialog(header: string, body?: string) {
        this.store.dispatch(new fromShared.ShowWaitDialog({ header, body }));
    }
}
