import { Component, OnInit, ViewChild } from '@angular/core';
import { ProveedorListaService } from '../../services';
import { ProveedorModel } from '../../../shared/models/proveedor.model';
import { CreateProveedorDialogComponent } from '../../components';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import * as fromShared from './../../../shared/store';
import { forkJoin } from 'rxjs';
import { DataTable } from 'primeng/primeng';
import { ProveedorService } from '../../../shared/services';
import * as fromRoot from './../../../app/store';

@Component({
    selector: 'proveedores',
    styleUrls: ['proveedores.component.scss'],
    template: `
        <div class="ui-g">
            <div class="ui-g-12">
                <div class="card card-w-title">
                    <h1><i class="fa fa-users" aria-hidden="true"></i> Proveedores</h1>
                    <div class="ui-g">
                        <div class="ui-g-12 text-aling-right">
                            <button pButton type="button" (click)="createProveedor.show()" label="Crear nuevo Proveedor" class="ui-button-success"></button>
                        </div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-12 ui-fluid">
                            <p-table [value]="proveedores" [lazy]="true" (onLazyLoad)="loadProveedoresLazy($event)" [paginator]="true" 
                                [rows]="10" [totalRecords]="totalRecords" [loading]="loading" sortField="nombre" #dt>
                                <ng-template pTemplate="header" let-columns>
                                    <tr>
                                        <th pSortableColumn="nombre">
                                            Nombre
                                            <p-sortIcon field="nombre" ></p-sortIcon>
                                        </th>
                                        <th pSortableColumn="actividad">
                                            Actividad
                                            <p-sortIcon field="actividad" ></p-sortIcon>
                                        </th>
                                        <th pSortableColumn="direccion">
                                            Direccion
                                            <p-sortIcon field="direciion"></p-sortIcon>
                                        </th>
                                        <th pSortableColumn="tel1">
                                            Telefono 
                                            <p-sortIcon field="tel1" ></p-sortIcon>
                                        </th>
                                        <th>
                                            Acciones
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>
                                            <input pInputText type="text" (input)="dt.filter($event.target.value, 'nombre', 'contains')">
                                        </th>
                                        <th>
                                            <input pInputText type="text" (input)="dt.filter($event.target.value, 'actividad', 'contains')">
                                        </th>
                                        <th>
                                            <input pInputText type="text" (input)="dt.filter($event.target.value, 'direccion', 'contains')">
                                        </th>
                                        <th>
                                            <input pInputText type="text" (input)="dt.filter($event.target.value, 'tel1', 'contains')">
                                        </th>
                                        <th>
                                        </th>
                                    </tr>
                                </ng-template>
                                <ng-template pTemplate="body" let-proveedores>
                                    <tr>
                                        <td>{{ proveedores.nombre }}</td>
                                        <td>{{ proveedores.actividad }}</td>
                                        <td>{{ proveedores.direccion }}</td>
                                        <td>{{ proveedores.tel1 }}</td>
                                        <td style="text-align: center;">
                                            <button style="margin-right: 10px;" pButton type="button" (click)="detalleProveedor(proveedores)" icon="pi pi-search" class="ui-button-primary"></button>
                                            <button pButton type="button" icon="pi pi-trash" (click)="deleteProveedor(proveedores)" class="ui-button-danger"></button>
                                        </td>
                                    </tr>
                                </ng-template>
                            </p-table>
                        </div>
                    </div>
                </div>
            </div>
            <create-proveedor-dialog #createProveedor
            (create)="onCreate($event)">
            </create-proveedor-dialog>
        </div>
    `
})
export class ProveedoresComponent implements OnInit {
    //atributos
    loading: boolean = true;
    proveedores: ProveedorModel[];
    totalRecords: number;

    //properties
    constructor(
        private proveedorListaService: ProveedorListaService,
        private proveedorService: ProveedorService,
        private store: Store<StoreModel>
    ) {}

    //viewchild
    @ViewChild('createProveedor')
    createProveedor: CreateProveedorDialogComponent;
    @ViewChild('detallesProveeddor')
    detallesProveeddor: ProveedorService;
    @ViewChild('dt')
    dt: DataTable;

    ngOnInit() {
        this.loadInitData();
    }

    detalleProveedor(event: ProveedorModel) {
        this.store.dispatch(
            new fromRoot.Go({
                path: [`proveedores/detalle/${event.id}`]
            })
        );
    }

    deleteProveedor(event: ProveedorModel) {
        console.log(event);
        this.proveedorListaService
            .onEliminar(event)
            .subscribe((data: ProveedorModel) => {
                this.proveedores = this.proveedores.filter(
                    (proveedor: ProveedorModel) => {
                        return proveedor.id != event.id;
                    }
                );
            });
    }

    getProveedores() {
        return this.proveedorListaService.getProveedores();
    }

    hideWaitDialog() {
        this.store.dispatch(new fromShared.HideWaitDialog());
    }

    loadInitData() {
        this.showWaitDialog(
            'Consultando datos requeridos, un momento por favor...'
        );
        forkJoin([this.loadInitDataUno()]).subscribe(() =>
            this.hideWaitDialog()
        );
    }

    loadInitDataUno() {
        let aux = forkJoin([this.getProveedores()]);

        aux.subscribe(([proveedores]) => {
            this.proveedores = proveedores;
        });
        return aux;
    }

    loadProveedoresLazy(event) {
        this.loading = true;
        this.proveedorListaService
            .getProveedoresLazy(event)
            .subscribe(response => {
                this.proveedores = response.data;
                this.totalRecords = response.totalRows;
                this.loading = false;
            });
    }

    onCreate($event) {
        this.proveedorService.createProveedor($event).subscribe(response => {
            this.proveedores = [...this.proveedores, response];
        });
    }

    showWaitDialog(header: string, body?: string) {
        this.store.dispatch(new fromShared.ShowWaitDialog({ header, body }));
    }
}
