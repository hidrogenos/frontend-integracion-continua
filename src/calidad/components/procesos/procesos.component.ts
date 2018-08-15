import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CalidadMapaProcesoModel } from '../../../shared/models/calidad-mapa-proceso.model';

@Component({
    selector: 'procesos',
    styleUrls: ['procesos.component.scss'],
    template: `
        <div class="ui-g">
            <div class="ui-g-12">
                <div class="card card-w-title">
                    <div class="ui-g">
                        <div class="ui-g-12" style="text-align: center;">
                            <h1 style="color: #337ab7;">Mapa de procesos</h1>
                        </div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-12" style="text-align: center;">
                            <div class="mapa">
                                <div class="mapa-entrada">
                                    <div class="vertical-text btn-mapa" (click)="empd.showDialog()">{{ mapa.entrada }}</div>
                                </div>
                                <div class="mapa-procesos">
                                    <div class="chart-contenedor">
                                        <ng-template ngFor let-item [ngForOf]="mapa.procesos" let-elementIndex="index" > 
                                            <div *ngIf = "item.id_padre == 0" >                 
                                                <div class="mapa-proceso-titulo">{{item.proceso}}</div>
                                                
                                                <div class="mapa-separator"><br></div>
                                            
                                                <ng-template ngFor let-minitem [ngForOf]="mapa.procesos" let-minielementIndex="index" >                                   
                                                    <div *ngIf = "minitem.id_padre == item.id" (click)="eventClickEditMapaProceso(minitem)" class="proceso" >
                                                        <div class="btn-mapa-proceso">{{ minitem.proceso }}</div>
                                                        <img *ngIf = "minitem.flecha == 'der'" src="assets/soulsystem/flechader.png" alt="" class="flecha-der">
                                                        <img *ngIf = "minitem.flecha == 'izq'" src="assets/soulsystem/flechaizq2.png" alt="" class="flecha-izq">
                                                        <img *ngIf = "minitem.flecha == 'dos'" src="assets/soulsystem/flechados.png" alt="" class="fecha-dos">
                                                    </div>  
                                                </ng-template>
                                                <div class="mapa-separator"><br></div>
                                                
                                            </div>                      
                                                    
                                        </ng-template>
                                    </div>
                                </div>
                                <div class="mapa-salida">
                                    <div class="vertical-text-r btn-mapa" (click)="empd.showDialog()" >{{ mapa.salida }} </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-12 text-aling-right">
                            <button style="margin-right:10px;" pButton 
                                type="button" 
                                label="Crear nuevo proceso" 
                                class="ui-button-primary"
                                (click)="cpd.display = true">
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        <edit-mapa-procesos-dialog #empd
            [mapa]="mapa"
            (onUpdateMapaProcesos)="onUpdateMapaProcesos.emit($event)">
        </edit-mapa-procesos-dialog>
        <create-proceso-dialog #cpd
            [procesos]="mapa.procesos">
        </create-proceso-dialog>
    `
})
export class ProcesosComponent implements OnInit {
    //properties
    @Input()
    mapa: CalidadMapaProcesoModel;

    //events
    @Output()
    onUpdateMapaProcesos = new EventEmitter<{
        entrada: string;
        salida: string;
    }>();

    constructor() {}

    ngOnInit() {}
}
