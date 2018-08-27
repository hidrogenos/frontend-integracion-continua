import { Component, Input, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AccionCorrectivaModel } from '../../../shared/models/accion-correctiva.model';

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
    onEdit: EventEmitter<AccionCorrectivaModel>;

    @Output()
    onDeleteAccionCorrectiva: EventEmitter<AccionCorrectivaModel>;

    @Input()
    cols: any[]

    constructor() {
        this.onLazy = new EventEmitter<any>();
        this.onEdit = new EventEmitter<AccionCorrectivaModel>();
        this.onDeleteAccionCorrectiva = new EventEmitter<AccionCorrectivaModel>();
    }

    loadLazy( event: Event)
    {
        this.onLazy.emit( event );
    }

    selectAccionCorrectiva(data: AccionCorrectivaModel) {
        this.onEdit.emit(data);
    }

    deleteAccionCorrectiva(data: AccionCorrectivaModel) {
        this.onDeleteAccionCorrectiva.emit(data);
    }
    
}