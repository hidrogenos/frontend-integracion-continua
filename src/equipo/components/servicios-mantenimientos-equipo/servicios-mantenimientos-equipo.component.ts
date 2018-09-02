import {
    Component,
    ViewChild,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import { CreateDocumentoEquipoComponent } from '../create-documento-equipo/create-documento-equipo.component';
import { CreateServiciosMantenimientosEquipoComponent } from '../create-servicios-mantenimientos-equipo/create-servicios-mantenimientos-equipo.component';
import { EquipoServicioMantenimientoModel } from '../../../shared/models/equipoServicioMantenimiento.model';
import { EquipoModel } from '../../../shared/models/equipo.model';
import { ProveedorModel } from '../../../shared/models/proveedor.model';
import { TipoServicioModel } from '../../../shared/models/tipoServicio.model';
import { DataTable } from 'primeng/primeng';
import { EditServiciosMantenimientosEquipoComponent } from '../../components/edit-servicios-mantenimientos-equipo/edit-servicios-mantenimientos-equipo.component';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'servicios-mantenimientos-equipo',
    template: `
    <div class="ui-g">
    <div class="ui-g-12">
        <div class="card card-w-title">
            <div class="ui-g">
                <div class="ui-g-12 text-aling-right">
                    <button pButton type="button" *ngIf="canEditPermisionsCrearServicioMantenimiento" (click)="showCreateServicio()" label="Crear nuevo servicio o mantenimiento" class="ui-button-success"></button>
                </div>
            </div>
            <div class="ui-g">
                <div class="ui-g-12 ui-fluid">
                    <p-table [value]="servicios" [lazy]="true"  [paginator]="true" (onLazyLoad)="loadLazyEquipoServicio($event)"
                    [rows]="10" [totalRecords]="totalRecords" sortField="nombre" #dt1>
                        <ng-template pTemplate="header" let-columns>
                            <tr>
                                <th  pSortableColumn="fecha_servicio">
                                    Fecha de servicio.
                                <p-sortIcon field="fecha_servicio" ></p-sortIcon>
                            </th>
                                <th pSortableColumn="fecha_proximo_servicio">
                                    Proximo servicio
                                    <p-sortIcon field="fecha_proximo_servicio" ></p-sortIcon>
                                </th>
                                <th pSortableColumn="proveedor.nombre">
                                    Proveedor
                                    <p-sortIcon field="proveedor.nombre" ></p-sortIcon>
                                </th>
                                <th pSortableColumn="tipo_servicio.nombre">
                                    Tipo de servicio
                                    <p-sortIcon field="tipo_servicio.nombre"></p-sortIcon>
                                </th>
                                <th pSortableColumn="descripcion">
                                    Descripción 
                                    <p-sortIcon field="descripcion" ></p-sortIcon>
                                </th>
                              
                                <th rowspan="2">
                                    Acciones
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <input pInputText type="text" (input)="dt1.filter($event.target.value, 'fecha_servicio', 'contains')">
                                </th>
                                <th>
                                    <input pInputText type="text" (input)="dt1.filter($event.target.value, 'fecha_proximo_servicio', 'contains')">
                                </th>
                                <th>
                                    <input pInputText type="text" (input)="dt1.filter($event.target.value, 'proveedor.nombre', 'contains')">
                                </th>
                                <th>
                                    <input pInputText type="text" (input)="dt1.filter($event.target.value, 'tipo_servicio.nombre', 'contains')">
                                </th>
                                <th>
                                    <input pInputText type="text" (input)="dt1.filter($event.target.value, 'descripcion', 'contains')">
                                </th>
                            </tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-servicio>
                            <tr>
                                <td>{{ servicio.fecha_servicio  | date: formatDate}}</td>
                                <td>{{ servicio.fecha_proximo_servicio  | date: formatDate}}</td>
                                <td>{{ servicio.proveedor.nombre }}</td>
                                <td>{{ servicio.tipo_de_servicio.nombre}}</td>
                                <td>{{ servicio.descripcion }}</td>
                                <td style="text-align: center;">
                                    <button style="margin-right: 10px;"*ngIf="canEditPermisionsEditarServicioMantenimiento" pButton type="button" (click)="showEditServicio(servicio)" icon="pi pi-search" class="ui-button-primary"></button>
                                    <button pButton type="button" *ngIf="canEditPermisionsEliminarServicioMantenimiento" icon="pi pi-trash" (click)="deleteEquipoServicio(servicio)" class="ui-button-danger"></button>
                                </td>
                            </tr>
                        </ng-template>
                    </p-table>
                </div>
            </div>
        </div>
    </div>
</div>
<create-servicios-mantenimientos-equipo #csme
    [proveedores]="proveedoresCreate"
    [tipos_servicio]="tipos_servicioCreate"
    (onCreateServicioMantenimientoEquipo)="onCreateServicioMantenimientoEquipo.emit($event)">
</create-servicios-mantenimientos-equipo>
<Edit-servicios-mantenimientos-equipo #esme
    [proveedores]="proveedoresEdit"
    [tipos_servicio]="tipos_servicioEdit"
    (onEditServicioMantenimientoEquipo)="onEditServicioMantenimientoEquipo.emit($event)">
</Edit-servicios-mantenimientos-equipo>
    `
})
export class ServiciosMantenimientosEquipoComponent {
    formatDate: string;
    totalRecords: number;

    @Input()
    servicios: EquipoServicioMantenimientoModel[];
    @Input()
    proveedoresCreate: ProveedorModel;
    @Input()
    tipos_servicioCreate: TipoServicioModel;
    @Input()
    proveedoresEdit: ProveedorModel;
    @Input()
    tipos_servicioEdit: TipoServicioModel;
    @Input()
    canEditPermisionsCrearServicioMantenimiento: boolean;
    @Input()
    canEditPermisionsEditarServicioMantenimiento: boolean;
    @Input()
    canEditPermisionsEliminarServicioMantenimiento: boolean;

    @Output()
    onChangeFilterEquipos = new EventEmitter<any>();
    @Output()
    onLoadLazy = new EventEmitter<EquipoServicioMantenimientoModel>();
    @Output()
    onDeleteEquipos = new EventEmitter<any>();
    @Output()
    onCreateServicioMantenimientoEquipo = new EventEmitter<any>();
    @Output()
    onEditServicioMantenimientoEquipo = new EventEmitter<any>();

    @ViewChild('csme')
    csme: CreateServiciosMantenimientosEquipoComponent;
    @ViewChild('esme')
    esme: EditServiciosMantenimientosEquipoComponent;

    @ViewChild('dt1')
    dt1: DataTable;

    constructor() {
        this.formatDate = environment.dateFormatAngular;
    }

    showCreateServicio() {
        this.csme.show();
    }

    showEditServicio(servicio) {
        console.log(servicio);
        this.esme.loadFormData(servicio);
        this.esme.show();
    }

    loadLazyEquipoServicio(event) {
        this.onChangeFilterEquipos.emit(event);
    }

    deleteEquipoServicio(event) {
        console.log(event);
        this.onDeleteEquipos.emit(event);
    }
}
