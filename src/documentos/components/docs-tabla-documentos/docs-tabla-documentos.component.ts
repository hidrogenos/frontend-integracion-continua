import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DataTable } from 'primeng/primeng';

import { Store } from '@ngrx/store';

import * as fromRootStore from './../../../app/store';
import { environment } from './../../../environments/environment';

import { DocumentoEstadoModel } from '../../../shared/models/documento-estado.model';
import { DocumentoModel } from '../../../shared/models/documento.model';



@Component({
    selector: 'docs-tabla-documentos',
    template: `
    <p-table #dt [columns]="cols" [value]="documentos" [lazy]="true" (onLazyLoad)="loadDocumentosLazy($event)" [paginator]="true" 
        [rows]="10" [totalRecords]="total" [loading]="loading" lazyLoadOnInit="false">
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
                    <!--<p-multiSelect *ngSwitchCase="'estado_nombre'" [options]="estados"
                     optionLabel="nombre" defaultLabel="Todos"
                     (onChange)="mapEstadosFilter($event.value, col.field, col.filterMatchMode)"></p-multiSelect>-->
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
                <td *ngFor="let col of columns">
                    {{rowData[col.field]}}
                </td>
            </tr>
        </ng-template>
    </p-table>
    `
})
export class DocsTablaDocumentosComponent {

    cols: any[] = [
        { field: 'codigo', header: 'Código' },
        { field: 'titulo', header: 'Título' },
        { field: 'usuario_creacion_nombre', header: 'Usuario creador' },
        { field: 'version', header: 'Versión' },
        { field: 'estado_nombre', header: 'Estado' },
        { field: 'fecha_fin', header: 'Vence' },
    ]

    @Input()
    documentos: DocumentoModel[];

    @Input()
    total: number;

    @Input()
    estados: DocumentoEstadoModel[];

    @Output()
    onLoadDocumentosLazy = new EventEmitter<any>();

    @ViewChild('dt') dt: DataTable;

    constructor(
        private store: Store<fromRootStore.State>
    ) { }

    loadDocumentosLazy(event) {
        this.onLoadDocumentosLazy.emit(event);
    }

    formatDateFilter(event, field, filterMatchMode) {
        this.dt.filter('', field, filterMatchMode)
    }

    mapEstadosFilter(value, field, filterMatchMode) {
        this.dt.filter(value, field, filterMatchMode)
    }

    verDetalleDocumento(id) {
        this.store.dispatch(
            new fromRootStore.Go({
                path: [`/documentos/detalle/${id}`]
            })
        );
    }
}