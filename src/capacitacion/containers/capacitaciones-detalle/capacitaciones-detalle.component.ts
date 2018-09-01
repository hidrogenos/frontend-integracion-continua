import { Component, OnInit, ViewChild } from "@angular/core";
import {
    EditCapacitacionComponent,
    ProcesosCapacitacionComponent,
    CapacitacionAsistentesExternosComponent,
    EditAsistentesExternosDialogComponent,
    CapacitacionAsistentesInternosComponent,
    CapacitacionCapacitadoresExternosComponent,
    EditCapacitadoresExternosDialogComponent,
    EditCapacitadoresInternosDialogComponent
} from "../../components";
import {
    CapacitacionesService,
    DocumentacionCapacitacionService,
    CapacitacionAsistentesExternosService,
    CapacitacionAsistentesInternosService,
    CapacitacionCapacitadoresExternosService,
    CapacitacionCapacitadoresInternosService
} from "../../services";
import * as fromShared from "./../../../shared/store";
import * as fromRoute from "./../../../app/store";
import { StoreModel } from "../../../shared/models/store.model";
import { Store } from "@ngrx/store";
import { take } from "rxjs/operators";
import * as fromRoot from "./../../../app/store";
import { CapacitacionModel } from "../../../shared/models/capacitacion.model";
import { MapaProcesoHijoModel } from "../../../shared/models/mapa_proceso_hijo.model";
import {
    CapacitacionProcesoService,
    HasPermisionService
} from "../../../shared/services";
import { forkJoin } from "rxjs";
import { DocumentacionCapacitacionComponent } from "../../components/capacitaciones/documentacion-capacitacion/documentacion-capacitacion.component";
import { CapacitacionAdjuntoModel } from "../../../shared/models/capacitacion-adjunto.model";
import { CapacitacionAsistenteExternoModel } from "../../../shared/models/capacitacion-asistente-externo.model";
import { CapacitacionAsistenteInternoModel } from "../../../shared/models/capacitacion-asistente-interno.model";
import { UsuarioModel } from "../../../shared/models/usuario.model";
import { EditAsistentesInternosDialogComponent } from "../../components/edit-asistentes-internos-dialog/edit-asistentes-internos-dialog.component";
import { CapacitacionCapacitadorExternoModel } from "../../../shared/models/capacitacion-capacitador-externo.model";
import { CapacitacioncapacitadoresInternosComponent } from "../../components/capacitaciones/capacitacion-capacitadores-internos/capacitacion-capacitadores-internos.component";
import { CapacitacionCapacitadorInternoModel } from "../../../shared/models/capacitacion-capacitador-interno.model";
import { environment } from "../../../environments/environment";

@Component({
    selector: "capacitacion-detalle-component",
    styleUrls: ["capacitaciones-detalle.component.scss"],
    template: `

        <edit-capacitacion-component #editCapacitacion
            (edit)="onUpdate($event)"
            [permisoEdicion]="(hasPermision(804)| async)">
        </edit-capacitacion-component>

        <procesos-capacitacion-component #procesosCapacitacion
            [loadedCapacitaciones]="loadedCapacitaciones"
            [procesos]="procesos"
            [procesosAsociados]="loadedCapacitaciones?.procesos"
            (deleteProceso)="onDeleteProceso($event)"
            (addProceso)="onUpdateproceso($event)"
            [permisoAdd]="(hasPermision(805)| async)"
            [permisoDelete]="(hasPermision(806)| async)">
        </procesos-capacitacion-component>

        <documentacion-capacitacion-component #documentoCapacitacion
            [documentos]="loadedCapacitaciones?.documentos"
            (onCreateDocumento)="uploadDocumentos($event)"
            (onDeleteDocumento)="deleteUsuarioDocumento($event)"
            (onDownloadDocumento)="downloadDocumento($event)"
            (onConsultarDocumento)="consultarDocumentoCapacitacion($event)"
            [permisoAdd]="hasPermision(807)| async"
            [permisoVisualize]="hasPermision(808)| async"
            [permisoDowload]="hasPermision(809)| async"
            [permisoDelete]="hasPermision(810)| async">
        </documentacion-capacitacion-component>

        <asistentes-externos-component #asistentesExternos
            (createAE)="onCreateAE($event)"
            [asistenteExterno]="loadedCapacitaciones?.asistentes_externos"
            (editAE)="showAE($event)"
            (deleteAE)="onDeleteAE($event)"
            [permisoCreateAE]="hasPermision(811)| async"
            [permisoEditAE]="hasPermision(812)| async"
            [permisoDeleteAE]="hasPermision(813)| async">
        </asistentes-externos-component>

        <edit-asistente-externo-component #editAsistenteExterno
            (editAE)="onUpdateAE($event)">
        </edit-asistente-externo-component>

        <asistentes-internos-component #asistentesInternos
            [asistenteInterno]="asistenteInterno"
            [loadedInterno]="loadedCapacitaciones?.asistentes_internos"
            (editAI)="showAI($event)"
            (createAI)="onCreateAI($event)"
            (deleteAI)="onDeleteAI($event)"
            [permisoCreateAI]="hasPermision(814)| async"
            [permisoEditAI]="hasPermision(815)| async"
            [permisoDeleteAI]="hasPermision(816)| async">
        </asistentes-internos-component>

        <edit-asistente-interno-component #editAsistenteInterno
            (editAI)="onUpdateAI($event)">
        </edit-asistente-interno-component>

        <capacitadores-externos-component #capacitadoresExternos
            [capacitadoresExternos]='loadedCapacitaciones?.capacitadores_externos'
            (createCE)="onCreateCE($event)"
            (deleteCE)="onDeleteCE($event)"
            (editCE)="showCE($event)"
            [permisoCreateCE]="hasPermision(817)| async"
            [permisoEditCE]="hasPermision(818)| async"
            [permisoDeleteCE]="hasPermision(819)| async">
        </capacitadores-externos-component>

        <edit-capacitadores-externo-component #editCapacitadoresExterno
            (editCE)="onUpdateCE($event)">
        </edit-capacitadores-externo-component>

        <capacitadores-internos-component #createCapacitadorI
            [capacitadorInterno]="capacitadorInterno"
            [loadedInterno]="loadedCapacitaciones?.capacitadores_internos"
            (createCI)="onCreateCI($event)"
            (editCI)="showCI($event)"
            (deleteCI)="onDeleteCI($event)"
            [permisoCreateCI]="hasPermision(820)| async"
            [permisoEditCI]="hasPermision(821)| async"
            [permisoDeleteCI]="hasPermision(822)| async">
        </capacitadores-internos-component>

        <edit-capacitador-interno-component #editCapacitadorInterno
            (editCI)="onUpdateCI($event)">
        </edit-capacitador-interno-component>
           
    

    `
})
export class CapacitacionesDetalleComponent implements OnInit {
    //atributos
    loadedCapacitaciones: CapacitacionModel;
    documentosCapacitacion: CapacitacionAdjuntoModel[];
    loadedUsuario: UsuarioModel;
    totalRecords: number;

    procesos: MapaProcesoHijoModel[];
    asistenteInterno: UsuarioModel[];
    capacitadorInterno: UsuarioModel[];
    capacitadoresInterno: CapacitacionCapacitadorInternoModel[];
    //properties
    @ViewChild("editCapacitacion")
    editCapacitacion: EditCapacitacionComponent;

    @ViewChild("procesosCapacitacion")
    procesosCapacitacion: ProcesosCapacitacionComponent;

    @ViewChild("documentoCapacitacion")
    documentoCapacitacion: DocumentacionCapacitacionComponent;

    @ViewChild("asistentesExternos")
    asistentesExternos: CapacitacionAsistentesExternosComponent;

    @ViewChild("editAsistenteExterno")
    editAsistenteExterno: EditAsistentesExternosDialogComponent;

    @ViewChild("asistentesInternos")
    asistentesInternos: CapacitacionAsistentesInternosComponent;

    @ViewChild("editAsistenteInterno")
    editAsistenteInterno: EditAsistentesInternosDialogComponent;

    @ViewChild("capacitadoresExternos")
    capacitadoresExternos: CapacitacionCapacitadoresExternosComponent;

    @ViewChild("editCapacitadoresExterno")
    editCapacitadoresExterno: EditCapacitadoresExternosDialogComponent;

    @ViewChild("createCapacitadorI")
    capacitadoresInternos: CapacitacioncapacitadoresInternosComponent;

    @ViewChild("editCapacitadorInterno")
    editCapacitadorInterno: EditCapacitadoresInternosDialogComponent;

    constructor(
        private capacitacionesService: CapacitacionesService,
        private capacitacionProcesoService: CapacitacionProcesoService,
        private documentacionService: DocumentacionCapacitacionService,
        private capacitacionAE: CapacitacionAsistentesExternosService,
        private capacitacionAI: CapacitacionAsistentesInternosService,
        private capacitacionCE: CapacitacionCapacitadoresExternosService,
        private capacitacionCI: CapacitacionCapacitadoresInternosService,
        private hasPermisionService: HasPermisionService,
        private store: Store<StoreModel>
    ) {}

    ngOnInit() {
        this.loadInitData();
    }

    getCapacitacion(id: number) {
        return this.capacitacionesService.getCapacitacion(id);
    }

    loadInitData() {
        this.showWaitDialog(
            "Consultado detalle de la validación un momento por favor..."
        );

        let aux = forkJoin([
            this.getIdCapacitacionRoute(),
            this.getProcesos(),
            this.getAsistentesInternos(),
            this.getCapacitadoresInternos()
        ]);

        aux.subscribe(
            ([
                idCapacitacion,
                procesos,
                asistenteInternos,
                capacitadorInterno
            ]) => {
                this.getCapacitacion(idCapacitacion.state.params.id).subscribe(
                    capacitacion => {
                        this.procesos = procesos;
                        this.loadedCapacitaciones = capacitacion;
                        this.asistenteInterno = asistenteInternos;
                        this.capacitadorInterno = capacitadorInterno;

                        this.editCapacitacion.loadForm(capacitacion);

                        this.refreshListaProcesos();
                        this.hideWaitDialog();

                        setTimeout(time => {
                            this.capacitadoresInternos.filtrarUsuariosInternos(
                                capacitacion.capacitadores_internos
                            );
                            this.asistentesInternos.filtrarUsuariosInternos(
                                capacitacion.asistentes_internos
                            );
                        }, 1);
                    }
                );
            }
        );
    }

    getIdCapacitacionRoute() {
        return this.store.select(fromRoute.getRouterState).pipe(take(1));
    }

    refreshListaProcesos() {
        this.procesos = this.procesos.filter(
            ele =>
                !this.loadedCapacitaciones.procesos.find(
                    ele2 => ele.id == ele2.id
                )
                    ? ele
                    : null
        );
    }

    getProcesos() {
        return this.capacitacionesService.getProcesos();
    }

    getAsistentesexternos() {
        return this.capacitacionAE.getAsistentesexternos();
    }

    getAsistentesInternos() {
        return this.capacitacionAI.getAsistentesinternos();
    }
    getCapacitadoresInternos() {
        return this.capacitacionCI.getCapacitadoresInternos();
    }

    onUpdate(capacitacion: CapacitacionModel) {
        this.capacitacionesService
            .onUpdate(capacitacion.id, capacitacion)
            .subscribe(response => {
                this.loadedCapacitaciones = response;
            });
    }
    onDeleteProceso(id: number) {
        this.capacitacionProcesoService
            .deleteCapacitacionProcesobyId(id)
            .subscribe(response => {
                let procesoEliminado;
                this.loadedCapacitaciones.procesos = this.loadedCapacitaciones.procesos.filter(
                    proceso => {
                        if (proceso.pivot.id != id) {
                            return proceso;
                        } else {
                            procesoEliminado = proceso;
                        }
                    }
                );

                this.procesos.push(procesoEliminado);
                this.refreshListaProcesos();
            });
    }

    showWaitDialog(header: string, body?: string) {
        this.store.dispatch(new fromShared.ShowWaitDialog({ header, body }));
    }

    hideWaitDialog() {
        this.store.dispatch(new fromShared.HideWaitDialog());
    }

    onUpdateproceso(proceso: MapaProcesoHijoModel) {
        this.capacitacionesService
            .addProcesoCapacitacion(this.loadedCapacitaciones.id, proceso)
            .subscribe(response => {
                this.procesos = this.procesos.filter(
                    ele => proceso.id != ele.id
                );
                proceso.pivot = response;
                this.loadedCapacitaciones.procesos.push(proceso);
            });
    }

    //asistente Externo
    onCreateAE(asistenteExterno) {
        this.capacitacionAE
            .createAsistenteExterno(
                asistenteExterno,
                this.loadedCapacitaciones.id
            )
            .subscribe(response => {
                this.loadedCapacitaciones.asistentes_externos = [
                    ...this.loadedCapacitaciones.asistentes_externos,
                    response
                ];
            });
    }
    onUpdateAE(asistenteExterno: CapacitacionAsistenteExternoModel) {
        this.capacitacionAE
            .updateAsistenteExterno(asistenteExterno.id, asistenteExterno)
            .subscribe(response => {
                return (this.loadedCapacitaciones.asistentes_externos = this.loadedCapacitaciones.asistentes_externos.map(
                    ele => {
                        return ele.id == response.id ? response : ele;
                    }
                ));
            });
    }

    onDeleteAE(asistenteExterno: CapacitacionAsistenteExternoModel) {
        this.capacitacionAE
            .deleteAsistenteExterno(asistenteExterno.id)
            .subscribe(response => {
                this.loadedCapacitaciones.asistentes_externos = this.loadedCapacitaciones.asistentes_externos.filter(
                    ele => ele.id != response.id
                );
            });
    }

    //asistente interno

    onCreateAI(asistentesInternos: CapacitacionAsistenteInternoModel[]) {
        this.capacitacionAI
            .createAsistenteInterno(
                asistentesInternos,
                this.loadedCapacitaciones.id
            )
            .subscribe(response => {
                this.loadedCapacitaciones.asistentes_internos = [
                    ...this.loadedCapacitaciones.asistentes_internos,
                    ...response
                ];
                let asistentesInterno: UsuarioModel[] = this.asistentesInternos.filtrarUsuariosInternos(
                    this.loadedCapacitaciones.asistentes_internos
                );
                this.asistenteInterno = [...asistentesInterno];
            });
    }

    onDeleteAI(id: number) {
        this.capacitacionAI.deleteAsistenteinterno(id).subscribe(response => {
            this.loadedCapacitaciones.asistentes_internos = this.loadedCapacitaciones.asistentes_internos.filter(
                ele => ele.id != response.id
            );
        });
    }

    onUpdateAI(asistenteInterno: CapacitacionAsistenteInternoModel) {
        this.capacitacionAI
            .updateAsistenteinterno(asistenteInterno.id, asistenteInterno)
            .subscribe(response => {
                this.loadedCapacitaciones.asistentes_internos = this.loadedCapacitaciones.asistentes_internos.map(
                    ele => {
                        if (ele.id == response.id) {
                            ele.calificacion = response.calificacion;
                        }
                        return ele;
                    }
                );
            });
    }

    //capacitadores externos

    onCreateCE(capacitadorExterno) {
        this.capacitacionCE
            .createCapacitadorExterno(
                capacitadorExterno,
                this.loadedCapacitaciones.id
            )
            .subscribe(response => {
                this.loadedCapacitaciones.capacitadores_externos = [
                    ...this.loadedCapacitaciones.capacitadores_externos,
                    response
                ];
            });
    }

    onUpdateCE(capacitadorExterno: CapacitacionCapacitadorExternoModel) {
        this.capacitacionCE
            .updateCapacitadorExterno(capacitadorExterno.id, capacitadorExterno)
            .subscribe(response => {
                return (this.loadedCapacitaciones.capacitadores_externos = this.loadedCapacitaciones.capacitadores_externos.map(
                    ele => {
                        return ele.id == response.id ? response : ele;
                    }
                ));
            });
    }

    onDeleteCE(capacitadorExterno: CapacitacionCapacitadorExternoModel) {
        this.capacitacionCE
            .deleteCapacitadorExterno(capacitadorExterno.id)
            .subscribe(response => {
                this.loadedCapacitaciones.capacitadores_externos = this.loadedCapacitaciones.capacitadores_externos.filter(
                    ele => ele.id != response.id
                );
            });
    }

    //capacitadores internos

    onCreateCI(capacitadoresInternos: CapacitacionCapacitadorInternoModel[]) {
        this.capacitacionCI
            .createCapacitadorInterno(
                capacitadoresInternos,
                this.loadedCapacitaciones.id
            )
            .subscribe(response => {
                this.loadedCapacitaciones.capacitadores_internos = [
                    ...this.loadedCapacitaciones.capacitadores_internos,
                    ...response
                ];
                let capacitadorInterno: UsuarioModel[] = this.capacitadoresInternos.filtrarUsuariosInternos(
                    this.loadedCapacitaciones.capacitadores_internos
                );
                this.capacitadorInterno = [...capacitadorInterno];
            });
    }

    onDeleteCI(id: number) {
        this.capacitacionCI.deleteCapacitadorInterno(id).subscribe(response => {
            this.loadedCapacitaciones.capacitadores_internos = this.loadedCapacitaciones.capacitadores_internos.filter(
                ele => ele.id != response.id
            );
        });
    }

    onUpdateCI(capacitadorInterno: CapacitacionCapacitadorInternoModel) {
        this.capacitacionCI
            .updateCapacitadorInterno(capacitadorInterno.id, capacitadorInterno)
            .subscribe(response => {
                this.loadedCapacitaciones.capacitadores_internos = this.loadedCapacitaciones.capacitadores_internos.map(
                    ele => {
                        if (ele.id == response.id) {
                            ele.calificacion = response.calificacion;
                        }
                        return ele;
                    }
                );
            });
    }
    showCI(capacitadorInterno: CapacitacionCapacitadorInternoModel) {
        this.editCapacitadorInterno.show(capacitadorInterno);
    }

    showCE(capacitadorExterno: CapacitacionCapacitadorExternoModel) {
        this.editCapacitadoresExterno.show(capacitadorExterno);
    }

    showAI(asistenteInterno: CapacitacionAsistenteInternoModel) {
        this.editAsistenteInterno.show(asistenteInterno);
    }

    showAE(asistenteExterno: CapacitacionAsistenteExternoModel) {
        this.editAsistenteExterno.show(asistenteExterno);
    }

    //documentos

    uploadDocumentos(files: File[]) {
        this.showWaitDialog("Agregando documento, un momento por favor...");

        const form: FormData = new FormData();
        files.forEach(archivo => {
            form.append("uploads[]", archivo, archivo.name);
        });

        this.documentacionService
            .uploadDocumentos(this.loadedCapacitaciones.id, form)
            .subscribe(response => {
                this.loadedCapacitaciones.documentos = [
                    ...this.loadedCapacitaciones.documentos,
                    ...response
                ];
                this.documentoCapacitacion.fu.clear();
                this.hideWaitDialog();
            });
    }

    deleteUsuarioDocumento(event: CapacitacionAdjuntoModel) {
        this.showWaitDialog("Eliminando documento, un momento por favor...");
        this.documentacionService
            .deleteDocumento(event.id)
            .subscribe(response => {
                this.loadedCapacitaciones.documentos = this.loadedCapacitaciones.documentos.filter(
                    element => element.id != event.id
                );
                this.hideWaitDialog();
            });
    }

    downloadDocumento(event: CapacitacionAdjuntoModel) {
        this.documentacionService
            .downloadDocumento({ path: event.path })
            .subscribe(file => {
                const blob = new Blob([file], { type: file.type });

                var url = window.URL.createObjectURL(blob);
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.setAttribute("style", "display: none");
                a.href = url;
                a.download = event.titulo;
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove(); // remove the element
                this.hideWaitDialog();
            });
    }

    consultarDocumentoCapacitacion(event: CapacitacionAdjuntoModel) {
        const id_tipo_documento =
            environment.tipos_documento.documento_capacitacion.id;
        this.store.dispatch(
            new fromRoot.Go({
                path: [
                    `visor-adjunto/${id_tipo_documento}/${event.id}/${
                        event.titulo
                    }`
                ]
            })
        );
    }

    hasPermision(id: number) {
        return this.hasPermisionService.hasPermision(id);
    }
}
