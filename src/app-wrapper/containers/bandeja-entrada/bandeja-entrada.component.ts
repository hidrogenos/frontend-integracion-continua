import { Component, ViewChild } from '@angular/core';
import { HasPermisionService } from '../../../shared/services';

import * as fromRootStore from '../../../app/store';
import { Store } from '@ngrx/store';
import { BeBandejaEntradaService } from '../../services';
import { BeDocumentosTablaComponent } from '../../components';

@Component({
    selector: 'bandeja-entrada',
    template: `
        <div>
            <be-documentos-tabla #misdoc [titulo]="'Mis documentos vigentes'"
                (onSelectDocumento)="redirectToDocumento($event)"
                (onConsultarDocumentos)="consultarLazyMisDocumentos($event)"></be-documentos-tabla>
            <be-documentos-tabla #docobs [titulo]="'Documentos obsoletos'" *ngIf="hasPermision(1000) | async"
                (onSelectDocumento)="redirectToDocumento($event)"
                (onConsultarDocumentos)="consultarLazyObsoletos($event)"></be-documentos-tabla>
            <be-documentos-tabla #docobs [titulo]="'Vistos buenos pendientes de garantía'" *ngIf="hasPermision(11000) | async"
                (onSelectDocumento)="redirectToDocumento($event)"
                (onConsultarDocumentos)="consultarLazyVistoBueno($event)"></be-documentos-tabla>
        </div>
    `
})
export class BandejaEntradaComponent {

    @ViewChild('misdoc') misdoc: BeDocumentosTablaComponent;
    @ViewChild('docobs') docobs: BeDocumentosTablaComponent;

    constructor(
        private hasPermisionService: HasPermisionService,
        private store: Store<fromRootStore.State>,
        private beBandejaEntradaService: BeBandejaEntradaService
    ) { }

    hasPermision(requiredPermision: number) {
        return this.hasPermisionService.hasPermision(requiredPermision);
    }

    consultarLazyMisDocumentos(event) {
        this.beBandejaEntradaService
            .getDocumentosVigentesAsoc(event)
            .subscribe((items: any) => {
                this.misdoc.documentos = items.documentos;
                this.misdoc.total = items.total;
                this.misdoc.loading = false;
            });
    }

    consultarLazyObsoletos(event) {
        this.beBandejaEntradaService
            .getDocumentosObsoletos(event)
            .subscribe((items: any) => {
                this.docobs.documentos = items.documentos;
                this.docobs.total = items.total;
                this.docobs.loading = false;
            });
    }

    consultarLazyVistoBueno(event) {
        this.beBandejaEntradaService
            .getDocumentosVistoBueno(event)
            .subscribe((items: any) => {
                this.docobs.documentos = items.documentos;
                this.docobs.total = items.total;
                this.docobs.loading = false;
            });
    }

    redirectToDocumento(idDocumento: number) {
        this.store.dispatch(
            new fromRootStore.Go({
                path: [`/documentos/detalle/${idDocumento}`]
            })
        );
    }
}