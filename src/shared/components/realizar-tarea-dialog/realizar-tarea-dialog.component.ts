import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from "@angular/forms";
import { Reset } from "@ngrx/store-devtools/src/actions";

@Component({
    selector: "realizar-tarea-dialog",
    templateUrl: "realizar-tarea-dialog.component.html"
})
export class RealizarTareaDialogComponent implements OnInit {
    // atributos
    form: FormGroup;
    display;
    tarea: string;
    disabled;

    // atributos entrada
    @Input()
    evidenciasTarea;

    // eventos
    @Output()
    onCreateDocumento: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    onDownloadDocumento: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    onDeleteDocumento: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    onConsultarTareaAdjunto: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    onFinishTarea: EventEmitter<any> = new EventEmitter<any>();

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            id: null,
            observaciones: [null, Validators.required]
        });
    }

    setValue(data) {
        this.form.setValue({
            id: data.id,
            observaciones: data.observaciones
        });
        this.tarea = data.tarea;
    }

    bloquearCampos(bloqueo: boolean) {
        if (bloqueo) {
            this.form.disable();
            this.disabled = true;
        } else {
            this.form.enable();
            this.disabled = false;
        }
    }

    onSubmit() {
        if (this.form.valid) {
            this.onFinishTarea.emit(this.form.value);
            this.display = false;
        }
        this.reset();
    }
    reset() {
        this.createForm();
    }
}
