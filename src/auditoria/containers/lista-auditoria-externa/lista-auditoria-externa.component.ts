import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateAuditoriaExternaDialogComponent } from '../../components';
import { ListaAuditoriaExternaService } from '../../services';
import { UsuarioModel } from '../../../shared/models/usuario.model';
import { ListaPreguntaModel } from '../../../shared/models/auditoria-lista.model';
import { AuditoriaExternaModel } from '../../../shared/models/auditoria-externa.model';
import { Calendar } from 'primeng/primeng';
import { Table } from 'primeng/table';
import * as fromShared from './../../../shared/store';
import * as fromRoot from './../../../app/store';
import { StoreModel } from '../../../shared/models/store.model';
import { Store } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { InformeService } from '../../../informes/services';
import { UsuarioService } from '../../../shared/services';

@Component({
    selector: 'lista-auditoria-externa',
    styleUrls: ['lista-auditoria-externa.component.scss'],
    template: `
        <div class="ui-g">
            <div class="ui-g-12">
                <div class="card card-w-title">
                    <h1>Auditorías a proveedores</h1>
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
                                        <th>
                                            Acciones
                                            
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>
                                            <input style="width: 100%;" pInputText type="number" (input)="dt.filter($event.target.value, 'id', 'contains')">
                                        </th>
                                        <th>
                                            <p-calendar  dateFormat="yy/mm/dd"  [locale] ="es" [inputStyle]="{'width': '100%'}" selectionMode="range" (onSelect)="onSelectFecha($event)" #calendarFecha></p-calendar>
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
                                        <th>
                                        </th>
                                    </tr>
                                </ng-template>
                                <ng-template pTemplate="body" let-auditoria>
                                    <tr>
                                        <td>{{ auditoria.id }}</td>
                                        <td>{{ auditoria.fecha | date: dateFormatAngular }}</td>
                                        <td>{{ auditoria.estado }}</td>
                                        <td>
                                            {{ auditoria.auditor_principal }}
                                            {{ auditoria.auditor_apoyo }}
                                        </td>
                                        <td>{{ auditoria.proveedor }}</td>
                                        <td [innerHTML]="auditoria.objetivo"></td>
                                        <td style="text-align: center;">
                                            <button pButton 
                                            style="margin-right: 5px;width: 25px; height:25px;"
                                            (click)="detalleAuditoria(auditoria.id, $event)"
                                                type="button" 
                                                icon="fa fa-search"
                                                class="ui-button-primary">
                                            </button> 
                                            <button pButton 
                                                style="margin-right: 5px;width: 25px; height:25px;"
                                                type="button" 
                                                (click)="onExportPDF2(auditoria.id)"  
                                                icon="fa fa-file-text-o" 
                                                class="ui-button-warning" >
                                            </button>
                                            <button pButton 
                                            style="margin-right: 5px;width: 25px; height:25px;"
                                            type="button" 
                                                (click)="onExportPDF(auditoria.id)"  
                                                icon="fa fa-file-text-o" 
                                                class="ui-button-success" >
                                            </button>
                                            <button pButton 
                                            style="margin-right: 5px;width: 25px; height:25px;"
                                                (click)="deleteAuditoria(auditoria.id)"
                                                type="button" 
                                                icon="fa fa-trash"
                                                class="ui-button-danger">
                                            </button> 
                                        </td>
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
    dateFormatAngular: string = environment.dateFormatAngular;
    es: any;

    //viewchild
    @ViewChild('caed')
    caed: CreateAuditoriaExternaDialogComponent;
    @ViewChild('calendarFecha')
    calendarFecha: Calendar;
    @ViewChild('dt')
    dt: Table;

    constructor(
        private listaAuditoriaExternaService: ListaAuditoriaExternaService,
        private store: Store<StoreModel>,
        private usuarioService: UsuarioService,
        private informeService: InformeService,

    ) {}

    ngOnInit() {
        this.getInitialInfo();
        this.es = environment.dateProperties.calendarProperties;
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

    deleteAuditoria(id: number) {
        this.showWaitDialog('Eliminando auditoria, un momento por favor...');
        this.listaAuditoriaExternaService
            .deleteAuditoria(id)
            .subscribe(response => {
                this.auditorias = this.auditorias.filter(
                    a => a.id != response.id
                );
                this.hideWaitDialog();
            });
    }

    detalleAuditoria(id: number, event: MouseEvent) {
        event.ctrlKey
        ? window.open(`${environment.baseUrl}/auditoria/externa/detalle/${id}`):
        this.store.dispatch(
            new fromRoot.Go({ path: [`auditoria/externa/detalle/${id}`] })
        );
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

     getUsuarios() {
        return this.usuarioService.getUsuarios();
    }

    onExportPDF(event) {
        this.showWaitDialog('Informes', 'Generando informe, un momento por favor...')
        this.informeService.exportPDFAuditoriaExterna(event,event.id).subscribe(response => {
            const blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
            this.hideWaitDialog();
        })
    }

    onExportPDF2(event) {
        this.showWaitDialog('Informes', 'Generando informe, un momento por favor...')
        this.informeService.exportPDF2AuditoriaExterna(event,event.id).subscribe(response => {
            const blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
            this.hideWaitDialog();
        })
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
