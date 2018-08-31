import { Component, Input, Output, EventEmitter } from "@angular/core";
import { environment } from "../../../environments/environment";
import { AccionPreventivaModel } from "../../../shared/models/accion-preventiva.model";

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
    onEdit: EventEmitter<AccionPreventivaModel>;

    @Output()
    onDeleteAccionPreventiva: EventEmitter<AccionPreventivaModel>;

    @Input()
    cols: any[];

    constructor() {
        this.onLazy = new EventEmitter<any>();
        this.onEdit = new EventEmitter<AccionPreventivaModel>();
        this.onDeleteAccionPreventiva = new EventEmitter<
            AccionPreventivaModel
        >();
    }

    loadLazy(event: Event) {
        this.onLazy.emit(event);
    }

    selectAccionPreventiva(data: AccionPreventivaModel) {
        this.onEdit.emit(data);
    }

    deleteAccionPreventiva(data: AccionPreventivaModel) {
        this.onDeleteAccionPreventiva.emit(data);
    }
}
