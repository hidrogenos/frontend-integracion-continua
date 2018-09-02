import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AccionProcesoModel } from "../../../shared/models/accion-proceso.model";
import { MapaProcesoHijoModel } from "../../../shared/models/mapa_proceso_hijo.model";
import { AccionPreventivaModel } from "../../../shared/models/accion-preventiva.model";

@Component({
    selector: "relacionar-proceso",
    templateUrl: "relacionar-proceso.component.html"
})
export class RelacionarProcesoComponent implements OnInit {
    //variables
    disabled: boolean;
    form: FormGroup;

    // variables de entrada
    @Input()
    procesos: MapaProcesoHijoModel[];

    /**
     * @var data Procesos de una acción preventiva
     */
    @Input()
    data: AccionProcesoModel[];

    @Input()
    loadingProcesos: boolean;

    @Input()
    cols: any[];

    @Input()
    rows: number;

    // eventos
    @Output()
    onRelateProceso: EventEmitter<MapaProcesoHijoModel[]> = new EventEmitter<
        MapaProcesoHijoModel[]
    >();

    @Output()
    onDeleteProcesoFromAccionPreventiva: EventEmitter<
        AccionProcesoModel
    > = new EventEmitter<AccionProcesoModel>();

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.createForm();
        this.disabled = false;
    }

    createForm() {
        this.form = this.fb.group({
            proceso: [null, Validators.required]
        });
    }

    relacionarProcesos() {
        const procesosARelacionar: MapaProcesoHijoModel[] = this.form.value
            .proceso;
        this.onRelateProceso.emit(procesosARelacionar);
        this.createForm();
    }

    disableComponent() {
        this.form.disable();
        this.disabled = true;
    }

    deleteProcesoFromAccionPreventiva(proceso: AccionProcesoModel) {
        this.onDeleteProcesoFromAccionPreventiva.emit(proceso);
    }
}
