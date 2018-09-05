import { Component, ViewChild } from "@angular/core";
import { HasPermisionService } from "../../../shared/services";

import * as fromRootStore from "../../../app/store";
import * as fromAuth from "../../../auth/store";
import * as fromShared from "../../../shared/store";

import { Store } from "@ngrx/store";
import { RealizarTareaDialogComponent } from "../../../shared/components";
import { environment } from "../../../environments/environment.prod";
import { BeBandejaEntradaService } from "../../services";
import { AccionPreventivaTareaAdjuntoModel } from "../../../shared/models/accion-preventiva-tarea-adjunto.model";
import {
    BeAccionesCorrectivasAsocComponent,
    BeTareasAccionesCorrectivasAsocComponent,
    BeTareasAccionesPreventivasAsocComponent
} from "../../components";
import { AccionCorrectivaTareaModel } from "../../../shared/models/accion-correctiva-tarea.model";
import { take } from "rxjs/operators";
import { AccionCorrectivaTareaAdjuntoModel } from "../../../shared/models/accion-correctiva-tarea-adjunto.model";
import { AccionPreventivaTareaModel } from "../../../shared/models/accion-preventiva-tarea.model";
import { StoreModel } from "../../../shared/models/store.model";
import { ComponenteCargado } from "../../../shared/services/utils/abstract-clases/ComponenteCargado";

@Component({
    selector: "bandeja-entrada",
    template: `
        <div>
            <be-documentos-vigentes-asoc *ngIf="hasPermision([1000]) | async" 
                (onSelectDocumento)="redirectToDocumento($event)"></be-documentos-vigentes-asoc>
        </div> 
        <div>
           <be-acciones-correctivas-asoc *ngIf="hasPermision([1001]) | async"  (onSelectAccionCorrectiva)="redirectToAccionCorrectiva($event)">
           </be-acciones-correctivas-asoc>
        </div>
        <div>
            <be-acciones-preventivas-asoc *ngIf="hasPermision([1002]) | async"  (onSelectAccionPreventiva)="redirectToAccionPreventiva($event)">
            </be-acciones-preventivas-asoc>
        </div>
        <div>
            <be-tareas-acciones-correctivas-asoc *ngIf="hasPermision([1003]) | async" 
            #accionesCorrectivasTareasAsoc (onSelectTareaAccionCorrectiva)="selectAccionCorrectivaTarea($event)">
            
            </be-tareas-acciones-correctivas-asoc>
        </div>

        <div>
            <be-tareas-acciones-preventivas-asoc *ngIf="hasPermision([1004]) | async" 
            #accionesPreventivasTareasAsoc (onSelectTareaAccionPreventiva)="selectAccionPreventivaTarea($event)" >
            </be-tareas-acciones-preventivas-asoc>
        </div> 

        <realizar-tarea-dialog #realizarTareaACDialog
            [evidenciasTarea]="tareaSelectedAC?.adjunto"
            (onCreateDocumento)="uploadAdjuntosByAccionCorrectivaTarea($event)"
            (onDownloadDocumento)="downloadAdjuntoByAccionCorrectivaTarea($event)"
            (onDeleteDocumento)="deleteAdjuntoByAccionCorrectivaTarea($event)"
            (onConsultarTareaAdjunto)="consultarAdjuntoFromAccionCorrectivaTarea($event)"
            (onFinishTarea)="realizarAccionCorrectivaTarea($event)"></realizar-tarea-dialog>
        
            <realizar-tarea-dialog #realizarTareaAPDialog
            [evidenciasTarea]="tareaSelectedAP?.adjunto"
            (onCreateDocumento)="uploadAdjuntosByAccionPreventivaTarea($event)"
            (onDownloadDocumento)="downloadAdjuntoByAccionPreventivaTarea($event)"
            (onDeleteDocumento)="deleteAdjuntoByAccionPreventivaTarea($event)"
            (onConsultarTareaAdjunto)="consultarAdjuntoFromAccionPreventivaTarea($event)"
            (onFinishTarea)="realizarAccionPreventivaTarea($event)"></realizar-tarea-dialog>
    `
})
export class BandejaEntradaComponent extends ComponenteCargado {
    @ViewChild("accionesCorrectivasTareasAsoc")
    accionesCorrectivasTareasAsoc: BeTareasAccionesCorrectivasAsocComponent;

    @ViewChild("accionesPreventivasTareasAsoc")
    accionesPreventivasTareasAsoc: BeTareasAccionesPreventivasAsocComponent;

    @ViewChild("realizarTareaACDialog")
    realizarTareaACDialog: RealizarTareaDialogComponent;

    @ViewChild("realizarTareaAPDialog")
    realizarTareaAPDialog: RealizarTareaDialogComponent;

    tareaSelectedAC: AccionCorrectivaTareaModel;

    tareaSelectedAP: AccionPreventivaTareaModel;

    constructor(
        private hasPermisionService: HasPermisionService,
        private store: Store<fromRootStore.State>,
        private sstore: Store<StoreModel>,
        private beBandejaEntradaService: BeBandejaEntradaService
    ) {
        super(sstore);
    }

    hasPermision(requiredPermision: number) {
        return this.hasPermisionService.hasPermision(requiredPermision);
    }

    redirectToDocumento(idDocumento: number) {
        this.store.dispatch(
            new fromRootStore.Go({
                path: [`/documentos/detalle/${idDocumento}`]
            })
        );
    }

    redirectToAccionCorrectiva(idAccionCorrectiva: number) {
        this.store.dispatch(
            new fromRootStore.Go({
                path: [
                    `/acciones/acciones-correctivas/detalle/${idAccionCorrectiva}`
                ]
            })
        );
    }

    redirectToAccionPreventiva(idAccionPreventiva: number) {
        this.store.dispatch(
            new fromRootStore.Go({
                path: [
                    `/acciones/acciones-preventivas/detalle/${idAccionPreventiva}`
                ]
            })
        );
    }

    selectAccionCorrectivaTarea(tareaActual: AccionCorrectivaTareaModel) {
        this.tareaSelectedAC = tareaActual;
        let tarea = {
            id: tareaActual.id,
            tarea: tareaActual.tarea,
            observaciones: tareaActual.observaciones
                ? tareaActual.observaciones
                : ""
        };

        this.realizarTareaACDialog.setValue(tarea);
        if (tareaActual.realizada) {
            this.realizarTareaACDialog.bloquearCampos(true);
        } else {
            this.realizarTareaACDialog.bloquearCampos(false);
        }
        this.realizarTareaACDialog.display = true;
    }

    realizarAccionCorrectivaTarea(data: AccionCorrectivaTareaModel) {
        this.showWaitDialog(
            "Acción en proceso",
            "Cambiando estado acción correctiva realizado, un momento por favor..."
        );
        this.store
            .select(fromAuth.getUser)
            .pipe(take(1))
            .subscribe(usuario => {
                data.id_realizada_por = usuario.id;

                this.beBandejaEntradaService
                    .realizarAccionCorrectivaTarea(data)
                    .subscribe(accionCorrectivaTarea => {
                        this.accionesCorrectivasTareasAsoc.tareasAccionesCorrectivas = this.accionesCorrectivasTareasAsoc.tareasAccionesCorrectivas.map(
                            actActual => {
                                if (actActual.id != accionCorrectivaTarea.id) {
                                    return actActual;
                                } else {
                                    return accionCorrectivaTarea;
                                }
                            }
                        );

                        this.hideWaitDialog();
                    });
            });
    }

    uploadAdjuntosByAccionCorrectivaTarea(files: File[]) {
        this.realizarTareaACDialog.display = false;
        this.showWaitDialog(
            "Acción en proceso",
            "Cargando evidencias de una tarea, un momento por favor..."
        );

        const form: FormData = new FormData();

        files.forEach(archivo => {
            form.append("uploads[]", archivo, archivo.name);
        });

        this.beBandejaEntradaService
            .uploadAdjuntosByTareaAccionCorrectiva(
                this.tareaSelectedAC.id,
                form
            )
            .subscribe(response => {
                this.tareaSelectedAC.adjunto = [
                    ...this.tareaSelectedAC.adjunto,
                    ...response
                ];
                this.hideWaitDialog();
                this.realizarTareaACDialog.display = true;
            });
    }

    downloadAdjuntoByAccionCorrectivaTarea(
        data: AccionCorrectivaTareaAdjuntoModel
    ) {
        this.realizarTareaACDialog.display = false;
        this.showWaitDialog(
            "Acción en proceso",
            "descargando evidencia de una tarea, un momento por favor..."
        );
        this.beBandejaEntradaService
            .downloadAdjuntoByTarea({ path: data.path })
            .subscribe(file => {
                const blob = new Blob([file], { type: file.type });

                var url = window.URL.createObjectURL(blob);
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.setAttribute("style", "display: none");
                a.href = url;
                a.download = data.titulo;
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove(); // remove the element
                this.hideWaitDialog();
                this.realizarTareaACDialog.display = true;
            });
    }

    deleteAdjuntoByAccionCorrectivaTarea(
        data: AccionCorrectivaTareaAdjuntoModel
    ) {
        this.realizarTareaACDialog.display = false;
        this.showWaitDialog(
            "Acción en proceso",
            "eliminando documento adjunto de una tarea, un momento por favor..."
        );
        this.beBandejaEntradaService
            .deleteAdjuntoByTarea(data)
            .subscribe(adjuntoEliminado => {
                this.tareaSelectedAC.adjunto = this.tareaSelectedAC.adjunto.filter(
                    tac => tac.id != adjuntoEliminado.id
                );

                this.realizarTareaACDialog.display = true;
            });
    }

    consultarAdjuntoFromAccionCorrectivaTarea(
        accionCorrectivaTareaAdjunto: AccionCorrectivaTareaAdjuntoModel
    ) {
        const idTipoDocumento =
            environment.tipos_documento.accion_correctiva_tarea_adjunto.id;
        this.store.dispatch(
            new fromRootStore.Go({
                path: [
                    `visor-adjunto/${idTipoDocumento}/${
                        accionCorrectivaTareaAdjunto.id
                    }/${accionCorrectivaTareaAdjunto.titulo}`
                ]
            })
        );
    }

    selectAccionPreventivaTarea(tareaActual: AccionPreventivaTareaModel) {
        this.tareaSelectedAP = tareaActual;
        let tarea = {
            id: tareaActual.id,
            tarea: tareaActual.tarea,
            observaciones: tareaActual.observaciones
                ? tareaActual.observaciones
                : ""
        };
        this.realizarTareaAPDialog.setValue(tarea);
        if (tareaActual.realizada) {
            this.realizarTareaAPDialog.bloquearCampos(true);
        } else {
            this.realizarTareaAPDialog.bloquearCampos(false);
        }
        this.realizarTareaAPDialog.display = true;
    }

    realizarAccionPreventivaTarea(data: AccionPreventivaTareaModel) {
        this.showWaitDialog(
            "Acción en proceso",
            "Cambiando estado acción correctiva realizado, un momento por favor..."
        );
        this.store
            .select(fromAuth.getUser)
            .pipe(take(1))
            .subscribe(usuario => {
                data.id_realizada_por = usuario.id;
                this.beBandejaEntradaService
                    .realizarAccionPreventivaTarea(data)
                    .subscribe(accionPreventivaTarea => {
                        this.accionesPreventivasTareasAsoc.tareasAccionesPreventivas = this.accionesPreventivasTareasAsoc.tareasAccionesPreventivas.map(
                            aptActual => {
                                if (aptActual.id != accionPreventivaTarea.id) {
                                    return aptActual;
                                } else {
                                    return accionPreventivaTarea;
                                }
                            }
                        );
                        this.hideWaitDialog();
                    });
            });
    }

    uploadAdjuntosByAccionPreventivaTarea(files: File[]) {
        this.realizarTareaAPDialog.display = false;
        this.showWaitDialog(
            "Acción en proceso",
            "Cargando evidencias de una tarea, un momento por favor..."
        );

        const form: FormData = new FormData();

        files.forEach(archivo => {
            form.append("uploads[]", archivo, archivo.name);
        });

        this.beBandejaEntradaService
            .uploadAdjuntosByTareaAccionPreventiva(
                this.tareaSelectedAP.id,
                form
            )
            .subscribe(response => {
                this.tareaSelectedAP.adjunto = [
                    ...this.tareaSelectedAP.adjunto,
                    ...response
                ];
                this.hideWaitDialog();
                this.realizarTareaAPDialog.display = true;
            });
    }

    downloadAdjuntoByAccionPreventivaTarea(
        data: AccionPreventivaTareaAdjuntoModel
    ) {
        this.realizarTareaAPDialog.display = false;
        this.showWaitDialog(
            "Acción en proceso",
            "descargando evidencia de una tarea, un momento por favor..."
        );
        this.beBandejaEntradaService
            .downloadAdjuntoByTarea({ path: data.path })
            .subscribe(file => {
                const blob = new Blob([file], { type: file.type });

                var url = window.URL.createObjectURL(blob);
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.setAttribute("style", "display: none");
                a.href = url;
                a.download = data.titulo;
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove(); // remove the element
                this.hideWaitDialog();
                this.realizarTareaAPDialog.display = true;
            });
    }

    deleteAdjuntoByAccionPreventivaTarea(
        data: AccionPreventivaTareaAdjuntoModel
    ) {
        this.realizarTareaAPDialog.display = false;
        this.showWaitDialog(
            "Acción en proceso",
            "eliminando documento adjunto de una tarea, un momento por favor..."
        );
        this.beBandejaEntradaService
            .deleteAdjuntoByTareaAccionPreventiva(data)
            .subscribe(adjuntoEliminado => {
                this.tareaSelectedAP.adjunto = this.tareaSelectedAP.adjunto.filter(
                    tap => tap.id != adjuntoEliminado.id
                );

                this.hideWaitDialog();
                this.realizarTareaAPDialog.display = true;
            });
    }

    consultarAdjuntoFromAccionPreventivaTarea(
        accionPreventivaTareaAdjunto: AccionPreventivaTareaAdjuntoModel
    ) {
        const idTipoDocumento =
            environment.tipos_documento.accion_preventiva_tarea_adjunto.id;
        this.store.dispatch(
            new fromRootStore.Go({
                path: [
                    `visor-adjunto/${idTipoDocumento}/${
                        accionPreventivaTareaAdjunto.id
                    }/${accionPreventivaTareaAdjunto.titulo}`
                ]
            })
        );
    }
}
