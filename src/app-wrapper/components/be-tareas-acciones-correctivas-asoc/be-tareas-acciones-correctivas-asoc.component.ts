import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { AccionCorrectivaModel } from "../../../shared/models/accion-correctiva.model";
import { BeBandejaEntradaService } from "../../services";
import { environment } from "../../../environments/environment.prod";
import { AccionCorrectivaTareaModel } from "../../../shared/models/accion-correctiva-tarea.model";

@Component({
    selector: "be-tareas-acciones-correctivas-asoc",
    template: `<div class="ui-g">
    <div class="ui-g-12">
        <div class="card card-w-title">
            <h1>Mis tareas de desviciones</h1>
            <p-table #dt [columns]="cols" [value]="tareasAccionesCorrectivas" [lazy]="true" (onLazyLoad)="loadTareasAccionesCorrectivasLazy($event)" [paginator]="true"
                [rows]="10" [totalRecords]="total" lazyLoadOnInit="false" [loading]="loading">
                <ng-template pTemplate="header" let-columns>
                    <tr>
                        <th style="width:50px" rowspan="2">Ver</th>
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
                            <button *ngIf="!rowData.realizada" pButton class="ui-button-success" icon="pi pi-check" (click)="verDetalleTareaAccionCorrectiva(rowData)">
                            </button>
                            <button *ngIf="rowData.realizada" pButton class="ui-button" icon="pi pi-search" (click)="verDetalleTareaAccionCorrectiva(rowData)">
                            </button>
                        </td>
                        <td *ngFor="let col of columns" [ngSwitch]="col.field">
                            <span *ngSwitchCase="'fecha_cumplimiento'">{{rowData[col.field] | date: angularFormatDate}}</span>
                            <span *ngSwitchDefault>{{rowData[col.field]}}</span>
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    </div>
</div>`
})
export class BeTareasAccionesCorrectivasAsocComponent {
    tareasAccionesCorrectivas: AccionCorrectivaTareaModel[];
    total: number;
    cantidadXPagina: number = 10;
    angularFormatDate: string;
    loading: boolean = true;

    cols: any[] = [
        { field: "prioridad", header: "Prioridad" },
        { field: "tarea", header: "Tarea" },
        { field: "responsables_terceros", header: "Responsables terceros" },
        { field: "fecha_cumplimiento", header: "Fecha cumplimiento" }
    ];

    @Output()
    onSelectTareaAccionCorrectiva: EventEmitter<
        AccionCorrectivaTareaModel
    > = new EventEmitter<AccionCorrectivaTareaModel>();

    constructor(private beBandejaEntradaService: BeBandejaEntradaService) {
        this.angularFormatDate = environment.dateFormatAngular;
    }

    loadTareasAccionesCorrectivasLazy(event) {
        this.loading = true;
        this.beBandejaEntradaService
            .getTareasAccionesCorrectivasAsoc(event)
            .subscribe((items: any) => {
                this.tareasAccionesCorrectivas =
                    items.tareasAccionesCorrectivas;
                this.total = items.total;
                this.loading = false;
            });
    }

    verDetalleTareaAccionCorrectiva(accionCorrectivaTarea) {
        this.onSelectTareaAccionCorrectiva.emit(accionCorrectivaTarea);
    }
}
