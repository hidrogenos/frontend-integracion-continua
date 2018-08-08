import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AccionProcesoModel } from "../../../shared/models/accion-proceso.model";
import { MapaProcesoHijoModel } from "../../../shared/models/mapa_proceso_hijo.model";

@Component({
    selector: "relacionar-proceso",
    templateUrl: "relacionar-proceso.component.html"
})
export class RelacionarProcesoComponent {

    @Input()
    procesos: MapaProcesoHijoModel[];

    /** 
     * @var data Procesos de una acción correctiva 
     */
    @Input()
    data: AccionProcesoModel[];

    @Input()
    loadingProcesos: boolean;

    @Input()
    cols: any[];

    @Input()
    rows: number;

    @Output()
    onRelateProceso: EventEmitter<MapaProcesoHijoModel[]> = new EventEmitter<MapaProcesoHijoModel[]>();

    @Output()
    onDeleteProcesoFromAccionCorrectiva: EventEmitter<AccionProcesoModel> = new EventEmitter<AccionProcesoModel>();

    //selected procesos
    selectedProcesos: MapaProcesoHijoModel[];

    form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = fb.group({
            proceso: [[] , Validators.required]
        });
    }

    relacionarProcesos() {
        const procesosARelacionar: MapaProcesoHijoModel[] = this.selectedProcesos;
        this.onRelateProceso.emit(procesosARelacionar);
        this.refreshInputs();
    }

    deleteProcesoFromAccionCorrectiva(proceso: AccionProcesoModel) {
        this.onDeleteProcesoFromAccionCorrectiva.emit(proceso);
    }

    refreshInputs() {
        this.form.setValue({proceso: []});
    }

}