import {
    Component,
    Input,
    ViewChild,
    Output,
    EventEmitter
} from "@angular/core";
import { AccionPreventivaTareaModel } from "../../../shared/models/accion-preventiva-tarea.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AccionPreventivaTareaTipoModel } from "../../../shared/models/accion-preventiva-tarea-tipo.model";
import { UsuarioModel } from "../../../shared/models/usuario.model";
import { environment } from "../../../environments/environment";
import { EditAccionPreventivaTareaDialogComponent } from "../edit-accion-preventiva-tarea-dialog/edit-accion-preventiva-tarea-dialog.component";
import { AccionPreventivaTareaAdjuntoModel } from "../../../shared/models/accion-preventiva-tarea-adjunto.model";
import { RealizarTareaDialogComponent } from "../../../shared/components";

@Component({
    selector: "acciones-tareas-lista",
    templateUrl: "acciones-tareas-lista.component.html"
})
export class AccionesTareasListaComponent {
    dateFormatAngular = environment.dateFormatAngular;
    disabled: boolean;

    // información para manejar las funcionalidades que tiene una persona en el sistema
    @Input()
    idEstadoAccionPreventiva: number;

    @Input()
    usuarioActual: UsuarioModel;

    //información para las listas seleccionables
    @Input()
    accionPreventivaTareaTipos: AccionPreventivaTareaTipoModel[];

    @Input()
    usuariosResponsables: UsuarioModel[];

    tareaSelected: AccionPreventivaTareaModel;

    //permisos
    @Input()
    permisoRealizarTarea: boolean;

    // tareas de la datatable
    @Input()
    data: AccionPreventivaTareaModel[];

    @Input()
    rows;

    @Output()
    onUpdateAccionPreventivaTarea: EventEmitter<
        AccionPreventivaTareaModel
    > = new EventEmitter<AccionPreventivaTareaModel>();

    @Output()
    onDeleteAccionPreventivaTarea: EventEmitter<
        AccionPreventivaTareaModel
    > = new EventEmitter<AccionPreventivaTareaModel>();

    @Output()
    onUploadAdjuntoTarea: EventEmitter<{
        idTarea: number;
        files: File[];
    }> = new EventEmitter<{ idTarea: number; files: File[] }>();

    @Output()
    onDownloadAdjuntoTarea: EventEmitter<
        AccionPreventivaTareaAdjuntoModel
    > = new EventEmitter<AccionPreventivaTareaAdjuntoModel>();

    @Output()
    onDeleteAdjuntoTarea: EventEmitter<{
        idTarea: number;
        data: AccionPreventivaTareaAdjuntoModel;
    }> = new EventEmitter<{
        idTarea: number;
        data: AccionPreventivaTareaAdjuntoModel;
    }>();

    @Output()
    onConsultarTareaAdjunto: EventEmitter<
        AccionPreventivaTareaAdjuntoModel
    > = new EventEmitter<AccionPreventivaTareaAdjuntoModel>();

    @Output()
    onFinishTarea: EventEmitter<AccionPreventivaTareaModel> = new EventEmitter<
        AccionPreventivaTareaModel
    >();

    @ViewChild("editarTarea")
    editAccionPreventivaEditarTareaComponent: EditAccionPreventivaTareaDialogComponent;

    @ViewChild("realizarTarea")
    realizarTareaComponent: RealizarTareaDialogComponent;

    constructor(private fb: FormBuilder) {}

    onSubmit() {}

    editAccionPreventivaTarea(tareaActual: AccionPreventivaTareaModel) {
        this.editAccionPreventivaEditarTareaComponent.setValue(tareaActual);
        this.editAccionPreventivaEditarTareaComponent.display = true;
    }

    updateAccionPreventivaTarea(tareaActual: AccionPreventivaTareaModel) {
        this.onUpdateAccionPreventivaTarea.emit(tareaActual);
    }

    deleteAccionPreventivaTarea(tareaActual: AccionPreventivaTareaModel) {
        this.onDeleteAccionPreventivaTarea.emit(tareaActual);
    }

    selectAccionPreventivaTarea(tareaActual: AccionPreventivaTareaModel) {
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

    usuarioEsResponsable(accionPreventivaTarea: AccionPreventivaTareaModel) {
        let usuarioAux = accionPreventivaTarea.responsables.find(
            tareaActual => tareaActual.id_responsable == this.usuarioActual.id
        );
        if (
            !accionPreventivaTarea.realizada &&
            this.idEstadoAccionPreventiva == 5 &&
            (usuarioAux ||
                accionPreventivaTarea.id_usuario == this.usuarioActual.id ||
                this.permisoRealizarTarea)
        ) {
            return true;
        } else {
            return false;
        }
    }
}
