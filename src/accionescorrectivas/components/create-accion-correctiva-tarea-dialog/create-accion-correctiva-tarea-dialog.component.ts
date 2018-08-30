import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { AccionCorrectivaTareaTipoModel } from "../../../shared/models/accion-correctiva-tarea-tipo.model";
import { UsuarioModel } from "../../../shared/models/usuario.model";
import { AccionCorrectivaTareaModel } from "../../../shared/models/accion-correctiva-tarea.model";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { environment } from "../../../environments/environment";

@Component({
    selector: "create-accion-correctiva-tarea-dialog",
    templateUrl: "create-accion-correctiva-tarea-dialog.component.html"
})
export class CreateAccionCorrectivaTareaDialogComponent implements OnInit {
    formatoFechaPrimeNg = environment.dateFormatPrimeNg;
    fechaMinimaCalendario = new Date();

    //información para las listas seleccionables
    @Input()
    accionCorrectivaTareaTipos: AccionCorrectivaTareaTipoModel[];

    @Input()
    usuariosResponsables: UsuarioModel[];

    // eventos externos
    @Output()
    onEditAccionCorrectivaTarea: EventEmitter<
        AccionCorrectivaTareaModel
    > = new EventEmitter<AccionCorrectivaTareaModel>();

    @Output()
    onDeleteAccionCorrectivaTarea: EventEmitter<
        AccionCorrectivaTareaModel
    > = new EventEmitter<AccionCorrectivaTareaModel>();

    @Output()
    onCompleteAccionCorrectivaTarea: EventEmitter<
        AccionCorrectivaTareaModel
    > = new EventEmitter<AccionCorrectivaTareaModel>();

    @Output()
    onCreateAccionCorrectivaTarea: EventEmitter<
        AccionCorrectivaTareaModel
    > = new EventEmitter<AccionCorrectivaTareaModel>();
    //variables relacionadas con el componente
    display;
    form: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.createForm();
    }

    editAccionCorrectivaTarea(data: AccionCorrectivaTareaModel) {
        this.onEditAccionCorrectivaTarea.emit(data);
    }

    completeAccionCorrectivaTarea(data: AccionCorrectivaTareaModel) {
        this.onCompleteAccionCorrectivaTarea.emit(data);
    }

    deleteAccionCorrectivaTarea(data: AccionCorrectivaTareaModel) {
        this.onDeleteAccionCorrectivaTarea.emit(data);
    }

    createForm() {
        this.form = this.fb.group({
            tipo: [null, Validators.required],
            responsables: [null, Validators.required],
            prioridad: [null, Validators.required],
            fecha_cumplimiento: [null, Validators.required],
            tarea: [null, Validators.required],
            responsables_terceros: [null, Validators.required]
        });
    }

    onSubmit() {
        if (this.form.valid) {
            const tareaNueva: AccionCorrectivaTareaModel = {
                ...this.form.value,
                fecha_cumplimiento: (this.form.value
                    .fecha_cumplimiento as Date).valueOf()
            };
            this.onCreateAccionCorrectivaTarea.emit(tareaNueva);
            this.display = false;
            this.createForm();
        }
    }

    onHideCreateTarea() {
        this.display = false;
    }
}
