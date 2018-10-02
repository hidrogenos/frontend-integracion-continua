import { Component, ViewChild } from '@angular/core';
import { InformeService } from '../../services';
import { InfListaDocumentosComponent } from '../../components';

import * as fromSharedStore from './../../../shared/store';
import { Store } from '@ngrx/store';
import * as fromRootStore from './../../../app/store';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'inf-listado-maestro-documentos',
    template: `
        <div>
            <inf-lista-documentos #infListaDocs 
            (onExportPDF)="onExportPDF($event)"
            (onLoadDocumentosLazy)="onLoadDocumentosLazy($event)"
            (onVerDetalleDocumento)="onVerDetalleDocumento($event)">
            </inf-lista-documentos>
        </div>
    `
})
export class InfListadoMaestroDocumentosComponent {

    @ViewChild('infListaDocs') infListaDocs: InfListaDocumentosComponent;

    constructor(
        private informeService: InformeService,
        private sharedStore: Store<fromSharedStore.SharedState>,
        private store: Store<fromRootStore.State>
    ) { }

    onLoadDocumentosLazy(event) {
        this.informeService
            .getDocumentosListadoMaestro(event)
            .subscribe((items: any) => {
                this.infListaDocs.documentos = items.documentos;
                this.infListaDocs.total = items.total;
                this.infListaDocs.loading = false;
            });
    }

    onExportPDF(event) {
        this.showWaitDialog('Informes', 'Generando informe, un momento por favor...')
        this.informeService.exportPDF(event).subscribe(response => {
            const blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
            this.hideWaitDialog();
        })
    }

    onVerDetalleDocumento(data) {
        data.event.ctrlKey
            ? window.open(`${environment.baseUrl}/documentos/detalle/${data.idDocumento}`) :
            this.store.dispatch(
                new fromRootStore.Go({
                    path: [`/documentos/detalle/${data.idDocumento}`]
                })
            );
    }

    hideWaitDialog() {
        this.sharedStore.dispatch(new fromSharedStore.HideWaitDialog());
    }

    showWaitDialog(header: string, body?: string) {
        this.sharedStore.dispatch(new fromSharedStore.ShowWaitDialog({ header, body }));
    }
}