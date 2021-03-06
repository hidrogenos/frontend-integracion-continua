import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CalidadMapaProcesoModel } from '../../../shared/models/calidad-mapa-proceso.model';
import { MapaProcesoHijoModel } from '../../../shared/models/mapa_proceso_hijo.model';

@Component({
    selector: 'usuario-procesos',
    styleUrls: ['usuario-procesos.component.scss'],
    template: `
        <div class="ui-g" *ngIf="permisoRelacionaroceso">
            <div class="ui-g-4 ui-fluid">
                <p-multiSelect [options]="procesos" [(ngModel)]="selectedProcesos" optionLabel="proceso" defaultLabel="Seleccione..."></p-multiSelect>
            </div>
            <div class="ui-g-4 ui-fluid">
                <button pButton 
                    type="button" 
                    label="Relacionar procesos" 
                    class="ui-button-primary"
                    (click)="relacionarProcesos()">
                </button>
            </div>
        </div>
        <div class="ui-g">
            <div class="ui-g-12 ui-fluid">
                <p-table [value]="usuarioProcesos">
                    <ng-template pTemplate="header">
                        <tr>
                            <th>Proceso</th>
                            <th>Acciones</th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-usuarioProceso>
                        <tr>
                            <td>{{ usuarioProceso.proceso }}</td>
                            <td>
                                <button pButton 
                                    *ngIf="permisoBorrarProceso"
                                    type="button" 
                                    icon="fa fa-trash" 
                                    class="ui-button-danger"
                                    (click)="onDeleteUsuarioProceso.emit(usuarioProceso)">
                                </button>
                            </td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </div>
    `
})
export class UsuarioProcesosComponent {
    //atributos

    selectedProcesos: MapaProcesoHijoModel[];

    //events
    @Output()
    onDeleteUsuarioProceso = new EventEmitter<MapaProcesoHijoModel>();
    @Output()
    onRelacionarProcesos = new EventEmitter<MapaProcesoHijoModel[]>();
    

    //properties
    @Input()
    procesos: MapaProcesoHijoModel[];
    @Input()
    usuarioProcesos: MapaProcesoHijoModel[];
    @Input()
    permisoRelacionaroceso: boolean;
    @Input()
    permisoBorrarProceso: boolean;
    
    constructor() {}

    relacionarProcesos() { 
        let procesosNoRepetidos = this.selectedProcesos.filter(selectedProceso => {
            const procesoBuscado = this.usuarioProcesos.find(usuarioProceso => usuarioProceso.id == selectedProceso.id);
            if(!procesoBuscado){
                return selectedProceso;
            }
        } );
        this.onRelacionarProcesos.emit(procesosNoRepetidos);
    }
}
