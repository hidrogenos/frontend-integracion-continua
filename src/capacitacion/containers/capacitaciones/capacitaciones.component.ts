import { OnInit, Component, ViewChild } from "@angular/core";
import { CreateCapacitacionDialogComponent } from "../../components";
import { CapacitacionesService } from "../../services/capacitaciones-service/capacitaciones.service";
import { MapaProcesoHijoModel } from "../../../shared/models/mapa_proceso_hijo.model";
import { CapacitacionModel } from "../../../shared/models/capacitacion.model";
import { Store } from "@ngrx/store";
import { StoreModel } from "../../../shared/models/store.model";
import { forkJoin } from "rxjs";
import * as fromAuth from "../../../auth/store";
import * as fromShared from "./../../../shared/store";
import { map } from "rxjs/operators";
import { DataTable } from "primeng/primeng";
import { environment } from "../../../environments/environment";
import * as fromRoot from "./../../../app/store";
import { CapacitacionesDetalleComponent } from "../capacitaciones-detalle/capacitaciones-detalle.component";
import { HasPermisionService } from "../../../shared/services";

@Component({
    selector: "capacitaciones",
    styleUrls: ["capacitaciones.component.scss"],
    template: `
    <div class="ui-g">
        <div class="ui-g-12">
            <div class="card card-w-title">
                <h1><i class="fa fa-graduation-cap" aria-hidden="true"></i> Capacitaciones</h1>
                    <div class="ui-g">
                        <div class="ui-g-12 text-aling-right">
                            <button pButton 
                                type="button"
                                *ngIf="hasPermision(801)|async" 
                                (click)="createCapacitacion.show()" 
                                label="Crear nueva capacitación" 
                                class="ui-button-success">
                            </button>
                        </div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-12 ui-fluid">
                            <p-table [value]="capacitaciones" [lazy]="true" (onLazyLoad)="loadCapacitacionesLazy($event)" [paginator]="true" 
                                [rows]="10" [totalRecords]="totalRecords" [loading]="loading" sortField="tema" #dt>
                                <ng-template pTemplate="header" let-columns>
                                    <tr>
                                        <th pSortableColumn="tema">
                                            Tema
                                            <p-sortIcon field="tema" ></p-sortIcon>
                                        </th>
                                        <th pSortableColumn="fecha_inicio">
                                            Fecha Inico
                                            <p-sortIcon field="fecha_inicio" ></p-sortIcon>
                                        </th>
                                        <th pSortableColumn="fecha_fin">
                                            Fecha Fin
                                            <p-sortIcon field="fecha_fin"></p-sortIcon>
                                        </th>
                                        <th rowspan="2">
                                            Acciones
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>
                                            <input pInputText type="text" (input)="dt.filter($event.target.value, 'tema', 'contains')">
                                        </th>
                                        <th>
                                            <input pInputText type="text" (input)="dt.filter($event.target.value, 'fecha_inicio', 'contains')">
                                        </th>
                                        <th>
                                            <input pInputText type="text" (input)="dt.filter($event.target.value, 'fecha_fin', 'contains')">
                                        </th>
                                    </tr>
                                </ng-template>
                                <ng-template pTemplate="body" let-capacitaciones>
                                    <tr>
                                        <td>{{ capacitaciones.tema }}</td>
                                        <td>{{ capacitaciones.fecha_inicio | date : dateFormat }}</td>
                                        <td>{{ capacitaciones.fecha_fin | date : dateFormat  }}</td>
                                        <td style="text-align: center;">
                                            <button style="margin-right: 10px;" *ngIf="hasPermision(802)|async" pButton type="button" (click)="detailCapacitacion(capacitaciones.id, $event)" icon="pi pi-search" class="ui-button-primary"></button>
                                            <button pButton type="button" *ngIf="hasPermision(803)|async" icon="pi pi-trash" (click)="onDeleteCapacitacion(capacitaciones)" class="ui-button-danger"></button>
                                        </td>
                                    </tr>
                                </ng-template>
                            </p-table>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <create-capacitacion-dialog #createCapacitacion
                [procesos]="procesos"
                (create)="oncreateCapacitacion($event)">
            </create-capacitacion-dialog>

`
})
export class CapacitacionesComponent implements OnInit {
    //atribuos
    fromAuth = fromAuth;
    loading: boolean = true;
    totalRecords: number;
    totalRows: number;
    dateFormat = environment.dateFormatAngular;

    @ViewChild("createCapacitacion")
    createCapacitacion: CreateCapacitacionDialogComponent;
    @ViewChild("dt")
    dt: DataTable;

    @ViewChild("detalleCapacitacion")
    detalleCapacitacion: CapacitacionesDetalleComponent;

    //listar
    procesos: MapaProcesoHijoModel[];

    capacitaciones: CapacitacionModel[];

    constructor(
        private capacitacionesService: CapacitacionesService,
        private hasPermisionService: HasPermisionService,
        private store: Store<StoreModel>
    ) {}

    ngOnInit() {
        this.loadInitData();
    }

    getProcesos() {
        return this.capacitacionesService.getProcesos();
    }

    getCapacitaciones() {
        return this.capacitacionesService.getCapacitaciones();
    }

    loadInitData() {
        this.showWaitDialog(
            "Consultando datos requeridos, un momento por favor..."
        );
        forkJoin([this.loadInitDataUno()]).subscribe(() =>
            this.hideWaitDialog()
        );
    }

    loadInitDataUno() {
        let aux = forkJoin([this.getCapacitaciones(), this.getProcesos()]);

        aux.subscribe(([capacitaciones, procesos]) => {
            this.capacitaciones = capacitaciones;
            this.procesos = procesos;
        });
        return aux;
    }

    loadCapacitacionesLazy(event) {
        this.showWaitDialog('Consultando datos requeridos, un momento por favor...')
        this.loading = true;
        this.capacitacionesService
            .getCapacitacionesLazy(event)
            .subscribe(response => {
                this.capacitaciones = response.data;
                this.totalRecords = response.totalRows;
                this.loading = false;
                this.hideWaitDialog();
            });
    }

    oncreateCapacitacion(data: CapacitacionModel) {
        this.showWaitDialog('Creando capacitación, un momento por favor...')
        this.store
            .select(this.fromAuth.getUser)
            .pipe(map(usuario => usuario.id))
            .subscribe(id => {
                data.id_usuario = id;
                this.capacitacionesService
                    .createCapacitacion(data)
                    .subscribe(response => {
                        this.capacitaciones = [
                            ...this.capacitaciones,
                            response
                        ];
                        this.hideWaitDialog();
                    });
            });
    }

    onDeleteCapacitacion(event: CapacitacionModel) {
        this.showWaitDialog('Eliminando capacitación, un momento por favor...')
        this.capacitacionesService.onEliminar(event).subscribe(() => {
            this.capacitaciones = this.capacitaciones.filter(
                (capacitaciones: CapacitacionModel) => {
                    return capacitaciones.id != event.id;
                }
            );
            this.hideWaitDialog();
        });
    }

    hideWaitDialog() {
        this.store.dispatch(new fromShared.HideWaitDialog());
    }

    showWaitDialog(header: string, body?: string) {
        this.store.dispatch(new fromShared.ShowWaitDialog({ header, body }));
    }

    detailCapacitacion(id: number, event: MouseEvent) {
        event.ctrlKey
        ? window.open(`/capacitaciones/detalle/${id}`):
        this.store.dispatch(
            new fromRoot.Go({
                path: [`capacitaciones/detalle/${id}`]
            })
        );
    }

    hasPermision(id: number) {
        return this.hasPermisionService.hasPermision(id);
    }
}
