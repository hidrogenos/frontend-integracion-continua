import {
    Component,
    Input,
    ViewChild,
    Output,
    EventEmitter
} from "@angular/core";
import { AccionCorrectivaTareaModel } from "../../../shared/models/accion-correctiva-tarea.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AccionCorrectivaTareaTipoModel } from "../../../shared/models/accion-correctiva-tarea-tipo.model";
import { UsuarioModel } from "../../../shared/models/usuario.model";
import { environment } from "../../../environments/environment";
import { EditAccionCorrectivaTareaDialogComponent } from "../edit-accion-correctiva-tarea-dialog/edit-accion-correctiva-tarea-dialog.component";
import { AccionCorrectivaTareaAdjuntoModel } from "../../../shared/models/accion-correctiva-tarea-adjunto.model";
import { RealizarTareaDialogComponent } from "../../../shared/components";

@Component({
    selector: "acciones-tareas-lista",
    templateUrl: "acciones-tareas-lista.component.html"
})
export class AccionesTareasListaComponent {
    dateFormatAngular = environment.dateFormatAngular;
    disabled: boolean;

    @Input()
    idEstadoAccionCorrectiva: number;

    //información para las listas seleccionables
    @Input()
    accionCorrectivaTareaTipos: AccionCorrectivaTareaTipoModel[];

    @Input()
    usuariosResponsables: UsuarioModel[];

    tareaSelected: AccionCorrectivaTareaModel;

    // tareas de la datatable
    @Input()
    data: AccionCorrectivaTareaModel[];

    @Input()
    rows;

    @Output()
    onUpdateAccionCorrectivaTarea: EventEmitter<
        AccionCorrectivaTareaModel
    > = new EventEmitter<AccionCorrectivaTareaModel>();

    @Output()
    onDeleteAccionCorrectivaTarea: EventEmitter<
        AccionCorrectivaTareaModel
    > = new EventEmitter<AccionCorrectivaTareaModel>();

    @Output()
    onUploadAdjuntoTarea: EventEmitter<{
        idTarea: number;
        files: File[];
    }> = new EventEmitter<{ idTarea: number; files: File[] }>();

    @Output()
    onDownloadAdjuntoTarea: EventEmitter<
        AccionCorrectivaTareaAdjuntoModel
    > = new EventEmitter<AccionCorrectivaTareaAdjuntoModel>();

    @Output()
    onDeleteAdjuntoTarea: EventEmitter<{
        idTarea: number;
        data: AccionCorrectivaTareaAdjuntoModel;
    }> = new EventEmitter<{
        idTarea: number;
        data: AccionCorrectivaTareaAdjuntoModel;
    }>();

    @Output()
    onFinishTarea: EventEmitter<AccionCorrectivaTareaModel> = new EventEmitter<
        AccionCorrectivaTareaModel
    >();

    @ViewChild("editarTarea")
    editAccionCorrectivaEditarTareaComponent: EditAccionCorrectivaTareaDialogComponent;

    @ViewChild("realizarTarea")
    realizarTareaComponent: RealizarTareaDialogComponent;

    constructor(private fb: FormBuilder) {}

    onSubmit() {}

    editAccionCorrectivaTarea(tareaActual: AccionCorrectivaTareaModel) {
        this.editAccionCorrectivaEditarTareaComponent.setValue(tareaActual);
        this.editAccionCorrectivaEditarTareaComponent.display = true;
    }

    updateAccionCorrectivaTarea(tareaActual: AccionCorrectivaTareaModel) {
        this.onUpdateAccionCorrectivaTarea.emit(tareaActual);
    }

    deleteAccionCorrectivaTarea(tareaActual: AccionCorrectivaTareaModel) {
        this.onDeleteAccionCorrectivaTarea.emit(tareaActual);
    }

    selectAccionCorrectivaTarea(tareaActual: AccionCorrectivaTareaModel) {
        this.tareaSelected = tareaActual;
        let tarea = {
            id: tareaActual.id,
            tarea: tareaActual.tarea,
            observaciones: tareaActual.observaciones
                ? tareaActual.observaciones
                : ""
        };

        this.realizarTareaComponent.setValue(tarea);
        if (tareaActual.realizada) {
            this.realizarTareaComponent.bloquearCampos(true);
        } else {
            this.realizarTareaComponent.bloquearCampos(false);
        }
        this.realizarTareaComponent.display = true;
    }

    uploadAdjuntoTarea(event: File[]) {
        //  console.log("tareasSeled", this.tareaSelected);
        this.onUploadAdjuntoTarea.emit({
            idTarea: this.tareaSelected.id,
            files: event
        });
    }

    downloadAdjuntoTarea(event) {
        this.onDownloadAdjuntoTarea.emit(event);
    }

    deleteAdjuntoTarea(event) {
        // console.log("tareasSeledDele", this.tareaSelected);
        this.onDeleteAdjuntoTarea.emit({
            idTarea: this.tareaSelected.id,
            data: event
        });
    }

    disableComponent() {
        this.disabled = true;
    }
}
