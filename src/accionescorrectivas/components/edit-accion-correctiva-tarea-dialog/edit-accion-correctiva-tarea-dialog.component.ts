import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { AccionCorrectivaTareaModel } from "../../../shared/models/accion-correctiva-tarea.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UsuarioModel } from "../../../shared/models/usuario.model";
import { AccionCorrectivaTareaTipoModel } from "../../../shared/models/accion-correctiva-tarea-tipo.model";
import { environment } from "../../../environments/environment";

@Component({
    selector: "edit-accion-correctiva-tarea-dialog",
    templateUrl: "edit-accion-correctiva-tarea-dialog.component.html"
})
export class EditAccionCorrectivaTareaDialogComponent implements OnInit {
    //formato fecha
    formatoFechaPrimeNg = environment.dateFormatPrimeNg;

    //información para las listas seleccionables
    @Input()
    accionCorrectivaTareaTipos: AccionCorrectivaTareaTipoModel[];

    @Input()
    usuariosResponsables: UsuarioModel[];

    @Output()
    onUpdateAccionCorrectivaTarea: EventEmitter<
        AccionCorrectivaTareaModel
    > = new EventEmitter<AccionCorrectivaTareaModel>();

    // atributos clase
    display;

    form: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.form = this.fb.group({
            id: null,
            tipo: [null, Validators.required],
            responsables: [null, Validators.required],
            prioridad: [null, Validators.required],
            fecha_cumplimiento: [null, Validators.required],
            tarea: [null, Validators.required],
            responsables_terceros: [null, Validators.required]
        });
    }

    setValue(tareaEditada: AccionCorrectivaTareaModel) {
        let usuariosResponsables: UsuarioModel[] = tareaEditada.responsables.map(
            responsableActual => {
                return responsableActual.responsable;
            }
        );
        this.form.setValue({
            id: tareaEditada.id,
            tipo: this.accionCorrectivaTareaTipos.find(
                tareaTipo =>
                    tareaTipo.id == tareaEditada.id_accion_correctiva_tarea_tipo
            ),
            responsables: usuariosResponsables,
            prioridad: tareaEditada.prioridad,
            fecha_cumplimiento: new Date(tareaEditada.fecha_cumplimiento),
            tarea: tareaEditada.tarea,
            responsables_terceros: tareaEditada.responsables_terceros
        });
    }

    onHideEditTarea() {
        this.display = false;
    }

    onSubmit() {
        if (this.form.valid) {
            const tareaEditada: AccionCorrectivaTareaModel = {
                ...this.form.value,
                id_accion_correctiva_tarea_tipo: this.form.value.tipo.id,
                fecha_cumplimiento: (this.form.value
                    .fecha_cumplimiento as Date).valueOf()
            };
            this.onUpdateAccionCorrectivaTarea.emit(tareaEditada);
            this.display = false;
        }
    }
}
