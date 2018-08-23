import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromSharedStore from './../../../shared/store';
import * as fromRouteStore from './../../../app/store';

import { Observable, Subscribable, Subscription, of, forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { DocsDocumentoService } from '../../services';

import { DocumentoEstadoModel } from '../../../shared/models/documento-estado.model';
import { DocumentoModel } from '../../../shared/models/documento.model';
import { DocumentoTipoModel } from '../../../shared/models/documento-tipo.model';

import { DocsNuevoDocumentoComponent } from '../../components/docs-nuevo-documento/docs-nuevo-documento.component';

@Component({
    selector: 'docs-documentos-lista',
    styleUrls: ['docs-documentos-lista.component.scss'],
    template: `
    <div class="ui-g">
        <div class="ui-g-12">
            <div class="card card-w-title">
                <h1><i class="fa fa-book" aria-hidden="true"></i> {{ tipoDocumento?.nombre }}</h1>
                
                <div class="ui-g">
                    <div class="ui-g-6">
                        <div class="tooltip">
                            <button pButton class="ui-button tooltip" label="Ver estados"></button>
                            <div class="ui-g-4 tooltip-button">
                                <div *ngFor="let estado of estados">
                                    <button pButton class="ui-button-rounded list-button" 
                                    [ngStyle]="{'background-color': estado.color ,'border-radius': '100%','margin-left': '20px'}">                
                                    </button>
                                    <p> &nbsp; {{estado.nombre}} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ui-g-6 text-aling-right">
                        <button pButton type="button" (click)="dnd.display=true" label="Crear documento" class="ui-button-success"></button>
                    </div>
                </div>
                <div class="ui-g">
                    <div class="ui-g-12">
                        <docs-tabla-documentos #dtd *ngIf="tipoDocumento && visible" [total]="totalRecords"
                        [documentos]="documentos"
                        [estados]="estados"
                        (onLoadDocumentosLazy)="onLoadDocumentosLazy($event)"></docs-tabla-documentos>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <docs-nuevo-documento #dnd
        [tipoDocumento]="tipoDocumento"
        [filteredRespAprobacion]="filteredRespAprobacion" (onFilterRespAprobacion)="onFilterRespAprobacion($event)"
        [filteredRespRevision]="filteredRespRevision" (onFilterRespRevision)="onFilterRespRevision($event)"
        [filteredRespElaboracion]="filteredRespElaboracion" (onFilterRespElaboracion)="onFilterRespElaboracion($event)"
        [filteredProcesos]="filteredProcesos" (onFilterProcesos)="onFilterProcesos($event)"
        (onCreateDoc)="onCreateDoc($event)"
    ></docs-nuevo-documento>
    `
})
export class DocsDocumentosListaComponent implements OnInit {

    route: Subscription;
    estados;
    tipoDocumento: DocumentoTipoModel;
    visible: boolean;
    documentos: DocumentoModel[] = [];
    totalRecords: number = 0;


    filteredRespAprobacion;
    filteredRespRevision;
    filteredRespElaboracion;
    filteredProcesos;

    @ViewChild('dnd') dnd: DocsNuevoDocumentoComponent;

    constructor(
        private store: Store<fromSharedStore.SharedState>,
        private docsDocumentoService: DocsDocumentoService
    ) {

    }

    ngOnInit() {
        this.store.select(fromSharedStore.getSelectedDocumentoTipo).subscribe(tipoDocumento => {
            this.tipoDocumento = tipoDocumento;
            this.visible = false;
            setTimeout(() => this.visible = true, 0);
            this.getEstadosDocumento().subscribe(estados => {
                this.estados = estados;
            });
        })
    }


    getEstadosDocumento() {
        return this.store.select(fromSharedStore.getAllDocumentoEstados);
    }

    hideWaitDialog() {
        this.store.dispatch(new fromSharedStore.HideWaitDialog());
    }

    showWaitDialog(header: string, body?: string) {
        this.store.dispatch(new fromSharedStore.ShowWaitDialog({ header, body }));
    }

    onLoadDocumentosLazy(event) {
        this.showWaitDialog('Documentos', 'Consultando documentos, por favor espere...');
        this.docsDocumentoService.getDocumentosByIdTipo(event, this.tipoDocumento.id).subscribe(response => {
            this.documentos = [...response.documentos];
            this.totalRecords = response.total;
            this.hideWaitDialog();
        })
    }

    onFilterRespAprobacion(event) {
        this.getUserQuery(event).subscribe(response => {
            this.filteredRespAprobacion = response;
        })
    }

    onFilterRespRevision(event) {
        this.getUserQuery(event).subscribe(response => {
            this.filteredRespRevision = response;
        })
    }

    onFilterRespElaboracion(event) {
        this.getUserQuery(event).subscribe(response => {
            this.filteredRespElaboracion = response;
        })
    }

    getUserQuery(query) {
        return this.docsDocumentoService.getUsuariosQuery(query);
    }

    onFilterProcesos(query) {
        this.docsDocumentoService.getProcesosQuery(query).subscribe(response => {
            this.filteredProcesos = response;
        })
    }

    onCreateDoc(documentoForm) {
        this.dnd.onHideCreateNewDoc();
        this.showWaitDialog('Documentos', 'Creando documento, por favor espere...');
        this.docsDocumentoService.createDocumento(this.tipoDocumento.id, documentoForm).subscribe(response => {
            this.hideWaitDialog();
            this.visible = false;
            setTimeout(() => this.visible = true, 0);
        })
    }
}