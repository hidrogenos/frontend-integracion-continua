import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateAuditoriaExternaDialogComponent } from '../../components';
import { ListaAuditoriaExternaService } from '../../services';
import { UsuarioModel } from '../../../shared/models/usuario.model';
import { ListaPreguntaModel } from '../../../shared/models/auditoria-lista.model';
import { AuditoriaExternaModel } from '../../../shared/models/auditoria-externa.model';
import { Calendar } from 'primeng/primeng';
import { Table } from 'primeng/table';
import * as fromShared from './../../../shared/store';
import { StoreModel } from '../../../shared/models/store.model';
import { Store } from '@ngrx/store';

@Component({
    selector: 'lista-auditoria-externa',
    styleUrls: ['lista-auditoria-externa.component.scss'],
    template: `
        <div class="ui-g">
            <div class="ui-g-12">
                <div class="card card-w-title">
                    <h1>Auditorias externas</h1>
                    <div class="ui-g">
                        <div class="ui-g-12 text-aling-right">
                            <button pButton 
                                (click)="caed.display = true;"
                                type="button" 
                                label="Crear nueva auditoria" 
                                class="ui-button-primary">
                            </button> 
                        </div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-12">
                            <p-table 
                                [value]="auditorias" 
                                [lazy]="true" 
                                (onLazyLoad)="loadAuditoriasLazy($event)" 
                                [paginator]="true" 
                                [rows]="10" 
                                [totalRecords]="totalRecords"
                                [loading]="loading" 
                                sortField="id" #dt>
                                <ng-template pTemplate="header">
                                    <tr>
                                        <th pSortableColumn="id">
                                            No.
                                            <p-sortIcon field="id" ></p-sortIcon>
                                        </th>
                                        <th pSortableColumn="fecha">
                                            Fecha asignada
                                            <p-sortIcon field="fecha" ></p-sortIcon>
                                        </th>
                                        <th pSortableColumn="estado">
                                            Estado
                                            <p-sortIcon field="estado" ></p-sortIcon>
                                        </th>
                                        <th pSortableColumn="auditor_principal">
                                            Auditores
                                            <p-sortIcon field="auditor_principal" ></p-sortIcon>
                                        </th>
                                        <th pSortableColumn="proveedor">
                                            Proveedor
                                            <p-sortIcon field="proveedor" ></p-sortIcon>
                                        </th>
                                        <th pSortableColumn="objetivo">
                                            Objetivo
                                            <p-sortIcon field="objetivo" ></p-sortIcon>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>
                                            <input style="width: 100%;" pInputText type="number" (input)="dt.filter($event.target.value, 'id', 'contains')">
                                        </th>
                                        <th>
                                            <p-calendar [inputStyle]="{'width': '100%'}" selectionMode="range" (onSelect)="onSelectFecha($event)" #calendarFecha></p-calendar>
                                        </th>
                                        <th>
                                            <input style="width: 100%;" pInputText type="text" (input)="dt.filter($event.target.value, 'estado', 'contains')">
                                        </th>
                                        <th>
                                            <input style="width: 100%;" pInputText type="text" (input)="dt.filter($event.target.value, 'auditores', 'contains')">
                                        </th>
                                        <th>
                                            <input style="width: 100%;" pInputText type="text" (input)="dt.filter($event.target.value, 'proveedor', 'contains')">
                                        </th>
                                        <th>
                                            <input style="width: 100%;" pInputText type="text" (input)="dt.filter($event.target.value, 'objetivo', 'contains')">
                                        </th>
                                    </tr>
                                </ng-template>
                                <ng-template pTemplate="body" let-auditoria>
                                    <tr>
                                        <td>{{ auditoria.id }}</td>
                                        <td>{{ auditoria.fecha }}</td>
                                        <td>{{ auditoria.estado }}</td>
                                        <td>
                                            <p>{{ auditoria.auditor_principal }} {{ auditoria.auditor_principal }}</p>
                                            <p>{{ auditoria.auditor_apoyo }} {{ auditoria.auditor_apoyo }}</p>
                                        </td>
                                        <td>{{ auditoria.proveedor }}</td>
                                        <td [innerHTML]="auditoria.objetivo"></td>
                                    </tr>
                                </ng-template>
                            </p-table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <create-auditoria-externa-dialog #caed
            (onSearchProveedor)="searchProveedor($event)"
            [auditores]="auditores"
            [listasPreguntas]="listasPreguntas"
            (onCreateAuditoria)="createAuditoria($event)">
        </create-auditoria-externa-dialog>
    `
})
export class ListaAuditoriaExternaComponent implements OnInit {
    //atributos
    auditores: UsuarioModel[];
    auditorias: AuditoriaExternaModel[];
    listasPreguntas: ListaPreguntaModel[];
    loading: boolean = true;
    totalRecords: number;

    //viewchild
    @ViewChild('caed')
    caed: CreateAuditoriaExternaDialogComponent;
    @ViewChild('calendarFecha')
    calendarFecha: Calendar;
    @ViewChild('dt')
    dt: Table;

    constructor(
        private listaAuditoriaExternaService: ListaAuditoriaExternaService,
        private store: Store<StoreModel>
    ) {}

    ngOnInit() {
        this.getInitialInfo();
    }

    createAuditoria(data: {
        auditoria: AuditoriaExternaModel;
        idsLista: number[];
    }) {
        this.showWaitDialog(
            'Resgistrando nueva auditoria, un momento por favor...'
        );
        this.listaAuditoriaExternaService
            .createAuditoriaExterna(data)
            .subscribe(response => {
                this.dt.reset();
                this.hideWaitDialog();
            });
    }

    getInitialInfo() {
        this.listaAuditoriaExternaService
            .getInitialInfo()
            .subscribe(response => {
                this.auditores = response.auditores;
                this.listasPreguntas = response.listas_preguntas;
            });
    }

    hideWaitDialog() {
        this.store.dispatch(new fromShared.HideWaitDialog());
    }

    loadAuditoriasLazy(event) {
        this.loading = true;
        this.listaAuditoriaExternaService
            .getLazyAuditorias(event)
            .subscribe(response => {
                this.auditorias = response.data;
                this.totalRecords = response.totalRows;
                this.loading = false;
            });
    }

    onSelectFecha(event) {
        let inicio = new Date(1900, 1, 1).valueOf() / 1000;
        let fin = new Date(3000, 1, 1).valueOf() / 1000;

        if (this.calendarFecha.value[0]) {
            inicio = (this.calendarFecha.value[0] as Date).valueOf() / 1000;
        }

        if (this.calendarFecha.value[1]) {
            fin =
                (this.calendarFecha.value[1] as Date).valueOf() / 1000 +
                ((23 * 60 + 59) * 60 + 59);
        }

        this.dt.filter({ inicio, fin }, 'fecha', 'between');
    }

    searchProveedor(query: string) {
        this.listaAuditoriaExternaService
            .getFilteredProveedores({ query })
            .subscribe(response => (this.caed.filteredProveedores = response));
    }

    showWaitDialog(header: string, body?: string) {
        this.store.dispatch(new fromShared.ShowWaitDialog({ header, body }));
    }
}
