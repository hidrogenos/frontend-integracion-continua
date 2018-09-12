import { Component, Output, EventEmitter } from '@angular/core';

import { environment } from './../../../environments/environment';
import { DocumentoModel } from '../../../shared/models/documento.model';

@Component({
    selector: 'inf-lista-documentos',
    template: `
    <div class="ui-g">
        <div class="ui-g-12">
            <div class="card card-w-title">
                <h1>Listado maestro de documentos</h1>
                <div class="ui-g">
                    <div class="ui-g-12 text-aling-right" >
                        <button pButton type="button" (click)="exportPDF()" label="Exportar a PDF" class="ui-button-success"></button>
                    </div>
                </div>
                <div class="ui-g">
                    <div class="ui-g-12">
                        <p-table #dt [columns]="cols" [value]="documentos" [lazy]="true" (onLazyLoad)="loadDocumentosLazy($event)" [paginator]="true" 
                            [rows]="10" [totalRecords]="total" lazyLoadOnInit="false" [loading]="loading">
                            <ng-template pTemplate="header" let-columns>
                                <tr>
                                    <th style="width:3em">Ver</th>
                                    <th *ngFor="let col of columns" [pSortableColumn]="col.field">
                                        {{col.header}}
                                        <p-sortIcon [field]="col.field"></p-sortIcon>
                                    </th>
                                </tr>
                                <tr>
                                    <th></th>
                                    <th *ngFor="let col of cols" class="ui-fluid">
                                        <input pInputText type="text" (input)="dt.filter($event.target.value, col.field, col.filterMatchMode)">
                                    </th>
                                </tr>
                            </ng-template>
                            <ng-template pTemplate="body" let-rowData let-columns="columns">
                                <tr [pSelectableRow]="rowData">
                                    <td>
                                        <button pButton class="ui-button-rounded shadow-box ui-shadow-2" (click)="verDetalleDocumento(rowData.id)"
                                        [ngStyle]="{'background-color': rowData.estado.color ,'border-radius': '100%'}">                
                                        </button>
                                    </td>
                                    <td *ngFor="let col of columns" [ngSwitch]="col.field">
                                        <span *ngSwitchCase="'fecha_fin'">{{rowData[col.field] | date: formatDate}}</span>
                                        <span *ngSwitchDefault>{{rowData[col.field]}}</span>
                                    </td>
                                </tr>
                            </ng-template>
                        </p-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
})
export class InfListaDocumentosComponent {

    formatDate: string = environment.dateFormatAngular;

    documentos: DocumentoModel[];
    total: number;
    loading: boolean = true;
    cantidadXPagina: number = 10;
    filtros: any;

    @Output()
    onLoadDocumentosLazy = new EventEmitter<any>();

    @Output()
    onVerDetalleDocumento = new EventEmitter<number>();

    @Output()
    onExportPDF = new EventEmitter<any>();

    cols: any[] = [
        { field: 'codigo', header: 'Código' },
        { field: 'titulo', header: 'Título' },
        { field: 'tipo_nombre', header: 'Tipo de documento' },
        { field: 'version', header: 'Versión' },
        { field: 'estado_nombre', header: 'Estado' },
        { field: 'fecha_fin', header: 'Vence' }
    ];

    constructor() { }

    loadDocumentosLazy(event) {
        this.filtros = event;
        this.loading = true;
        this.onLoadDocumentosLazy.emit(event);
    }

    exportPDF() {
        this.onExportPDF.emit(this.filtros);
    }

    verDetalleDocumento(idDocumento: number) {
        this.onVerDetalleDocumento.emit(idDocumento)
    }
}