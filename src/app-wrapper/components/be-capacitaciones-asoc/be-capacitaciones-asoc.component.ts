import { Component } from "@angular/core";
import { BeBandejaEntradaService } from "../../services";
import { CapacitacionModel } from "../../../shared/models/capacitacion.model";
import * as fromRoot from "./../../../app/store";
import { Store } from "@ngrx/store";
import { StoreModel } from "../../../shared/models/store.model";
import { environment } from "../../../environments/environment";

@Component({
    selector: "be-capacitaciones-asoc",
    template: `
    <div class="ui-g">
        <div class="ui-g-12">
            <div class="card card-w-title">
                <h1><i class="fa fa-users" aria-hidden="true"></i> Capacitaciones</h1>
                    <div class="ui-g">
                        <p-table [value]="capacitaciones" [lazy]="true" (onLazyLoad)="loadCapacitacionesLazy($event)" [paginator]="true" 
                                        [rows]="10" [totalRecords]="totalRecords" [loading]="loading" sortField="tema" #dt>
                                        <ng-template pTemplate="header" let-columns>
                                            <tr>
                                                <th style="width:50px">
                                                ver
                                                </th>
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
                                                <th>
                                                    Estado
                                                </th>
                                            </tr>
                                            <tr>
                                                <th>
                                                </th>
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
                                                <td style="text-align: center;">
                                                    <button style="margin-right: 10px;" pButton type="button" (click)="detailCapacitacion(capacitaciones)" icon="pi pi-search" class="ui-button-primary"></button>
                                                </td>
                                                <td>{{ capacitaciones.tema }}</td>
                                                <td>{{ capacitaciones.fecha_inicio | date : dateFormat }}</td>
                                                <td>{{ capacitaciones.fecha_fin | date : dateFormat  }}</td>
                                                <td>
                                                    <span *ngIf="capacitaciones.id_estado == 2">Cerrado</span>
                                                    <span *ngIf="capacitaciones.id_estado == 1">Abierto</span>
                                                    <span *ngIf="capacitaciones.id_estado != 1 && capacitaciones.id_estado !=2">Sin asignar</span>
                                                </td>
                                            </tr>
                                        </ng-template>
                                    </p-table>
                                </div>
                            </div>
                        </div>
                     </div>
`
})
export class BeCapacitacionesAsocComponent {
    constructor(
        private beBandejaEntradaService: BeBandejaEntradaService,
        private store: Store<StoreModel>
    ) {}

    //atributos
    loading: boolean = true;
    capacitaciones: CapacitacionModel[];
    totalRecords: number;
    dateFormat = environment.dateFormatAngular;

    loadCapacitacionesLazy(event) {
        this.loading = true;
        this.beBandejaEntradaService
            .getCapacitacionesLazyAsc(event)
            .subscribe(response => {
                this.capacitaciones = response.data;
                this.totalRecords = response.totalRows;
                this.loading = false;
                console.log(this.capacitaciones);
            });
    }
    detailCapacitacion(event: CapacitacionModel) {
        this.store.dispatch(
            new fromRoot.Go({
                path: [`capacitaciones/detalle/${event.id}`]
            })
        );
    }
}
