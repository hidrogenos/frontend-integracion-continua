import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators
} from "@angular/forms";
import { AccionPreventivaModel } from "../../../shared/models/accion-preventiva.model";
import { UsuarioModel } from "../../../shared/models/usuario.model";
import { MapaProcesoHijoModel } from "../../../shared/models/mapa_proceso_hijo.model";
import { environment } from "../../../environments/environment";

@Component({
    selector: "asignar-accion-preventiva-dialog",
    templateUrl: "asignar-accion-preventiva-dialog.component.html"
})
export class AsignarAccionPreventivaDialogComponent implements OnInit {
    form: FormGroup;
    nombreModulo: string = environment.nombres_modulos_visuales.acciones_preventivas;

    @Input()
    accionPreventivaActual;

    @Input()
    jefesProcesosHijos: MapaProcesoHijoModel[];

    @Input()
    display: boolean;

    @Output()
    onAsignarAccionPreventiva: EventEmitter<
        AccionPreventivaModel
        > = new EventEmitter<AccionPreventivaModel>();

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.form = this.fb.group({
            responsable: ["", Validators.required]
            //  observacion: ['',Validators.required]
        });
    }

    onHide() {
        this.form.reset();
    }

    asignarAccionPreventiva() {
        const accionPreventivaActual: AccionPreventivaModel = {
            ...this.accionPreventivaActual,
            id_responsable: this.form.value.responsable.proceso.jefe.id
        };
        this.onAsignarAccionPreventiva.emit(accionPreventivaActual);
    }
}
