import { Component, Input } from '@angular/core';
import {  AccionCorrectivaEstadoModel } from '../../../shared/models/accion-correctiva-estado.model';

@Component({
    selector: "acciones-estados-lista",
    templateUrl: "acciones-estados-lista.component.html",
    styleUrls: ["acciones-estados-lista.component.scss"]
    
})
export class AccionesEstadosListaComponent {
    
    @Input()
    estados: AccionCorrectivaEstadoModel[];
}