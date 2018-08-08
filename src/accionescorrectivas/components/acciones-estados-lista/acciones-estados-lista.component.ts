import { Component, Input } from '@angular/core';
import { AccionEstadoModel } from '../../../shared/models/accion-estado.model';

@Component({
    selector: "acciones-estados-lista",
    templateUrl: "acciones-estados-lista.component.html",
    styleUrls: ["acciones-estados-lista.component.scss"]
    
})
export class AccionesEstadosListaComponent {
    
    @Input()
    estados: AccionEstadoModel[];
}