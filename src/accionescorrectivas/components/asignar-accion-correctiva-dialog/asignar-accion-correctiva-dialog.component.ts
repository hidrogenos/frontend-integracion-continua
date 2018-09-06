import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators
} from "@angular/forms";
import { AccionCorrectivaModel } from "../../../shared/models/accion-correctiva.model";
import { UsuarioModel } from "../../../shared/models/usuario.model";
import { MapaProcesoHijoModel } from "../../../shared/models/mapa_proceso_hijo.model";
import { environment } from "../../../environments/environment";

@Component({
    selector: "asignar-accion-correctiva-dialog",
    templateUrl: "asignar-accion-correctiva-dialog.component.html"
})
export class AsignarAccionCorrectivaComponent implements OnInit {
    form: FormGroup;
    nombreModulo: string = environment.nombres_modulos_visuales.acciones_correctivas;

    @Input()
    accionCorrectivaActual;

    @Input()
    jefesProcesosHijos: MapaProcesoHijoModel[];

    @Input()
    display: boolean;

    @Output()
    onAsignarAccionCorrectiva: EventEmitter<
        AccionCorrectivaModel
        > = new EventEmitter<AccionCorrectivaModel>();

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

    asignarAccionCorrectiva() {
        const accionCorrectivaActual: AccionCorrectivaModel = {
            ...this.accionCorrectivaActual,
            id_responsable: this.form.value.responsable.proceso.jefe.id
        };
        this.onAsignarAccionCorrectiva.emit(accionCorrectivaActual);
    }
}
