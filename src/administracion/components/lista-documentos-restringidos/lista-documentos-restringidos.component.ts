import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ListaDocumentoRestringidoModel } from "../../../shared/models/lista-documento-restringido.model";

@Component({
    selector: 'lista-documentos-retringidos',
    template: `
        <div>
                <p-table #dt
                [value]="listaDocumentosRestringidos"
                [paginator]="true"
                [rows]="10"
                [lazy]="true"
                [totalRecords]="totalRecordsDocumentosRestringidos"
                [loading]="loadingDocumentosRestringidos"
                sortField="nombre"
                selectionMode="single"
                (onLazyLoad)="onLoadListaDocumentosRestringidos.emit($event)"
                (onRowSelect)="onRowSelect($event)"
                (onRowUnselect)="onRowUnselect()">

                <ng-template pTemplate="header">
                            <tr>
                                <th pSortableColumn="nombre">
                                    Nombre
                                    <p-sortIcon field="nombre"></p-sortIcon>
                                </th>
                                <th style="width: 30%;" rowspan="2">
                                    Acciones
                                </th>
                            </tr>
                            <tr>
                                <th class="ui-fluid">
                                    <input pInputText type="text" (input)="dt.filter($event.target.value, 'nombre', 'contains')">
                                </th>
                            </tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-rowData  let-lista>
                            <tr [pSelectableRow]="rowData">
                                <td> {{ lista.nombre }} </td>
                                <td style="text-align: center;">
                                    <button
                                        *ngIf="permisoEditarListaDocumentosRestringidos" 
                                        style="margin-right:10px;"
                                        pButton
                                        type="button"
                                        icon="pi pi-pencil"
                                        class="ui-button-warning"
                                        (click)="onEditListaDocumentosRestringidos.emit(lista)">
                                    </button>
                                    <button
                                        *ngIf="permisoEliminarListaDocumentosRestringidos" 
                                        style="margin-right:10px;" pButton 
                                        type="button"
                                        icon="pi pi-trash"
                                        class="ui-button-danger"
                                        (click)="onDeleteListaDocumentosRestringidos.emit(lista); onRowUnselect()">
                                    </button>
                                </td>
                            </tr>
                        </ng-template>
                </p-table>
        </div>
    `,
    styleUrls: ['lista-documentos-restringidos.component.scss'],
})
export class ListaDocumentosRestringidosComponent {

    //properties
    @Input()
    listaDocumentosRestringidos: ListaDocumentoRestringidoModel[];

    @Input()
    totalRecordsDocumentosRestringidos: number;

    @Input()
    loadingDocumentosRestringidos: boolean;

    //permits
    @Input()
    permisoEditarListaDocumentosRestringidos;

    @Input()
    permisoEliminarListaDocumentosRestringidos;

    //events
    @Output()
    onEditListaDocumentosRestringidos = new EventEmitter();

    @Output()
    onDeleteListaDocumentosRestringidos = new EventEmitter();

    @Output()
    onSelectListaDocumentosRestringidos = new EventEmitter();

    @Output()
    onLoadListaDocumentosRestringidos = new EventEmitter();


    constructor() { }

    onRowSelect(event) {
        const selectedLista = event.data;
        this.onSelectListaDocumentosRestringidos.emit(selectedLista);
    }

    onRowUnselect(){
        const selectedLista = null;
        this.onSelectListaDocumentosRestringidos.emit(selectedLista);
    }


}