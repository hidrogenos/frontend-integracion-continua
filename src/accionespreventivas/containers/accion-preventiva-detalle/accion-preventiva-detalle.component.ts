import { Component, ViewChild, OnInit } from "@angular/core";
import { AccionPreventivaModel } from "../../../shared/models/accion-preventiva.model";
import { AccionImportanciaModel } from "../../../shared/models/accion-importancia.model";
import { UsuarioService, HasPermisionService } from "../../../shared/services";
import {
    AccionPreventivaDetalleService,
    AccionPreventivaListaService
} from "../../services";
import { ComponenteCargado } from "../../../shared/services/utils/abstract-clases/ComponenteCargado";
import {
    EditAccionPreventivaComponent,
    RelacionarProcesoComponent,
    CreateDocumentoAccionPreventivaComponent,
    CreateMetodologiaAnalisisComponent,
    AnularAccionPreventivaComponent,
    AsignarAccionPreventivaDialogComponent,
    CreateAccionPreventivaTareaDialogComponent,
    EditAccionPreventivaTareaDialogComponent,
    AccionesTareasListaComponent
} from "../../components";

// store
import { StoreModel } from "../../../shared/models/store.model";
import { Store } from "@ngrx/store";
import * as fromRootStore from "./../../../app/store";
import { forkJoin } from "rxjs";
import { map, finalize, switchMap, tap, take } from "rxjs/operators";

// models
import { AccionPreventivaProcesoModel } from "../../../shared/models/accion-preventiva-proceso.model";
import { MapaProcesoHijoModel } from "../../../shared/models/mapa_proceso_hijo.model";
import { AccionPreventivaAdjuntoModel } from "../../../shared/models/accion-preventiva-adjunto.model";
import { AccionAnalisisTipoModel } from "../../../shared/models/accion-analisis-tipo.model";
import { AccionPreventivaAnalisisModel } from "../../../shared/models/accion-preventiva-analisis.model";
import { AccionPreventivaAnalisisHijoModel } from "../../../shared/models/accion-preventiva-analisis-hijo.model";
import { FormArray } from "@angular/forms";
import { AccionPreventivaTareaModel } from "../../../shared/models/accion-preventiva-tarea.model";
import { AccionPreventivaTareaTipoModel } from "../../../shared/models/accion-preventiva-tarea-tipo.model";
import { UsuarioModel } from "../../../shared/models/usuario.model";
import { AccionPreventivaAnalisisHijo5wsModel } from "../../../shared/models/accion-preventiva-analisis-hijo-5ws";
import { AccionPreventivaTareaAdjuntoModel } from "../../../shared/models/accion-preventiva-tarea-adjunto.model";
import { THIS_EXPR, IfStmt } from "@angular/compiler/src/output/output_ast";
import { environment } from "../../../environments/environment";

@Component({
    selector: "accion-preventiva-detalle",
    template: `<div class="ui-g">
                    <div class="ui-g-12">
                        <edit-accion-preventiva #edit
                                                [accionPreventiva]="accionPreventivaActual"
                                                [importancias]="importancias"
                                                (onEditAccionPreventiva)="updateAccionPreventiva($event)">
                        </edit-accion-preventiva>
                    </div>
                </div>
                <div class="ui-g">
                    <div class="ui-g-12">
                        <div class="card card-w-title">
                            <relacionar-proceso #relate
                                                [data]="accionPreventivaActual?.procesos" 
                                                [procesos]="procesos"
                                                [loadingProcesos]="loadingProcesos"
                                                [cols]="colsAccionPreventivaProceso"
                                                [rows]="10"
                                                (onRelateProceso)="addProcesoToAccionPreventiva($event)"
                                                (onDeleteProcesoFromAccionPreventiva)="deleteProcesoFromAccionPreventiva($event)"
                                                ></relacionar-proceso>
                            </div>
                    </div>
                </div>

                <div class="ui-g" *ngIf="idAccionPreventivaEstado >= ACCION_EN_CALIDAD">
                    <div class="ui-g-12">
                        <div class="card card-w-title">
                            <create-accion-preventiva-documento #documentos 
                                                                [documentos]="documentosAccionPreventiva"
                                                                (onCreateDocumentoAccionPreventiva)="uploadDocumentosToAccionPreventiva($event)"
                                                                (onDeleteDocumentoAccionPreventiva)="deleteDocumentoFromAccionPreventiva($event)"
                                                                (onDownloadDocumentoAccionPreventiva)="downloadDocumentoFromAccionPreventiva($event)"
                                                                (onConsultarAccionPreventivaAdjunto)="consultarAdjuntoFromAccionPreventiva($event)">
                            </create-accion-preventiva-documento>
                        </div>
                    </div>
                </div>

                <div class="ui-g" *ngIf="idAccionPreventivaEstado >= ACCION_EN_ANALISIS && idAccionPreventivaEstado < ACCION_EN_REASIGNACION">
                    <div class="ui-g-12">
                        <div class="card card-w-title">
                            <create-metodologia-analisis #metodologia [metodologias]="metodologias"
                                                         [metodologiaActual]="accionPreventivaAnalisisActual"
                                                         [causas]="accionPreventivaAnalisisHijos"
                                                         (onCreateAccionAnalisisHijos5ws)="createAccionAnalisisHijo5ws($event)"
                                                         (onCreateAccionAnalisis)="createAccionAnalisis($event)"
                                                         (onCreateAccionAnalisisHijos)="createAccionAnalisisHijos($event)"
                                                         (onCreateOnlyAccionAnalisisHijo)="createAccionAnalisisHijo($event)"
                                                         (onUpdateAccionAnalisisHijo)="createOrUpdateAccionAnalisisHijo($event)"
                                                         [stepsItems]="stepsItems">
                            </create-metodologia-analisis>
                        </div>
                    </div>
                </div>
                <div class="ui-g" *ngIf="(idAccionPreventivaEstado >= ACCION_EN_ASIGNACION_ACTIVIDADES) && (idAccionPreventivaEstado < ACCION_EN_REASIGNACION)">
                    <div class="ui-g-12">
                        <div class="card card-w-title">
                        <div class="ui-g">
                            <div class="ui-g-12 text-aling-right" *ngIf="idAccionPreventivaEstado == ACCION_EN_ASIGNACION_ACTIVIDADES && (usuarioActual?.id == accionPreventivaActual?.id_responsable || (hasPermission(401) | async))">
                                 <button pButton icon="pi pi-plus" class="ui-button" type="button" (click)="crearTareaAccionPreventivaComponent.display=true" label="Crear tarea"> </button>
                            </div>
                        </div>
                            <acciones-tareas-lista #listaTareas [data]="accionPreventivaActual.tareas"
                                                   [idEstadoAccionPreventiva]="accionPreventivaActual?.id_estado"
                                                   [accionPreventivaTareaTipos]="tareaTipos"
                                                   [usuariosResponsables]="usuarios"
                                                   [usuarioActual]="usuarioActual"
                                                   [permisoRealizarTarea]="(hasPermission(401) | async)"
                                                   (onUpdateAccionPreventivaTarea)="updateAccionPreventivaTarea($event)"
                                                   (onDeleteAccionPreventivaTarea)="deleteAccionPreventivaTarea($event)"
                                                   (onUploadAdjuntoTarea)="uploadAdjuntosByAccionPreventivaTarea($event)"
                                                   (onDownloadAdjuntoTarea)="downloadAdjuntoByAccionPreventivaTarea($event)"
                                                   (onDeleteAdjuntoTarea)="deleteAdjuntoByAccionPreventivaTarea($event)"
                                                   (onConsultarTareaAdjunto)="consultarAdjuntoFromAccionPreventivaTarea($event)"
                                                   (onFinishTarea)="realizarAccionPreventivaTarea($event)"

                                                   rows="10">
                            </acciones-tareas-lista>
                        </div>
                    </div>
                </div>

                <div class="ui-g" *ngIf="idAccionPreventivaEstado == ACCION_EN_ASIGNACION_ACTIVIDADES">
                    <div class="ui-g-12">
                        <create-accion-preventiva-tarea-dialog #crearTarea
                                                            [accionPreventivaTareaTipos]="tareaTipos"
                                                            [usuariosResponsables]="usuarios"
                                                            (onCreateAccionPreventivaTarea)="createAccionPreventivaTarea($event)" ></create-accion-preventiva-tarea-dialog>
                    </div>
                </div>

                <div class="ui-g">
                    <div class="ui-g-12">
                        <p-toolbar>
                            
                            <div class="ui-toolbar">
                                <div class="ui-g ui-fluid" *ngIf="(idAccionPreventivaEstado == ACCION_EN_CREACION) && accionPreventivaActual?.id_usuario_crea == usuarioActual?.id ">
                                    <div class="ui-g-6">
                                        <button pButton class="ui-button" label="Enviar a calidad" (click)="actualizarEstadoAccionPreventiva(ACCION_EN_CALIDAD)"></button>
                                    </div>
                                    <div class="ui-g-6">
                                        <button pButton class="ui-button-danger" label="Anular" (click)="anular.displayAnularAccion=true"></button>
                                    </div>
                                </div>  
                            </div>
                            <div class="ui-g ui-fluid" *ngIf="(idAccionPreventivaEstado == ACCION_EN_CALIDAD ||
                                                              idAccionPreventivaEstado == ACCION_EN_REASIGNACION) && usuarioActual?.es_jefe">
                                <div class="ui-g-6">
                                    <button pButton class="ui-button" label="Asignar acción" (click)="asignarAccionPreventivaComponent.display=true;"></button>
                                </div>
                                <div class="ui-g-6">
                                    <button pButton class="ui-button-danger" label="Anular" (click)="anular.displayAnularAccion=true"></button>
                                </div>
                            </div>
                            <div class="ui-g ui-fluid" *ngIf="(idAccionPreventivaEstado == ACCION_ASIGNADA) && (usuarioActual?.id == accionPreventivaActual?.id_responsable || (hasPermission(401) | async))">
                                <div class="ui-g-6">
                                    <button pButton class="ui-button" label="Iniciar análisis" (click)="actualizarEstadoAccionPreventiva(ACCION_EN_ANALISIS)"></button>
                                </div>
                                <div class="ui-g-6">
                                    <button pButton class="ui-button-danger" label="Solicitar reasignación" (click)="actualizarEstadoAccionPreventiva(ACCION_EN_REASIGNACION)"></button>
                                </div>
                            </div>

                            <div class="ui-g ui-fluid" *ngIf="accionPreventivaActual?.metodologia_analisis && usuarioActual && comprobarSiFinalizarAnalisis()">
                                <div class="ui-g-12">
                                    <button pButton class="ui-button" label="Finalizar análisis y crear tareas" (click)="actualizarEstadoAccionPreventiva(ACCION_EN_ASIGNACION_ACTIVIDADES)"></button>
                                </div>
                            </div>

                            <!-- <div class="ui-g ui-fluid" *ngIf="(idAccionPreventivaEstado == ACCION_EN_ASIGNACION_ACTIVIDADES) && (usuarioActual?.id == accionPreventivaActual?.id_responsable)">
                                <div class="ui-g-12">
                                    <button pButton class="ui-button" label="Finalizar ingreso de tareas" (click)="actualizarEstadoAccionPreventiva(ACCION_EN_DESARROLLO_TAREAS)"></button>
                                </div>
                            </div> -->

                            <div class="ui-g ui-fluid" *ngIf="(idAccionPreventivaEstado == ACCION_EN_ASIGNACION_ACTIVIDADES) && (usuarioActual?.id == accionPreventivaActual?.id_responsable || (hasPermission(401) | async)) && finishedTareaPermiso">
                                <div class="ui-g-12">
                                    <button pButton class="ui-button" label="Finalizar acción" (click)="actualizarEstadoAccionPreventiva(ACCION_FINALIZADA)"></button>
                                </div>
                            </div>

                        </p-toolbar>
                    <div>
                </div>

                <div class="ui-g">
                    <div class="ui-g-12">
                        <anular-accion-preventiva-dialog #anular
                                                         [accionPreventivaActual]="accionPreventivaActual"
                                                         (onAnularAccionPreventiva)="anularAccionPreventiva($event)"
                        > </anular-accion-preventiva-dialog>
                    <div>
                </div>

                <div class="ui-g">
                    <div class="ui-g-12">
                        <asignar-accion-preventiva-dialog #asignarAccionPreventivaComponent
                            *ngIf="accionPreventivaActual"
                                                         [jefesProcesosHijos]="jefesProcesosHijos"
                                                         [accionPreventivaActual]="accionPreventivaActual"
                                                         (onAsignarAccionPreventiva)="asignarAccionPreventiva($event)"
                        > </asignar-accion-preventiva-dialog>
                    <div>
                </div>
                `
})
export class AccionPreventivaDetalleComponent extends ComponenteCargado
    implements OnInit {
    // constantes estados de una acción
    readonly ACCION_EN_CREACION = 1;
    readonly ACCION_EN_CALIDAD = 2;
    readonly ACCION_ASIGNADA = 3;
    readonly ACCION_EN_ANALISIS = 4;
    readonly ACCION_EN_ASIGNACION_ACTIVIDADES = 5;
    readonly ACCION_EN_DESARROLLO_TAREAS = 6;
    readonly ACCION_FINALIZADA = 7;
    readonly ACCION_EN_REASIGNACION = 8;
    readonly ACCION_ANULADA = 9;

    readonly METODOLOGIA_ANALISIS_NO_APLICA = 3;

    // labels
    colsAccionPreventivaProceso: any[];

    stepsItems: any[];

    finishedTareaPermiso: boolean;

    // atributos clase

    usuarioActual: UsuarioModel;

    // listas para utilizar

    importancias: AccionImportanciaModel[];

    procesos: MapaProcesoHijoModel[];

    metodologias: AccionAnalisisTipoModel[];

    tareaTipos: AccionPreventivaTareaTipoModel[];

    usuarios: UsuarioModel[];

    jefesProcesosHijos: MapaProcesoHijoModel[];

    loadingProcesos: boolean;

    // relaciones de accion preventiva

    accionPreventivaActual: AccionPreventivaModel;

    idAccionPreventivaEstado: number;

    accionPreventivaAnalisisActual: AccionPreventivaAnalisisModel;

    accionPreventivaAnalisisHijos: AccionPreventivaAnalisisHijoModel[];

    procesosAccionPreventiva: AccionPreventivaProcesoModel[];

    documentosAccionPreventiva: AccionPreventivaAdjuntoModel[];

    accionPreventivaTareas: AccionPreventivaTareaModel[];

    // Hijos
    @ViewChild("edit")
    editAccionPreventivaComponent: EditAccionPreventivaComponent;

    @ViewChild("relate")
    relateAccionPreventivaComponent: RelacionarProcesoComponent;

    @ViewChild("documentos")
    documentComponent: CreateDocumentoAccionPreventivaComponent;

    @ViewChild("metodologia")
    metodologiaComponent: CreateMetodologiaAnalisisComponent;

    @ViewChild("anular")
    anularAccionPreventivaComponent: AnularAccionPreventivaComponent;

    @ViewChild("asignarAccionPreventivaComponent")
    asignarAccionPreventivaComponent: AsignarAccionPreventivaDialogComponent;

    @ViewChild("crearTarea")
    crearTareaAccionPreventivaComponent: CreateAccionPreventivaTareaDialogComponent;

    @ViewChild("listaTareas")
    accionesTareasListaComponent: AccionesTareasListaComponent;

    constructor(
        private accionPreventivaListaService: AccionPreventivaListaService,
        private accionPreventivaDetalleService: AccionPreventivaDetalleService,
        private usuarioService: UsuarioService,
        private hasPermisosService: HasPermisionService,
        private store: Store<StoreModel>
    ) {
        super(store);
    }

    ngOnInit() {
        this.loadInitData();
    }

    loadInitData() {
        this.showWaitDialog(
            "Acción en proceso",
            "Consultado datos requeridos, un momento por favor..."
        );

        this.loadingProcesos = true;
        this.finishedTareaPermiso = false;

        this.colsAccionPreventivaProceso = [
            { field: "nombre", header: "Nombre proceso" }
        ];

        this.stepsItems = [
            { label: "Seleccione una metodología" },
            { label: "Ingrese las ideas asociadas" },
            { label: "Ajuste los cambios" }
        ];

        this.store
            .select(fromRootStore.getRouterState)
            .pipe(
                map(RouterState => RouterState.state.params.id),
                take(1)
            )
            .subscribe(routerId => {
                let aux = forkJoin([
                    this.getImportancias(),
                    this.getProcesos(),
                    this.getTiposAnalisis(),
                    this.getAccionPreventiva(routerId)
                ]);

                aux.subscribe(
                    ([
                        importancias,
                        procesos,
                        tiposAnalisis,
                        accionPreventiva
                    ]) => {
                        //Variables independientes de acción preventiva
                        this.importancias = importancias;
                        this.metodologias = tiposAnalisis;
                        this.procesos = procesos.filter(
                            procesoActual =>
                                !accionPreventiva.procesos.find(
                                    procesoAccionPreventivaA =>
                                        procesoAccionPreventivaA.id_mapa_procesos ==
                                        procesoActual.id
                                )
                        );

                        // Variables dependientes de accionPreventiva
                        this.accionPreventivaActual = accionPreventiva;
                        this.idAccionPreventivaEstado =
                            accionPreventiva.id_estado;
                        this.documentosAccionPreventiva =
                            accionPreventiva.documentos;
                        this.accionPreventivaAnalisisActual =
                            accionPreventiva.metodologia_analisis;
                        this.accionPreventivaTareas = [
                            ...accionPreventiva.tareas
                        ];

                        setTimeout(() => {
                            this.editAccionPreventivaComponent.setDataAccionPreventiva(
                                this.accionPreventivaActual
                            );
                            this.loadingProcesos = false;

                            if (
                                accionPreventiva.metodologia_analisis &&
                                this.metodologiaComponent
                            ) {
                                this.accionPreventivaAnalisisHijos = accionPreventiva.metodologia_analisis.analisis_hijo.map(
                                    hijoActual => {
                                        let padreTempo =
                                            hijoActual.padre != null
                                                ? {
                                                      id: hijoActual.padre.id,
                                                      pregunta_causa_idea:
                                                          hijoActual.padre
                                                              .pregunta_causa_idea
                                                  }
                                                : {
                                                      id: 0,
                                                      pregunta_causa_idea:
                                                          "Causa inicial"
                                                  };
                                        return padreTempo;
                                    }
                                );

                                let accionPreventivaAnalisisHijos2 = accionPreventiva.metodologia_analisis.analisis_hijo.map(
                                    hijoActual => {
                                        let padreTempo =
                                            hijoActual.padre != null
                                                ? {
                                                      id: hijoActual.padre.id,
                                                      pregunta_causa_idea:
                                                          hijoActual.padre
                                                              .pregunta_causa_idea
                                                  }
                                                : {
                                                      id: 0,
                                                      pregunta_causa_idea:
                                                          "Causa inicial"
                                                  };

                                        const hijo = {
                                            ...hijoActual,
                                            padre: padreTempo
                                        };
                                        return hijo;
                                    }
                                );
                                // Validación estado wizard
                                if (this.accionPreventivaAnalisisActual) {
                                    if (this.metodologiaComponent) {
                                        let stepsComponent = this
                                            .metodologiaComponent.stepComponent;
                                        stepsComponent.activeIndex = 1;
                                        if (
                                            this.accionPreventivaActual
                                                .metodologia_analisis
                                                .id_accion_analisis_tipo ==
                                            this.METODOLOGIA_ANALISIS_NO_APLICA
                                        ) {
                                            stepsComponent.activeIndex = 2;
                                        }
                                    }
                                }

                                switch (
                                    this.accionPreventivaAnalisisActual
                                        .id_accion_analisis_tipo
                                ) {
                                    case 1: {
                                        if (
                                            this.accionPreventivaActual
                                                .metodologia_analisis
                                                .analisis_hijo5ws.length > 0
                                        ) {
                                            this.metodologiaComponent.stepComponent.activeIndex = 2;
                                            this.metodologiaComponent.CincoWsComponent.setValue(
                                                this.accionPreventivaActual
                                                    .metodologia_analisis
                                                    .analisis_hijo5ws
                                            );
                                        }
                                        break;
                                    }
                                    case 2: {
                                        if (
                                            this.accionPreventivaAnalisisHijos
                                                .length > 0
                                        ) {
                                            this.metodologiaComponent.stepComponent.activeIndex = 2;
                                            this.metodologiaComponent.createFormularioAnalisisHijos(
                                                accionPreventivaAnalisisHijos2
                                            );

                                            this.metodologiaComponent.lockItems(
                                                true
                                            );
                                        } else {
                                            if (
                                                this.accionPreventivaActual
                                                    .metodologia_analisis
                                                    .id_accion_analisis_tipo ==
                                                2
                                            ) {
                                                this.createAccionAnalisisHijoByDefault(
                                                    this
                                                        .accionPreventivaAnalisisActual
                                                );
                                                this.metodologiaComponent.createFormularioAnalisisHijos(
                                                    this
                                                        .accionPreventivaAnalisisHijos
                                                );
                                            }
                                        }
                                        break;
                                    }
                                    default: {
                                        break;
                                    }
                                }
                            }
                            this.desabilitarComponentes();
                        }, 1);
                        this.hideWaitDialog();
                    }
                );

                let aux2 = forkJoin([
                    this.getAccionPreventivaTareaTipos(),
                    this.usuarioService.getUsuarios()
                ]);

                aux2.subscribe(([tareaTipos, usuarios]) => {
                    this.tareaTipos = tareaTipos;
                    this.usuarios = usuarios;
                });
            });
    }

    updateAccionPreventiva(data: AccionPreventivaModel) {
        this.showWaitDialog(
            "Acción en proceso",
            "Actualizando información acción preventiva, un momento por favor..."
        );
        this.accionPreventivaDetalleService
            .updateAccionPreventiva(data)
            .subscribe(response => {
                let auxIdAccionPreventiva = this.accionPreventivaActual
                    .id_estado;
                this.accionPreventivaActual = response;
                this.idAccionPreventivaEstado = this.accionPreventivaActual.id_estado;
                this.hideWaitDialog();
                this.desabilitarComponentes();

                if (
                    auxIdAccionPreventiva !=
                    this.accionPreventivaActual.id_estado
                ) {
                    switch (response.id_estado) {
                        case this.ACCION_EN_CALIDAD:
                        case this.ACCION_ASIGNADA:
                        case this.ACCION_EN_REASIGNACION:
                        case this.ACCION_ANULADA: {
                            this.getBackAccionesPreventivas();
                            break;
                        }
                        default: {
                        }
                    }
                }
            });
    }

    getAccionPreventiva(id: number) {
        return this.accionPreventivaDetalleService.getAccionPreventiva(id);
    }

    addProcesoToAccionPreventiva(data: MapaProcesoHijoModel[]) {
        this.showWaitDialog(
            "Acción en proceso",
            "Relacionando proceso a acción preventiva, un momento por favor..."
        );
        this.store
            .select(this.fromAuth.getUser)
            .pipe(take(1))
            .subscribe(usuario => {
                let accionPreventivaProcesos: AccionPreventivaProcesoModel[] = [];

                data.forEach(mapaProcesoHijo => {
                    let accionPreventivaProceso: AccionPreventivaProcesoModel = {
                        id_mapa_procesos: mapaProcesoHijo.id,
                        id_accion_preventiva: this.accionPreventivaActual.id,
                        id_usuario: usuario.id
                    };
                    accionPreventivaProcesos.push(accionPreventivaProceso);
                });

                this.accionPreventivaDetalleService
                    .addProcesoToAccionPreventiva(accionPreventivaProcesos)
                    .subscribe(procesosAccionPreventiva => {
                        this.accionPreventivaActual.procesos = [
                            ...this.accionPreventivaActual.procesos,
                            ...procesosAccionPreventiva
                        ];

                        this.procesos = this.procesos.filter(procesoActual => {
                            let procesoBuscado = this.accionPreventivaActual.procesos.find(
                                element =>
                                    procesoActual.id == element.id_mapa_procesos
                            );
                            if (!procesoBuscado) {
                                return procesoActual;
                            }
                        });

                        this.hideWaitDialog();
                    });
            });
    }

    deleteProcesoFromAccionPreventiva(data: AccionPreventivaProcesoModel) {
        this.showWaitDialog(
            "Acción en proceso",
            "Eliminando proceso de acción preventiva, un momento por favor..."
        );
        this.accionPreventivaDetalleService
            .deleteProcesoFromAccionPreventiva(data.id)
            .subscribe(procesoAccionPreventiva => {
                this.accionPreventivaActual.procesos = this.accionPreventivaActual.procesos.filter(
                    procesoActual => {
                        if (procesoActual.id != procesoAccionPreventiva.id) {
                            return procesoActual;
                        } else {
                            // const proceso:  MapaProcesoHijoModel= {
                            //     id: procesoActual.proceso.id,
                            //     proceso: procesoActual.proceso.proceso
                            // };

                            this.procesos = [
                                ...this.procesos,
                                procesoActual.proceso
                            ];
                        }
                    }
                );

                this.hideWaitDialog();
            });
    }

    uploadDocumentosToAccionPreventiva(files: File[]) {
        this.showWaitDialog(
            "Acción en proceso",
            "Realizando carga de documentos solicitados, un momento por favor..."
        );

        const form: FormData = new FormData();
        files.forEach(archivo => {
            form.append("uploads[]", archivo, archivo.name);
        });

        this.accionPreventivaDetalleService
            .uploadDocumentosByAccionPreventiva(
                this.accionPreventivaActual.id,
                form
            )
            .subscribe(response => {
                this.documentosAccionPreventiva = [
                    ...this.documentosAccionPreventiva,
                    ...response
                ];
                this.documentComponent.fu.clear();
                this.hideWaitDialog();
            });
    }

    downloadDocumentoFromAccionPreventiva(event: AccionPreventivaAdjuntoModel) {
        this.accionPreventivaDetalleService
            .downloadAccionPreventivaDocumento({ path: event.path })
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

    deleteDocumentoFromAccionPreventiva(event: AccionPreventivaAdjuntoModel) {
        this.showWaitDialog(
            "Accion en proceso",
            "Eliminando documento de acción preventiva"
        );
        this.accionPreventivaDetalleService
            .deleteDocumentoByAccionPreventiva(event.id)
            .subscribe(response => {
                this.documentosAccionPreventiva = this.documentosAccionPreventiva.filter(
                    documentos => documentos.id != response.id
                );
                this.hideWaitDialog();
            });
    }

    createAccionAnalisis(data: AccionAnalisisTipoModel) {
        this.showWaitDialog("Accion en proceso", "Creando nueva idea");
        this.store
            .select(this.fromAuth.getUser)
            .pipe(take(1))
            .subscribe(usuario => {
                const accionAnalisis: AccionPreventivaAnalisisModel = {
                    id_accion_preventiva: this.accionPreventivaActual.id,
                    id_accion_analisis_tipo: data.id,
                    id_usuario: usuario.id
                };
                this.accionPreventivaDetalleService
                    .crearAnalisisAccionPreventiva(accionAnalisis)
                    .subscribe(response => {
                        this.createAccionAnalisisHijoByDefault(response);
                        this.accionPreventivaAnalisisActual = response;
                        this.accionPreventivaActual.metodologia_analisis = response;
                        this.metodologiaComponent.createFormularioAnalisisHijos(
                            this.accionPreventivaAnalisisHijos
                        );
                        this.metodologiaComponent.stepComponent.activeIndex = 1;
                        if (
                            response.id_accion_analisis_tipo ==
                            this.METODOLOGIA_ANALISIS_NO_APLICA
                        ) {
                            this.metodologiaComponent.stepComponent.activeIndex = 2;
                        }
                        this.hideWaitDialog();
                    });
            });
    }

    createAccionAnalisisHijos(data: AccionPreventivaAnalisisHijoModel[]) {
        this.showWaitDialog(
            "Accion en proceso",
            "Creando nuevas ideas en análisis"
        );
        this.store.select(this.fromAuth.getUser).subscribe(usuario => {
            data.forEach(accionAnalisisHijoActual => {
                accionAnalisisHijoActual.id_usuario = usuario.id;

                if (accionAnalisisHijoActual.padre) {
                    accionAnalisisHijoActual.id_padre =
                        accionAnalisisHijoActual.padre.id;
                    accionAnalisisHijoActual.padre = undefined;
                }
            });

            this.accionPreventivaDetalleService
                .createAnalisisAccionPreventivaHijos(data)
                .subscribe(response => {
                    this.accionPreventivaAnalisisHijos = [
                        ...this.accionPreventivaAnalisisHijos,
                        ...response
                    ];
                    let cont: number = 0;
                    let ideas = this.metodologiaComponent.ideasForm.get(
                        "ideas"
                    ) as FormArray;

                    response.forEach(hijoActual => {
                        ideas.at(cont).setValue(hijoActual);
                        cont++;
                    });

                    this.accionPreventivaActual.metodologia_analisis.analisis_hijo = response;
                    this.metodologiaComponent.stepComponent.activeIndex = 2;
                    this.metodologiaComponent.lockItems(true);
                    this.hideWaitDialog();
                });
        });
    }

    createAccionAnalisisHijo5ws(data: AccionPreventivaAnalisisHijo5wsModel[]) {
        this.showWaitDialog(
            "Accion en proceso",
            "Creando nuevos porques, un momento por favor..."
        );
        this.store
            .select(this.fromAuth.getUser)
            .pipe(take(1))
            .subscribe(usuario => {
                data.forEach(accionAnalisisHijoActual => {
                    accionAnalisisHijoActual.id_usuario = usuario.id;
                    accionAnalisisHijoActual.id_accion_preventiva_analisis = this.accionPreventivaAnalisisActual.id;
                });

                this.accionPreventivaDetalleService
                    .createAnalisisAccionPreventivaHijos5ws(data)
                    .subscribe(response => {
                        this.accionPreventivaAnalisisHijos = response;
                        this.accionPreventivaActual.metodologia_analisis.analisis_hijo5ws = [
                            ...response
                        ];
                        this.metodologiaComponent.stepComponent.activeIndex = 2;
                    });
                this.hideWaitDialog();
            });
    }

    createAccionAnalisisHijo(data) {
        this.showWaitDialog("Accion en proceso", "Creando nuevo porque");
        this.store
            .select(this.fromAuth.getUser)
            .pipe(take(1))
            .subscribe(usuario => {
                data.hijo.id_usuario = usuario.id;
                data.hijo.id_padre = data.hijo.padre.id;

                this.accionPreventivaDetalleService
                    .createAnalisisAccionPreventivaHijos([{ ...data.hijo }])
                    .subscribe(response => {
                        let ideas = this.metodologiaComponent.ideasForm.get(
                            "ideas"
                        ) as FormArray;

                        let padreTempo =
                            response[0].padre != null
                                ? {
                                      id: response[0].padre.id,
                                      pregunta_causa_idea:
                                          response[0].padre.pregunta_causa_idea
                                  }
                                : {
                                      id: 0,
                                      pregunta_causa_idea: "Causa inicial"
                                  };

                        let hijoActual = response[0];
                        hijoActual.padre = padreTempo;

                        this.accionPreventivaAnalisisHijos = [
                            ...this.accionPreventivaAnalisisHijos,
                            hijoActual
                        ];

                        ideas.at(data.index).setValue(hijoActual);
                        this.hideWaitDialog();
                    });
            });
    }

    createOrUpdateAccionAnalisisHijo(data) {
        this.showWaitDialog(
            "Accion en proceso",
            "Actualizando información análisis"
        );
        this.store
            .select(this.fromAuth.getUser)
            .pipe(take(1))
            .subscribe(usuario => {
                data.hijo.id_accion_preventiva_analisis = this.accionPreventivaAnalisisActual.id;
                data.hijo.id_usuario = usuario.id;
                return this.accionPreventivaDetalleService
                    .createOrUpdateAnalisisAccionPreventivaHijos(
                        data.hijo.id,
                        data.hijo
                    )
                    .subscribe(response => {
                        let ideas = this.metodologiaComponent.ideasForm.get(
                            "ideas"
                        ) as FormArray;
                        const hijo = {
                            ...response,
                            padre: response.padre ? response.padre : null
                        };
                        ideas.at(data.index).setValue(hijo);
                        this.hideWaitDialog();
                    });
            });
    }

    createAccionPreventivaTarea(data: AccionPreventivaTareaModel) {
        this.showWaitDialog(
            "Accion en proceso",
            "Creando una nueva tarea, un momento por favor ..."
        );
        this.store
            .select(this.fromAuth.getUser)
            .pipe(take(1))
            .subscribe(usuario => {
                data.id_usuario = usuario.id;
                data.id_accion_preventiva = this.accionPreventivaActual.id;
                data.id_accion_preventiva_tarea_tipo = data.tipo.id;

                this.accionPreventivaDetalleService
                    .createAccionPreventivaTarea(data)
                    .subscribe(response => {
                        this.accionPreventivaTareas = [
                            ...this.accionPreventivaTareas,
                            response
                        ];
                        this.accionPreventivaActual.tareas.push(response);
                        this.comprobarSiFinalizada();
                        this.hideWaitDialog();
                    });
            });
    }

    updateAccionPreventivaTarea(data: AccionPreventivaTareaModel) {
        this.showWaitDialog(
            "Accion en proceso",
            "Actualizando información tarea acción preventiva"
        );
        this.accionPreventivaDetalleService
            .updateAccionPreventivaTarea(data.id, data)
            .subscribe(response => {
                this.accionPreventivaActual.tareas = this.accionPreventivaActual.tareas.map(
                    tareaActual =>
                        tareaActual.id == response.id ? response : tareaActual
                );
                this.comprobarSiFinalizada();
                this.hideWaitDialog();
            });
    }
    deleteAccionPreventivaTarea(data: AccionPreventivaTareaModel) {
        this.showWaitDialog(
            "Acción en proceso",
            "Eliminando tarea acción preventiva, un momento por favor..."
        );
        this.accionPreventivaDetalleService
            .deleteAccionPreventivaTarea(data.id)
            .subscribe(response => {
                this.accionPreventivaActual.tareas = this.accionPreventivaActual.tareas.filter(
                    tareaActual => tareaActual.id != response.id
                );

                this.comprobarSiFinalizada();
                this.hideWaitDialog();
            });
    }

    realizarAccionPreventivaTarea(data: AccionPreventivaTareaModel) {
        this.showWaitDialog(
            "Acción en proceso",
            "Cambiando estado acción preventiva realizado, un momento por favor..."
        );
        this.store
            .select(this.fromAuth.getUser)
            .pipe(take(1))
            .subscribe(usuario => {
                data.id_realizada_por = usuario.id;

                this.accionPreventivaDetalleService
                    .realizarAccionPreventivaTarea(data)
                    .subscribe(response => {
                        this.accionPreventivaActual.tareas = this.accionPreventivaActual.tareas.map(
                            tareaActual => {
                                if (tareaActual.id == response.id) {
                                    tareaActual = {
                                        ...tareaActual,
                                        ...response
                                    };
                                }
                                return tareaActual;
                            }
                        );
                        this.comprobarSiFinalizada();
                        this.hideWaitDialog();
                    });
            });
    }

    uploadAdjuntosByAccionPreventivaTarea(data: {
        idTarea: number;
        files: File[];
    }) {
        this.showWaitDialog(
            "Acción en proceso",
            "Cargando evidencias de una tarea, un momento por favor..."
        );

        const form: FormData = new FormData();

        data.files.forEach(archivo => {
            form.append("uploads[]", archivo, archivo.name);
        });

        this.accionPreventivaDetalleService
            .uploadAdjuntosByTarea(data.idTarea, form)
            .subscribe(response => {
                let adjuntos = this.accionPreventivaActual.tareas.find(
                    tareaActual => tareaActual.id == data.idTarea
                ).adjunto;

                if (adjuntos) {
                    this.accionPreventivaActual.tareas.find(
                        tareaActual => tareaActual.id == data.idTarea
                    ).adjunto = [...adjuntos, ...response];
                } else {
                    this.accionPreventivaActual.tareas.find(
                        tareaActual => tareaActual.id == data.idTarea
                    ).adjunto = [...response];
                }

                this.hideWaitDialog();
            });
    }

    downloadAdjuntoByAccionPreventivaTarea(
        data: AccionPreventivaTareaAdjuntoModel
    ) {
        this.showWaitDialog(
            "Acción en proceso",
            "descargando evidencia de una tarea, un momento por favor..."
        );
        this.accionPreventivaDetalleService
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
            });
    }

    deleteAdjuntoByAccionPreventivaTarea(data: {
        idTarea: number;
        data: AccionPreventivaTareaAdjuntoModel;
    }) {
        this.showWaitDialog(
            "Acción en proceso",
            "Eliminando evidencia de una tarea, un momento por favor..."
        );
        this.accionPreventivaDetalleService
            .deleteAdjuntoByTarea(data.data)
            .subscribe(adjuntoEliminado => {
                this.accionPreventivaActual.tareas.find(
                    tareaActual => tareaActual.id == data.idTarea
                ).adjunto = [
                    ...this.accionPreventivaActual.tareas
                        .find(tareaActual => tareaActual.id == data.idTarea)
                        .adjunto.filter(adjuntoActual => {
                            if (adjuntoActual.id != adjuntoEliminado.id) {
                                return adjuntoActual;
                            }
                        })
                ];
                this.hideWaitDialog();
            });
    }

    consultarAdjuntoFromAccionPreventiva(
        accionPreventivaAdjunto: AccionPreventivaAdjuntoModel
    ) {
        const idTipoDocumento =
            environment.tipos_documento.accion_preventiva_adjunto.id;
        this.store.dispatch(
            new fromRootStore.Go({
                path: [
                    `visor-adjunto/${idTipoDocumento}/${
                        accionPreventivaAdjunto.id
                    }/${accionPreventivaAdjunto.titulo}`
                ]
            })
        );
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
    // getProcesosByAccionPreventiva(id: number) {
    //     return this.accionPreventivaDetalleService.getProcesosByAccionPreventiva(id);
    // }

    // getDocumentosByAccionPreventiva(id: number) {
    //     return this.accionPreventivaDetalleService.getDocumentosByAccionPreventiva(id);
    // }

    getUsuarios() {
        return;
    }

    getImportancias() {
        return this.accionPreventivaListaService.getImportancias();
    }

    getProcesos() {
        return this.accionPreventivaListaService.getProcesos();
    }

    getTiposAnalisis() {
        return this.accionPreventivaDetalleService.getTiposAnalisis();
    }

    getAccionPreventivaTareaTipos() {
        return this.accionPreventivaDetalleService.getAccionPreventivaTareaTipos();
    }

    anularAccionPreventiva(data: AccionPreventivaModel) {
        this.accionPreventivaActual = {
            ...this.accionPreventivaActual,
            observacion: data.observacion
        };
        this.actualizarEstadoAccionPreventiva(this.ACCION_ANULADA);
    }

    asignarAccionPreventiva(data: AccionPreventivaModel) {
        this.accionPreventivaActual = {
            ...this.accionPreventivaActual,
            id_responsable: data.id_responsable
        };
        this.actualizarEstadoAccionPreventiva(this.ACCION_ASIGNADA);
    }

    actualizarEstadoAccionPreventiva(estadoNuevo) {
        let accionPreventiva: AccionPreventivaModel = {
            ...this.accionPreventivaActual
        };
        switch (estadoNuevo) {
            case this.ACCION_EN_CALIDAD: {
                accionPreventiva.id_estado = this.ACCION_EN_CALIDAD;
                this.updateAccionPreventiva(accionPreventiva);
                break;
            }
            case this.ACCION_ANULADA: {
                accionPreventiva.id_estado = this.ACCION_ANULADA;
                this.updateAccionPreventiva(accionPreventiva);
                break;
            }
            case this.ACCION_ASIGNADA: {
                accionPreventiva.id_estado = this.ACCION_ASIGNADA;
                this.updateAccionPreventiva(accionPreventiva);
                break;
            }
            case this.ACCION_EN_ANALISIS: {
                accionPreventiva.id_estado = this.ACCION_EN_ANALISIS;
                this.updateAccionPreventiva(accionPreventiva);
                break;
            }
            case this.ACCION_EN_REASIGNACION: {
                accionPreventiva.id_estado = this.ACCION_EN_REASIGNACION;
                this.updateAccionPreventiva(accionPreventiva);
                break;
            }
            case this.ACCION_EN_ASIGNACION_ACTIVIDADES: {
                accionPreventiva.id_estado = this.ACCION_EN_ASIGNACION_ACTIVIDADES;
                this.updateAccionPreventiva(accionPreventiva);
                break;
            }
            case this.ACCION_EN_DESARROLLO_TAREAS: {
                accionPreventiva.id_estado = this.ACCION_EN_DESARROLLO_TAREAS;
                this.updateAccionPreventiva(accionPreventiva);
                break;
            }
            case this.ACCION_FINALIZADA: {
                accionPreventiva.id_estado = this.ACCION_FINALIZADA;
                this.updateAccionPreventiva(accionPreventiva);
                break;
            }
            default: {
                break;
            }
        }
    }

    getBackAccionesPreventivas() {
        this.store.dispatch(
            new fromRootStore.Go({
                path: [`/acciones/acciones-preventivas`]
            })
        );
    }

    createAccionAnalisisHijoByDefault(response) {
        let causaDefault: AccionPreventivaAnalisisHijoModel = {
            pregunta_causa_idea: "Causa inicial",
            id: 0
        };

        let hijoModel: AccionPreventivaAnalisisHijoModel = {
            id: null,
            id_padre: 0,
            id_usuario: null,
            padre: causaDefault,
            pregunta_causa_idea: "",
            contribuyo: "",
            respuestas: "",
            id_accion_preventiva_analisis: response.id,
            fecha_creacion: null,
            created_at: null,
            updated_at: null
        };

        if (response.id_accion_analisis_tipo == 3) {
            hijoModel.id = 0;
            hijoModel.pregunta_causa_idea = "Causa inicial";
        }

        this.accionPreventivaAnalisisHijos = [hijoModel];

        this.metodologiaComponent.causas = [causaDefault];
    }

    desabilitarComponentes() {
        let estado = this.accionPreventivaActual.id_estado;
        this.store
            .select(this.fromAuth.getUser)
            .pipe(take(1))
            .subscribe(usuario => {
                this.usuarioActual = usuario;
                if (
                    estado == this.ACCION_EN_CREACION &&
                    usuario.id != this.accionPreventivaActual.id_usuario_crea
                ) {
                    this.editAccionPreventivaComponent.disableComponent();
                    this.relateAccionPreventivaComponent.disableComponent();
                }

                if (estado == this.ACCION_EN_CALIDAD && !usuario.es_jefe) {
                    this.editAccionPreventivaComponent.disableComponent();
                    this.relateAccionPreventivaComponent.disableComponent();
                    if (this.documentComponent) {
                        this.documentComponent.disableComponent();
                    }
                }
                this.hasPermission(401).subscribe(tienePermiso => {
                    if (
                        estado >= this.ACCION_ASIGNADA &&
                        (usuario.id !=
                            this.accionPreventivaActual.id_responsable &&
                            !tienePermiso)
                    ) {
                        if (this.metodologiaComponent) {
                            this.metodologiaComponent.disableComponent();
                        }
                        if (this.accionesTareasListaComponent) {
                            this.accionesTareasListaComponent.disableComponent();
                        }
                        if (this.documentComponent) {
                            this.documentComponent.disableComponent();
                        }
                    }
                });
            });

        if (estado > this.ACCION_EN_CALIDAD) {
            this.editAccionPreventivaComponent.disableComponent();
            this.relateAccionPreventivaComponent.disableComponent();
        }

        if (estado > this.ACCION_EN_ANALISIS) {
            if (this.metodologiaComponent) {
                this.metodologiaComponent.disableComponent();
            }
        }
        if (
            estado >= this.ACCION_FINALIZADA &&
            estado < this.ACCION_EN_REASIGNACION
        ) {
            this.documentComponent.disableComponent();
            this.accionesTareasListaComponent.disableComponent();
        }
        if (estado == this.ACCION_ANULADA) {
            if (this.documentComponent) {
                this.documentComponent.disableComponent();
            }
        }
        this.comprobarSiFinalizada();
    }
    comprobarSiFinalizarAnalisis() {
        let esResponsableAnalisis = false;
        let analisisFinalizado = false;
        this.hasPermission(401).subscribe(tienePermiso => {
            if (
                this.idAccionPreventivaEstado == this.ACCION_EN_ANALISIS &&
                (this.usuarioActual.id ==
                    this.accionPreventivaActual.id_responsable ||
                    tienePermiso)
            ) {
                esResponsableAnalisis = true;
            }
            if (
                (this.accionPreventivaActual.metodologia_analisis &&
                    ((this.accionPreventivaActual.metodologia_analisis
                        .analisis_hijo &&
                        this.accionPreventivaActual.metodologia_analisis
                            .analisis_hijo.length > 0) ||
                        (this.accionPreventivaActual.metodologia_analisis
                            .analisis_hijo5ws &&
                            this.accionPreventivaActual.metodologia_analisis
                                .analisis_hijo5ws.length > 0))) ||
                this.accionPreventivaActual.metodologia_analisis
                    .id_accion_analisis_tipo ==
                    this.METODOLOGIA_ANALISIS_NO_APLICA
            ) {
                analisisFinalizado = true;
            }
        });
        return esResponsableAnalisis && analisisFinalizado;
    }

    comprobarSiFinalizada() {
        let contadorTareasRealizadas: number = 0;
        this.accionPreventivaActual.tareas.forEach(tareaActual => {
            if (tareaActual.realizada) {
                contadorTareasRealizadas++;
            }
        });
        if (
            contadorTareasRealizadas ==
                this.accionPreventivaActual.tareas.length &&
            this.accionPreventivaActual.tareas.length > 0
        ) {
            this.finishedTareaPermiso = true;
        } else {
            this.finishedTareaPermiso = false;
        }
    }

    hasPermission(id: number) {
        return this.hasPermisosService.hasPermision(id);
    }
}
