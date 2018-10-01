import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BeBandejaEntradaService } from '../../services';

import { environment } from './../../../environments/environment';

import { DocumentoModel } from '../../../shared/models/documento.model';

@Component({
    selector: 'be-documentos-tabla',
    template: `
    <div class="ui-g">
        <div class="ui-g-12">
            <div class="card card-w-title">
                <h1>{{ titulo }}</h1>
                <p-table #dt [columns]="cols" [value]="documentos" [lazy]="true" (onLazyLoad)="loadDocumentosLazy($event)" [paginator]="true" 
                    [rows]="10" [totalRecords]="total" lazyLoadOnInit="false" [loading]="loading">
                    <ng-template pTemplate="header" let-columns>
                        <tr>
                            <th style="width:3em" rowspan="2">Ver</th>
                            <th *ngFor="let col of columns" [pSortableColumn]="col.field">
                                {{col.header}}
                                <p-sortIcon [field]="col.field"></p-sortIcon>
                            </th>
                        </tr>
                        <tr>
                            <th *ngFor="let col of cols" class="ui-fluid">
                                <input pInputText type="text" (input)="dt.filter($event.target.value, col.field, col.filterMatchMode)">
                            </th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-rowData let-columns="columns">
                        <tr [pSelectableRow]="rowData">
                            <td>
                                <button pButton class="ui-button-rounded shadow-box ui-shadow-2" (click)="verDetalleDocumento(rowData.id, $event)"
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
    `
})
export class BeDocumentosTablaComponent {

    documentos: DocumentoModel[];
    total: number;
    cantidadXPagina: number = 10;
    formatDate: string;
    loading: boolean = true;

    cols: any[] = [
        { field: 'codigo', header: 'Código' },
        { field: 'titulo', header: 'Título' },
        { field: 'tipo_nombre', header: 'Tipo de documento' },
        { field: 'version', header: 'Versión' },
        { field: 'estado_nombre', header: 'Estado' },
        { field: 'fecha_fin', header: 'Vence' }
    ];

    @Input()
    titulo: string;
    @Output()
    onSelectDocumento = new EventEmitter<any>();
    @Output()
    onConsultarDocumentos = new EventEmitter<any>();

    constructor(private beBandejaEntradaService: BeBandejaEntradaService) {
        this.formatDate = environment.dateFormatAngular;
    }

    loadDocumentosLazy(event) {
        this.loading = true;
        this.onConsultarDocumentos.emit(event);
        
    }

    verDetalleDocumento(idDocumento: number, event: MouseEvent) {
        let infoDocGestionar = {
            idDocumento: idDocumento, event: event
        }
        this.onSelectDocumento.emit(infoDocGestionar);
    }

}
