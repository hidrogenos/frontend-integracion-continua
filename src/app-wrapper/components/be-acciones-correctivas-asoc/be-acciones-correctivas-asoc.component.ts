import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { AccionCorrectivaModel } from "../../../shared/models/accion-correctiva.model";
import { BeBandejaEntradaService } from "../../services";
import { environment } from "../../../environments/environment.prod";

@Component({
    selector: "be-acciones-correctivas-asoc",
    template: `<div class="ui-g">
    <div class="ui-g-12">
        <div class="card card-w-title">
            <h1>Mis acciones correctivas asociadas</h1>
            <p-table #dt [columns]="cols" [value]="accionesCorrectivas" [lazy]="true" (onLazyLoad)="loadAccionesCorrectivasLazy($event)" [paginator]="true" 
                [rows]="10" [totalRecords]="total" lazyLoadOnInit="false" [loading]="loading">
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
                            <input pInputText type="text" (input)="dt.filter($event.target.value, col.field, col.filterMatchMode)">
                        </th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-rowData let-columns="columns">
                    <tr [pSelectableRow]="rowData">
                        <td>
                            <button pButton class="ui-button-rounded shadow-box ui-shadow-2" (click)="verDetalleAccionCorrectiva(rowData.id)"
                            [ngStyle]="{'background-color': rowData.accion_estado.color ,'border-radius': '100%'}">                
                            </button>
                        </td>
                        <td *ngFor="let col of columns" [ngSwitch]="col.field">
                            <span *ngSwitchCase="'accion_estado'">{{rowData.accion_estado?.nombre}}</span>
                            <span *ngSwitchCase="'importancia'">{{rowData.importancia?.nombre}}</span>
                            <span *ngSwitchCase="'responsable'">{{rowData.responsable?.nombre}}</span>
                            <span *ngSwitchCase="'fecha_creacion'">{{rowData[col.field] | date: angularFormatDate}}</span>
                            <span *ngSwitchCase="'fecha_compromiso'">{{rowData[col.field] | date: angularFormatDate}}</span>
                            <span *ngSwitchDefault>{{rowData[col.field]}}</span>
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    </div>
</div>`
})
export class BeAccionesCorrectivasAsocComponent {
    accionesCorrectivas: AccionCorrectivaModel[];
    total: number;
    cantidadXPagina: number = 10;
    angularFormatDate: string;
    loading: boolean = true;

    cols: any[] = [
        { field: "codigo", header: "Código" },
        { field: "accion_estado", header: "Estado" },
        { field: "titulo", header: "Titulo" },
        { field: "importancia", header: "Importancia" },
        { field: "responsable", header: "Responsable" },
        { field: "fecha_creacion", header: "Creación" },
        { field: "fecha_compromiso", header: "Fecha compromiso" }
    ];

    @Output()
    onSelectAccionCorrectiva: EventEmitter<number> = new EventEmitter<number>();

    constructor(private beBandejaEntradaService: BeBandejaEntradaService) {
        this.angularFormatDate = environment.dateFormatAngular;
    }

    loadAccionesCorrectivasLazy(event) {
        this.loading = true;
        this.beBandejaEntradaService
            .getAccionesCorrectivasAsoc(event)
            .subscribe((items: any) => {
                this.accionesCorrectivas = items.accionesCorrectivas;
                this.total = items.total;
                this.loading = false;
            });
    }

    verDetalleAccionCorrectiva(idAccionCorrectiva: number) {
        this.onSelectAccionCorrectiva.emit(idAccionCorrectiva);
    }
}
