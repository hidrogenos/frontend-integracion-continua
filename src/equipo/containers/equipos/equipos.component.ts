import { Component, OnInit, ViewChild } from '@angular/core';

//MODEL
import { EquipoModel } from '../../../shared/models/equipo.model';
import { ProveedorModel } from '../../../shared/models/proveedor.model';

//SERVICE
import { EquipoCustomService } from '../../../equipo/services/equipo.service';
import { EquipoService } from '../../../shared/services/equipo/equipo.service';
import { HasPermisionService } from '../../../shared/services';
import { ProveedorListaService } from '../../../proveedor/services/proveedor-lista/proveedor-lista.service';
import { ProveedorService } from '../../../shared/services';

//COMPONENT
import { CreateEquipoComponent } from '../../components/create-equipo/create-equipo.component';

//STORE
import * as fromShared from './../../../shared/store';
import * as fromRoot from './../../../app/store';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { forkJoin } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Table } from 'primeng/table';

@Component({
    selector: 'equipo',
    template: `
    <div class="ui-g">
        <div class="ui-g-12">
            <div class="card card-w-title">
                <h1><i class="fa fa-users" aria-hidden="true"></i> Equipos</h1>
                <div class="ui-g">
                    <div class="ui-g-12 text-aling-right">
                        <button pButton type="button" (click)="showCreateNewEquipo()" label="Crear nuevo equipo"  *ngIf="hasPermision([701]) | async" class="ui-button-success"></button>
                    </div>
                </div>
                <div class="ui-g">
                    <div class="ui-g-12 ui-fluid">
                        <p-table [value]="equipos" [lazy]="true"  [paginator]="true" (onLazyLoad)="loadEquiposLazy($event)"
                        [rows]="10" [totalRecords]="totalRecords" [loading]="loading" sortField="nombre" #dt>
                            <ng-template pTemplate="header" let-columns>
                                <tr>
                                    <th style="width:8%" pSortableColumn="id">
                                        Cod.
                                    <p-sortIcon field="id" ></p-sortIcon>
                                </th>
                                    <th pSortableColumn="nombre">
                                        Nombre
                                        <p-sortIcon field="nombre" ></p-sortIcon>
                                    </th>
                                    <th pSortableColumn="serial">
                                        Serial
                                        <p-sortIcon field="serial" ></p-sortIcon>
                                    </th>
                                    <th pSortableColumn="fecha_proxima_calibracion">
                                        Proxima calibración
                                        <p-sortIcon field="fecha_proxima_calibracion"></p-sortIcon>
                                    </th>
                                    <th pSortableColumn="fecha_proxima_calificacion">
                                        Proxima calificación 
                                        <p-sortIcon field="fecha_proxima_calificacion" ></p-sortIcon>
                                    </th>
                                    <th pSortableColumn="fecha_proxima_metrologia">
                                        Proxima Metrología 
                                        <p-sortIcon  field="fecha_proxima_metrologia" ></p-sortIcon>
                                    </th>
                                     <th pSortableColumn="fecha_proximo_mantenimiento_correctivo">
                                        Proximo mto correctivo 
                                        <p-sortIcon field="fecha_proximo_mantenimiento_correctivo" ></p-sortIcon>
                                    </th>
                                    <th pSortableColumn="fecha_proximo_mantenimiento_preventivo">
                                        Proximo mto preventivo 
                                        <p-sortIcon field="fecha_proximo_mantenimiento_preventivo" ></p-sortIcon>
                                    </th>
                                   
                                    <th rowspan="2">
                                        Acciones
                                    </th>
                                </tr>
                                <tr>
                                    <th>
                                        <input pInputText type="text" (input)="dt.filter($event.target.value, 'id', 'contains')">
                                    </th>
                                    <th>
                                        <input pInputText type="text" (input)="dt.filter($event.target.value, 'nombre', 'contains')">
                                    </th>
                                    <th>
                                        <input pInputText type="text" (input)="dt.filter($event.target.value, 'serial', 'contains')">
                                    </th>
                                    <th>
                                        <input pInputText type="text" (input)="dt.filter($event.target.value, 'fecha_proxima_calibracion', 'contains')">
                                    </th>
                                    <th>
                                        <input pInputText type="text" (input)="dt.filter($event.target.value, 'fecha_proxima_calificacion', 'contains')">
                                    </th>
                                    <th>
                                        <input pInputText type="text" (input)="dt.filter($event.target.value, 'fecha_proxima_metrologia', 'contains')">
                                    </th>
                                   
                                    <th>
                                        <input pInputText type="text" (input)="dt.filter($event.target.value, 'fecha_proximo_mantenimiento_correctivo', 'contains')">
                                    </th>
                                     <th>
                                        <input pInputText type="text" (input)="dt.filter($event.target.value, 'fecha_proximo_mantenimiento_preventivo', 'contains')">
                                    </th>
                                </tr>
                            </ng-template>
                            <ng-template pTemplate="body" let-equipos>
                                <tr>
                                    <td>{{ equipos.id  }} </td>
                                    <td>{{ equipos.nombre }}</td>
                                    <td>{{ equipos.serial }}</td>
                                    <td>{{ equipos.fecha_proxima_calibracion | date: formatDate }}</td>
                                    <td>{{ equipos.fecha_proxima_calificacion | date: formatDate  }}</td>
                                    <td>{{ equipos.fecha_proxima_metrologia | date: formatDate }} </td>
                                    <td>{{ equipos.fecha_proximo_mantenimiento_preventivo | date: formatDate }}</td>
                                    <td>{{ equipos.fecha_proximo_mantenimiento_correctivo | date: formatDate}}</td>

                                    <td style="text-align: center;">
                                        <button style="margin-right: 10px;" pButton type="button" (click)="detalleEquipo(equipos)" icon="pi pi-search" class="ui-button-primary"></button>
                                        <button pButton type="button" icon="pi pi-trash"  *ngIf="hasPermision([702]) | async" (click)="deleteProveedor(equipos)" class="ui-button-danger"></button>
                                    </td>
                                </tr>
                            </ng-template>
                        </p-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <create-equipo #ce
        [proveedores]="proveedores"
        (onCreateEquipo)="createEquipo($event)">
    </create-equipo>
    `
})
export class EquipoComponent implements OnInit {

    //atributos
    proveedores: ProveedorModel[];
    equipos: EquipoModel[];
    formatDate: string;
    totalRecords: number;
    event: any;
    loading: boolean = true;

    @ViewChild('ce') ce: CreateEquipoComponent;
    @ViewChild('dt') dt: Table;

    ngOnInit() {
        this.getInitialData();
    }

    constructor(
        private equipoService: EquipoService,
        private proveedorService: ProveedorService,
        private equipoCustomService: EquipoCustomService,
        private store: Store<StoreModel>,
        private hasPermisionService: HasPermisionService
    ) {
        this.formatDate = environment.dateFormatAngular;
    }

    createEquipo(equipo: EquipoModel) {
        this.showWaitDialog('Instalando equipo, un momento por favor...');
        this.equipoService
            .createEquipo(equipo)
            .subscribe(response => {
                this.dt.reset();
                this.hideWaitDialog();
            });
    }

    deleteProveedor(event: EquipoModel) {
        console.log(event);
        this.equipoCustomService
            .getEliminarEquipo(event)
            .subscribe((data: any) => {
                this.dt.reset();
            });
    }

    detalleEquipo(item) {
        this.store.dispatch(
            new fromRoot.Go({
                path: [`equipos/detalle/${item.id}`]
            })
        );
    }

    getInitialData() {
        this.showWaitDialog("Consultando equipos, un momento por favor...");
        forkJoin(
            this.getProveedores()
        ).subscribe(([proveedores]) => {
            this.proveedores = proveedores;
        })
        this.hideWaitDialog();
    }

    getProveedores() {
        return this.proveedorService.getProveedores();
    }
    
    hasPermision(requiredPermisions) {
        return this.hasPermisionService.hasPermision(requiredPermisions);
    }

    hideWaitDialog() {
        this.store.dispatch(new fromShared.HideWaitDialog());
    }

    loadEquiposLazy(event) {
        this.loading = true;
        this.equipoCustomService
            .getEquiposLazy(event)
            .subscribe((items: any) => {
                console.log("HI",items)
                this.equipos = items.equipos.filter(equipo => {
                    return equipo.activo == true;
                });
                this.totalRecords = items.totalRecords;
                this.loading = false;

            });
    }

    showWaitDialog(header: string, body?: string) {
        this.store.dispatch(new fromShared.ShowWaitDialog({ header, body }));
    }

    showCreateNewEquipo() {
        this.ce.show();
    }
}