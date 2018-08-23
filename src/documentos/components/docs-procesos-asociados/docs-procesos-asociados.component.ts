import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MapaProcesoHijoModel } from '../../../shared/models/mapa_proceso_hijo.model';

@Component({
    selector: 'docs-procesos-asociados',
    template: `
    <div>
        <div class="ui-g">
            <h2>Procesos</h2>
        </div>
        <div class="ui-g">
            <div class="ui-g-9 ui-fluid">
                <p-dropdown 
                    [options]="procesos"
                    [(ngModel)]="selectedProceso"
                    optionLabel="proceso"
                    [autoWidth]="false"
                    filter="true"
                    placeholder="Seleccione...">
                </p-dropdown>
            </div>
            <div class="ui-g-3 text-aling-right">
                <button pButton type="button" label="Relacionar proceso" (click)="relacionarProceso()"
                [disabled]="!selectedProceso"></button>
            </div>
        </div>
        <div class="ui-g">
            <div class="ui-g-12">
                <p-table [value]="procesosDocumento" [paginator]="true" [rows]="10">
                    <ng-template pTemplate="header">
                        <tr>
                            <th>Proceso</th>
                            <th style="width: 10%;"></th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-proceso>
                        <tr>
                            <td>{{proceso.proceso}}</td>
                            <td style="text-align: center;">
                                <button pButton type="button" icon="pi pi-trash" 
                                class="ui-button-danger" (click)="deleteProcesoFromDocumento(proceso)"></button>
                            </td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </div>
    </div>
    `
})
export class DocsProcesosAsociadosComponent {

    @Input()
    procesos: MapaProcesoHijoModel[];

    @Input()
    procesosDocumento: MapaProcesoHijoModel[];

    @Output()
    onDeleteProceso = new EventEmitter<number>();

    @Output()
    onAsociarProceso = new EventEmitter<MapaProcesoHijoModel>();

    selectedProceso: MapaProcesoHijoModel = null;

    constructor() {
    }

    deleteProcesoFromDocumento(proceso) {
        this.onDeleteProceso.emit(proceso.pivot.id);
    }

    relacionarProceso() {
        this.onAsociarProceso.emit(this.selectedProceso);
    }
}