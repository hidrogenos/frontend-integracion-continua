import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators
} from "@angular/forms";
import { AccionPreventivaModel } from "../../../shared/models/accion-preventiva.model";
import { environment } from "../../../environments/environment";

@Component({
    selector: "anular-accion-preventiva-dialog",
    templateUrl: "anular-accion-preventiva.component.html"
})
export class AnularAccionPreventivaComponent implements OnInit {
    form: FormGroup;
    nombreModulo: string = environment.nombres_modulos_visuales.acciones_preventivas;

    @Input()
    accionPreventivaActual;

    @Input()
    displayAnularAccion: boolean;

    @Output()
    onAnularAccionPreventiva: EventEmitter<
        AccionPreventivaModel
        > = new EventEmitter<AccionPreventivaModel>();

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.form = this.fb.group({ observacion: ["", Validators.required] });
    }

    onHideAnularAccionDialog() {
        this.displayAnularAccion = false;
    }

    anularAccionPreventiva() {
        const accionPreventivaActual: AccionPreventivaModel = {
            ...this.accionPreventivaActual,
            observacion: this.form.value.observacion
        };
        this.onAnularAccionPreventiva.emit(accionPreventivaActual);
    }
}
