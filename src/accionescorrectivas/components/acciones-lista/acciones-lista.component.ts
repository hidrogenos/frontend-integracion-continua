import { Component, Input, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AccionModel } from '../../../shared/models/accion.model';

@Component({
    selector: "acciones-lista",
    templateUrl: "acciones-lista.component.html",
    styleUrls: ["acciones-lista.component.scss"]
})
export class AccionesListaComponent {

    //atributos
    dateFormatAngular: string = environment.dateFormatAngular;
    
    @Input()
    data: any[];

    @Input()
    rows: number;

    @Input()
    loading: boolean;

    @Input()
    cantidadTotalAcciones;

    @Output()
    onLazy: EventEmitter<any>;

    @Output()
    onEdit: EventEmitter<AccionModel>;

    @Input()
    cols: any[]

    constructor() {
        this.onLazy = new EventEmitter();
        this.onEdit = new EventEmitter();
    }

    loadLazy( event: Event)
    {
        this.onLazy.emit( event );
    }

    selectAccionCorrectiva(data: AccionModel) {
        this.onEdit.emit(data);
    }
    
}