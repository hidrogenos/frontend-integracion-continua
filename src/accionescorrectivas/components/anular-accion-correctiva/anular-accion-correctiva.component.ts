import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { AccionCorrectivaModel } from "../../../shared/models/accion-correctiva.model";
import { environment } from "../../../environments/environment";

@Component({
    selector: 'anular-accion-correctiva-dialog',
    templateUrl: 'anular-accion-correctiva.component.html'
})
export class AnularAccionCorrectivaComponent implements OnInit {

    form: FormGroup;
    nombreModulo: string = environment.nombres_modulos_visuales.acciones_correctivas;

    @Input()
    accionCorrectivaActual;

    @Input()
    displayAnularAccion: boolean;

    @Output()
    onAnularAccionCorrectiva: EventEmitter<AccionCorrectivaModel> = new EventEmitter<AccionCorrectivaModel>();

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form = this.fb.group({ observacion: ['', Validators.required] });
    }

    onHideAnularAccionDialog() {
        this.displayAnularAccion = false;
    }

    anularAccionCorrectiva() {
        const accionCorrectivaActual: AccionCorrectivaModel = {
            ...this.accionCorrectivaActual,
            observacion: this.form.value.observacion
        }
        this.onAnularAccionCorrectiva.emit(accionCorrectivaActual);
    }
}