import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { AccionPreventivaTareaModel } from "../../../shared/models/accion-preventiva-tarea.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UsuarioModel } from "../../../shared/models/usuario.model";
import { AccionPreventivaTareaTipoModel } from "../../../shared/models/accion-preventiva-tarea-tipo.model";
import { environment } from "../../../environments/environment";

@Component({
    selector: "edit-accion-preventiva-tarea-dialog",
    templateUrl: "edit-accion-preventiva-tarea-dialog.component.html"
})
export class EditAccionPreventivaTareaDialogComponent implements OnInit {
    //formato fecha
    formatoFechaPrimeNg = environment.dateFormatPrimeNg;

    //información para las listas seleccionables
    @Input()
    accionPreventivaTareaTipos: AccionPreventivaTareaTipoModel[];

    @Input()
    usuariosResponsables: UsuarioModel[];

    @Output()
    onUpdateAccionPreventivaTarea: EventEmitter<
        AccionPreventivaTareaModel
    > = new EventEmitter<AccionPreventivaTareaModel>();

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

    setValue(tareaEditada: AccionPreventivaTareaModel) {
        let usuariosResponsables: UsuarioModel[] = tareaEditada.responsables.map(
            responsableActual => {
                return responsableActual.responsable;
            }
        );
        this.form.setValue({
            id: tareaEditada.id,
            tipo: this.accionPreventivaTareaTipos.find(
                tareaTipo =>
                    tareaTipo.id == tareaEditada.id_accion_preventiva_tarea_tipo
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
            const tareaEditada: AccionPreventivaTareaModel = {
                ...this.form.value,
                id_accion_preventiva_tarea_tipo: this.form.value.tipo.id,
                fecha_cumplimiento: (this.form.value
                    .fecha_cumplimiento as Date).valueOf()
            };
            this.onUpdateAccionPreventivaTarea.emit(tareaEditada);
            this.display = false;
        }
    }
}
