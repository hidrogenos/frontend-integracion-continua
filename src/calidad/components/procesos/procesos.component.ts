import { Component, OnInit, Input } from '@angular/core';
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
                                    <div class="vertical-text btn-mapa" (click)="eventClickEditMapa()">{{ mapa.entrada }}</div>
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
                                    <div class="vertical-text-r btn-mapa" (click)="eventClickEditMapa()" >{{ mapa.salida }} </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    `
})
export class ProcesosComponent implements OnInit {
    //properties
    @Input()
    mapa: CalidadMapaProcesoModel;

    constructor() {}

    ngOnInit() {}
}
