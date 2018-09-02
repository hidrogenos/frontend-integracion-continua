import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { AccionPreventivaTareaTipoModel } from "../../../shared/models/accion-preventiva-tarea-tipo.model";
import { UsuarioModel } from "../../../shared/models/usuario.model";
import { AccionPreventivaTareaModel } from "../../../shared/models/accion-preventiva-tarea.model";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { environment } from "../../../environments/environment";

@Component({
    selector: "create-accion-preventiva-tarea-dialog",
    templateUrl: "create-accion-preventiva-tarea-dialog.component.html"
})
export class CreateAccionPreventivaTareaDialogComponent implements OnInit {
    formatoFechaPrimeNg = environment.dateFormatPrimeNg;
    fechaMinimaCalendario = new Date();

    //información para las listas seleccionables
    @Input()
    accionPreventivaTareaTipos: AccionPreventivaTareaTipoModel[];

    @Input()
    usuariosResponsables: UsuarioModel[];

    // eventos externos
    @Output()
    onEditAccionPreventivaTarea: EventEmitter<
        AccionPreventivaTareaModel
    > = new EventEmitter<AccionPreventivaTareaModel>();

    @Output()
    onDeleteAccionPreventivaTarea: EventEmitter<
        AccionPreventivaTareaModel
    > = new EventEmitter<AccionPreventivaTareaModel>();

    @Output()
    onCompleteAccionPreventivaTarea: EventEmitter<
        AccionPreventivaTareaModel
    > = new EventEmitter<AccionPreventivaTareaModel>();

    @Output()
    onCreateAccionPreventivaTarea: EventEmitter<
        AccionPreventivaTareaModel
    > = new EventEmitter<AccionPreventivaTareaModel>();
    //variables relacionadas con el componente
    display;
    form: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.createForm();
    }

    editAccionPreventivaTarea(data: AccionPreventivaTareaModel) {
        this.onEditAccionPreventivaTarea.emit(data);
    }

    completeAccionPreventivaTarea(data: AccionPreventivaTareaModel) {
        this.onCompleteAccionPreventivaTarea.emit(data);
    }

    deleteAccionPreventivaTarea(data: AccionPreventivaTareaModel) {
        this.onDeleteAccionPreventivaTarea.emit(data);
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
            const tareaNueva: AccionPreventivaTareaModel = {
                ...this.form.value,
                fecha_cumplimiento: (this.form.value
                    .fecha_cumplimiento as Date).valueOf()
            };
            this.onCreateAccionPreventivaTarea.emit(tareaNueva);
            this.display = false;
            this.createForm();
        }
    }

    onHideCreateTarea() {
        this.display = false;
    }
}
