import { Component, ViewChild, OnInit } from "@angular/core";
import { AccionCorrectivaModel } from "../../../shared/models/accion-correctiva.model";
import { AccionImportanciaModel } from "../../../shared/models/accion-importancia.model";
import {
    AccionCorrectivaService,
    UsuarioService,
    HasPermisionService
} from "../../../shared/services";
import {
    AccionesCorrectivasService,
    AccionesCorrectivasProcesoService,
    AccionesCorrectivasDocumentoService,
    AccionesCorrectivasAnalisisService,
    AccionesCorrectivasTareaService,
    AccionesCorrectivasTareaAdjuntoService
} from "../../services";
import { ComponenteCargado } from "../../../shared/services/utils/abstract-clases/ComponenteCargado";
import {
    EditAccionCorrectivaComponent,
    RelacionarProcesoComponent,
    CreateDocumentoAccionCorrectivaComponent,
    CreateMetodologiaAnalisisComponent,
    AnularAccionCorrectivaComponent,
    AsignarAccionCorrectivaComponent,
    CreateAccionCorrectivaTareaDialogComponent,
    EditAccionCorrectivaTareaDialogComponent,
    AccionesTareasListaComponent
} from "../../components";

// store
import { StoreModel } from "../../../shared/models/store.model";
import { Store } from "@ngrx/store";
import * as fromRootStore from "./../../../app/store";
import { forkJoin } from "rxjs";
import { map, finalize, switchMap, tap, take } from "rxjs/operators";

// models
import { AccionProcesoModel } from "../../../shared/models/accion-proceso.model";
import { MapaProcesoHijoModel } from "../../../shared/models/mapa_proceso_hijo.model";
import { AccionCorrectivaAdjuntoModel } from "../../../shared/models/accion-correctiva-adjunto.model";
import { AccionAnalisisTipoModel } from "../../../shared/models/accion-analisis-tipo.model";
import { AccionCorrectivaAnalisisModel } from "../../../shared/models/accion-correctiva-analisis.model";
import { AccionCorrectivaAnalisisHijoModel } from "../../../shared/models/accion-correctiva-analisis-hijo.model";
import { FormArray } from "@angular/forms";
import { AccionCorrectivaTareaModel } from "../../../shared/models/accion-correctiva-tarea.model";
import { AccionCorrectivaTareaTipoModel } from "../../../shared/models/accion-correctiva-tarea-tipo.model";
import { UsuarioModel } from "../../../shared/models/usuario.model";
import { AccionCorrectivaAnalisisHijo5wsModel } from "../../../shared/models/accion-correctiva-analisis-hijo-5ws";
import { AccionCorrectivaTareaAdjuntoModel } from "../../../shared/models/accion-correctiva-tarea-adjunto.model";
import { THIS_EXPR, IfStmt } from "@angular/compiler/src/output/output_ast";
import { environment } from "../../../environments/environment";

@Component({
    selector: "accion-correctiva-panel",
    template: `<div class="ui-g">
                    <div class="ui-g-12">
                        <edit-accion-correctiva #edit
                                                [accionCorrectiva]="accionCorrectivaActual"
                                                [importancias]="importancias"
                                                (onEditAccionCorrectiva)="updateAccionCorrectiva($event)">
                        </edit-accion-correctiva>
                    </div>
                </div>
                <div class="ui-g">
                    <div class="ui-g-12">
                        <div class="card card-w-title">
                            <relacionar-proceso #relate
                                                [data]="accionCorrectivaActual?.procesos" 
                                                [procesos]="procesos"
                                                [loadingProcesos]="loadingProcesos"
                                                [cols]="colsAccionCorrectivaProceso"
                                                [rows]="10"
                                                (onRelateProceso)="addProcesoToAccionCorrectiva($event)"
                                                (onDeleteProcesoFromAccionCorrectiva)="deleteProcesoFromAccionCorrectiva($event)"
                                                ></relacionar-proceso>
                            </div>
                    </div>
                </div>

                <div class="ui-g" *ngIf="idAccionCorrectivaEstado >= ACCION_EN_CALIDAD">
                    <div class="ui-g-12">
                        <div class="card card-w-title">
                            <create-accion-correctiva-documento #documentos 
                                                                [documentos]="documentosAccionCorrectiva"
                                                                (onCreateDocumentoAccionCorrectiva)="uploadDocumentosToAccionCorrectiva($event)"
                                                                (onDeleteDocumentoAccionCorrectiva)="deleteDocumentoFromAccionCorrectiva($event)"
                                                                (onDownloadDocumentoAccionCorrectiva)="downloadDocumentoFromAccionCorrectiva($event)"
                                                                (onConsultarAccionCorrectivaAdjunto)="consultarAdjuntoFromAccionCorrectiva($event)">
                            </create-accion-correctiva-documento>
                        </div>
                    </div>
                </div>

                <div class="ui-g" *ngIf="idAccionCorrectivaEstado >= ACCION_EN_ANALISIS && idAccionCorrectivaEstado < ACCION_EN_REASIGNACION">
                    <div class="ui-g-12">
                        <div class="card card-w-title">
                            <create-metodologia-analisis #metodologia [metodologias]="metodologias"
                                                         [metodologiaActual]="accionCorrectivaAnalisisActual"
                                                         [causas]="accionCorrectivaAnalisisHijos"
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
                <div class="ui-g" *ngIf="(idAccionCorrectivaEstado >= ACCION_EN_ASIGNACION_ACTIVIDADES) && (idAccionCorrectivaEstado < ACCION_EN_REASIGNACION)">
                    <div class="ui-g-12">
                        <div class="card card-w-title">
                        <div class="ui-g">
                            <div class="ui-g-12 text-aling-right" *ngIf="idAccionCorrectivaEstado == ACCION_EN_ASIGNACION_ACTIVIDADES && (usuarioActual?.id == accionCorrectivaActual?.id_responsable || (hasPermission(301) | async))">
                                 <button pButton icon="pi pi-plus" class="ui-button" type="button" (click)="crearTareaAccionCorrectivaComponent.display=true" label="Crear tarea"> </button>
                            </div>
                        </div>
                            <acciones-tareas-lista #listaTareas [data]="accionCorrectivaActual.tareas"
                                                   [idEstadoAccionCorrectiva]="accionCorrectivaActual?.id_estado"
                                                   [accionCorrectivaTareaTipos]="tareaTipos"
                                                   [usuariosResponsables]="usuarios"
                                                   [usuarioActual]="usuarioActual"
                                                   [permisoRealizarTarea]="(hasPermission(301) | async)"
                                                   (onUpdateAccionCorrectivaTarea)="updateAccionCorrectivaTarea($event)"
                                                   (onDeleteAccionCorrectivaTarea)="deleteAccionCorrectivaTarea($event)"
                                                   (onUploadAdjuntoTarea)="uploadAdjuntosByAccionCorrectivaTarea($event)"
                                                   (onDownloadAdjuntoTarea)="downloadAdjuntoByAccionCorrectivaTarea($event)"
                                                   (onDeleteAdjuntoTarea)="deleteAdjuntoByAccionCorrectivaTarea($event)"
                                                   (onConsultarTareaAdjunto)="consultarAdjuntoFromAccionCorrectivaTarea($event)"
                                                   (onFinishTarea)="realizarAccionCorrectivaTarea($event)"

                                                   rows="10">
                            </acciones-tareas-lista>
                        </div>
                    </div>
                </div>

                <div class="ui-g" *ngIf="idAccionCorrectivaEstado == ACCION_EN_ASIGNACION_ACTIVIDADES">
                    <div class="ui-g-12">
                        <create-accion-correctiva-tarea-dialog #crearTarea
                                                            [accionCorrectivaTareaTipos]="tareaTipos"
                                                            [usuariosResponsables]="usuarios"
                                                            (onCreateAccionCorrectivaTarea)="createAccionCorrectivaTarea($event)" ></create-accion-correctiva-tarea-dialog>
                    </div>
                </div>

                <div class="ui-g">
                    <div class="ui-g-12">
                        <p-toolbar>
                            
                            <div class="ui-toolbar">
                                <div class="ui-g ui-fluid" *ngIf="(idAccionCorrectivaEstado == ACCION_EN_CREACION) && accionCorrectivaActual?.id_usuario_crea == usuarioActual?.id ">
                                    <div class="ui-g-6">
                                        <button pButton class="ui-button" label="Enviar a calidad" (click)="actualizarEstadoAccionCorrectiva(ACCION_EN_CALIDAD)"></button>
                                    </div>
                                    <div class="ui-g-6">
                                        <button pButton class="ui-button-danger" label="Anular" (click)="anular.displayAnularAccion=true"></button>
                                    </div>
                                </div>  
                            </div>
                            <div class="ui-g ui-fluid" *ngIf="(idAccionCorrectivaEstado == ACCION_EN_CALIDAD ||
                                                              idAccionCorrectivaEstado == ACCION_EN_REASIGNACION) && usuarioActual?.es_jefe">
                                <div class="ui-g-6">
                                    <button pButton class="ui-button" label="Asignar {{ nombreModulo | lowercase}}" (click)="asignarAccionCorrectivaComponent.display=true;"></button>
                                </div>
                                <div class="ui-g-6">
                                    <button pButton class="ui-button-danger" label="Anular" (click)="anular.displayAnularAccion=true"></button>
                                </div>
                            </div>
                            <div class="ui-g ui-fluid" *ngIf="(idAccionCorrectivaEstado == ACCION_ASIGNADA) && (usuarioActual?.id == accionCorrectivaActual?.id_responsable || (hasPermission(301) | async))">
                                <div class="ui-g-6">
                                    <button pButton class="ui-button" label="Iniciar análisis" (click)="actualizarEstadoAccionCorrectiva(ACCION_EN_ANALISIS)"></button>
                                </div>
                                <div class="ui-g-6">
                                    <button pButton class="ui-button-danger" label="Solicitar reasignación" (click)="actualizarEstadoAccionCorrectiva(ACCION_EN_REASIGNACION)"></button>
                                </div>
                            </div>

                            <div class="ui-g ui-fluid" *ngIf="accionCorrectivaActual?.metodologia_analisis && usuarioActual && comprobarSiFinalizarAnalisis()">
                                <div class="ui-g-12">
                                    <button pButton class="ui-button" label="Finalizar análisis y crear tareas" (click)="actualizarEstadoAccionCorrectiva(ACCION_EN_ASIGNACION_ACTIVIDADES)"></button>
                                </div>
                            </div>

                            <!-- <div class="ui-g ui-fluid" *ngIf="(idAccionCorrectivaEstado == ACCION_EN_ASIGNACION_ACTIVIDADES) && (usuarioActual?.id == accionCorrectivaActual?.id_responsable)">
                                <div class="ui-g-12">
                                    <button pButton class="ui-button" label="Finalizar ingreso de tareas" (click)="actualizarEstadoAccionCorrectiva(ACCION_EN_DESARROLLO_TAREAS)"></button>
                                </div>
                            </div> -->

                            <div class="ui-g ui-fluid" *ngIf="(idAccionCorrectivaEstado == ACCION_EN_ASIGNACION_ACTIVIDADES) && (usuarioActual?.id == accionCorrectivaActual?.id_responsable || (hasPermission(301) | async)) && finishedTareaPermiso">
                                <div class="ui-g-12">
                                    <button pButton class="ui-button" label="Finalizar {{ nombreModulo | lowercase}}" (click)="actualizarEstadoAccionCorrectiva(ACCION_FINALIZADA)"></button>
                                </div>
                            </div>

                        </p-toolbar>
                    <div>
                </div>

                <div class="ui-g">
                    <div class="ui-g-12">
                        <anular-accion-correctiva-dialog #anular
                                                         [accionCorrectivaActual]="accionCorrectivaActual"
                                                         (onAnularAccionCorrectiva)="anularAccionCorrectiva($event)"
                        > </anular-accion-correctiva-dialog>
                    <div>
                </div>

                <div class="ui-g">
                    <div class="ui-g-12">
                        <asignar-accion-correctiva-dialog #asignarAccionCorrectivaComponent
                            *ngIf="accionCorrectivaActual"
                                                         [jefesProcesosHijos]="jefesProcesosHijos"
                                                         [accionCorrectivaActual]="accionCorrectivaActual"
                                                         (onAsignarAccionCorrectiva)="asignarAccionCorrectiva($event)"
                        > </asignar-accion-correctiva-dialog>
                    <div>
                </div>
                `
})
export class AccionCorrectivaPanel extends ComponenteCargado implements OnInit {
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
    colsAccionCorrectivaProceso: any[];

    stepsItems: any[];

    finishedTareaPermiso: boolean;

    // atributos clase

    usuarioActual: UsuarioModel;
    nombreModulo: string = environment.nombres_modulos_visuales.acciones_correctivas;

    // listas para utilizar

    importancias: AccionImportanciaModel[];

    procesos: MapaProcesoHijoModel[];

    metodologias: AccionAnalisisTipoModel[];

    tareaTipos: AccionCorrectivaTareaTipoModel[];

    usuarios: UsuarioModel[];

    jefesProcesosHijos: MapaProcesoHijoModel[];

    loadingProcesos: boolean;

    // relaciones de accion correctiva

    accionCorrectivaActual: AccionCorrectivaModel;

    idAccionCorrectivaEstado: number;

    accionCorrectivaAnalisisActual: AccionCorrectivaAnalisisModel;

    accionCorrectivaAnalisisHijos: AccionCorrectivaAnalisisHijoModel[];

    procesosAccionCorrectiva: AccionProcesoModel[];

    documentosAccionCorrectiva: AccionCorrectivaAdjuntoModel[];

    accionCorrectivaTareas: AccionCorrectivaTareaModel[];

    // Hijos
    @ViewChild("edit")
    editAccionCorrectivaComponent: EditAccionCorrectivaComponent;

    @ViewChild("relate")
    relateAccionCorrectivaComponent: RelacionarProcesoComponent;

    @ViewChild("documentos")
    documentComponent: CreateDocumentoAccionCorrectivaComponent;

    @ViewChild("metodologia")
    metodologiaComponent: CreateMetodologiaAnalisisComponent;

    @ViewChild("anular")
    anularAccionCorrectivaComponent: AnularAccionCorrectivaComponent;

    @ViewChild("asignarAccionCorrectivaComponent")
    asignarAccionCorrectivaComponent: AsignarAccionCorrectivaComponent;

    @ViewChild("crearTarea")
    crearTareaAccionCorrectivaComponent: CreateAccionCorrectivaTareaDialogComponent;

    @ViewChild("listaTareas")
    accionesTareasListaComponent: AccionesTareasListaComponent;

    constructor(
        private accionCorrectivaService: AccionCorrectivaService,
        private accionesCorrectivasService: AccionesCorrectivasService,
        private accionesCorrectivasProcesoService: AccionesCorrectivasProcesoService,
        private accionCorrectivaDocumentoService: AccionesCorrectivasDocumentoService,
        private accionCorrectivaAnalisisService: AccionesCorrectivasAnalisisService,
        private accionesCorrectivasTareaService: AccionesCorrectivasTareaService,
        private accionesCorrectivasTareaAdjuntoService: AccionesCorrectivasTareaAdjuntoService,
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

        this.colsAccionCorrectivaProceso = [
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
                    this.getAccionCorrectiva(routerId)
                ]);

                aux.subscribe(
                    ([
                        importancias,
                        procesos,
                        tiposAnalisis,
                        accionCorrectiva
                    ]) => {
                        //Variables independientes de acción correctiva
                        this.importancias = importancias;
                        this.metodologias = tiposAnalisis;
                        this.procesos = procesos.filter(
                            procesoActual =>
                                !accionCorrectiva.procesos.find(
                                    procesoAccionCorrectivaA =>
                                        procesoAccionCorrectivaA.id_mapa_procesos ==
                                        procesoActual.id
                                )
                        );

                        // Variables dependientes de accionCorrectiva
                        this.accionCorrectivaActual = accionCorrectiva;
                        this.idAccionCorrectivaEstado =
                            accionCorrectiva.id_estado;
                        this.documentosAccionCorrectiva =
                            accionCorrectiva.documentos;
                        this.accionCorrectivaAnalisisActual =
                            accionCorrectiva.metodologia_analisis;
                        this.accionCorrectivaTareas = [
                            ...accionCorrectiva.tareas
                        ];

                        setTimeout(() => {
                            this.editAccionCorrectivaComponent.setDataAccionCorrectiva(
                                this.accionCorrectivaActual
                            );
                            this.loadingProcesos = false;

                            if (
                                accionCorrectiva.metodologia_analisis &&
                                this.metodologiaComponent
                            ) {
                                this.accionCorrectivaAnalisisHijos = accionCorrectiva.metodologia_analisis.analisis_hijo.map(
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

                                let accionCorrectivaAnalisisHijos2 = accionCorrectiva.metodologia_analisis.analisis_hijo.map(
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
                                if (this.accionCorrectivaAnalisisActual) {
                                    if (this.metodologiaComponent) {
                                        let stepsComponent = this
                                            .metodologiaComponent.stepComponent;
                                        stepsComponent.activeIndex = 1;
                                        if (
                                            this.accionCorrectivaActual
                                                .metodologia_analisis
                                                .id_accion_analisis_tipo ==
                                            this.METODOLOGIA_ANALISIS_NO_APLICA
                                        ) {
                                            stepsComponent.activeIndex = 2;
                                        }
                                    }
                                }

                                switch (
                                this.accionCorrectivaAnalisisActual
                                    .id_accion_analisis_tipo
                                ) {
                                    case 1: {
                                        if (
                                            this.accionCorrectivaActual
                                                .metodologia_analisis
                                                .analisis_hijo5ws.length > 0
                                        ) {
                                            this.metodologiaComponent.stepComponent.activeIndex = 2;
                                            this.metodologiaComponent.CincoWsComponent.setValue(
                                                this.accionCorrectivaActual
                                                    .metodologia_analisis
                                                    .analisis_hijo5ws
                                            );
                                        }
                                        break;
                                    }
                                    case 2: {
                                        if (
                                            this.accionCorrectivaAnalisisHijos
                                                .length > 0
                                        ) {
                                            this.metodologiaComponent.stepComponent.activeIndex = 2;
                                            this.metodologiaComponent.createFormularioAnalisisHijos(
                                                accionCorrectivaAnalisisHijos2
                                            );

                                            this.metodologiaComponent.lockItems(
                                                true
                                            );
                                        } else {
                                            if (
                                                this.accionCorrectivaActual
                                                    .metodologia_analisis
                                                    .id_accion_analisis_tipo ==
                                                2
                                            ) {
                                                this.createAccionAnalisisHijoByDefault(
                                                    this
                                                        .accionCorrectivaAnalisisActual
                                                );
                                                this.metodologiaComponent.createFormularioAnalisisHijos(
                                                    this
                                                        .accionCorrectivaAnalisisHijos
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
                        console.log("HOLA" , this.accionCorrectivaActual);

                    }
                    
                );

                let aux2 = forkJoin([
                    this.getAccionCorrectivaTareaTipos(),
                    this.usuarioService.getUsuarios()
                ]);

                aux2.subscribe(([tareaTipos, usuarios]) => {
                    this.tareaTipos = tareaTipos;
                    this.usuarios = usuarios;
                });
            });
            console.log("HOLA" , this.accionCorrectivaActual);
    }

    updateAccionCorrectiva(data: AccionCorrectivaModel) {
        this.showWaitDialog(
            "Acción en proceso",
            "Actualizando información " + this.nombreModulo + ", un momento por favor..."
        );
        this.accionCorrectivaService
            .updateAccionCorrectiva(data)
            .subscribe(response => {
                let auxEstadoAcionCorrectivaActual = this.accionCorrectivaActual
                    .id_estado;
                this.accionCorrectivaActual = response;
                this.idAccionCorrectivaEstado = this.accionCorrectivaActual.id_estado;
                this.hideWaitDialog();
                this.desabilitarComponentes();
                if (
                    auxEstadoAcionCorrectivaActual !=
                    this.accionCorrectivaActual.id_estado
                ) {
                    switch (response.id_estado) {
                        case this.ACCION_EN_CALIDAD:
                        case this.ACCION_ASIGNADA:
                        case this.ACCION_EN_REASIGNACION:
                        case this.ACCION_ANULADA: {
                            this.getBackAccionesCorrectivas();
                            break;
                        }
                        default: {
                        }
                    }
                }
            });
    }

    getAccionCorrectiva(id: number) {
        return this.accionCorrectivaService.getAccionCorrectiva(id);
    }

    addProcesoToAccionCorrectiva(data: MapaProcesoHijoModel[]) {
        this.showWaitDialog(
            "Acción en proceso",
            "Relacionando proceso a " + this.nombreModulo + ", un momento por favor..."
        );
        this.store
            .select(this.fromAuth.getUser)
            .pipe(take(1))
            .subscribe(usuario => {
                let accionCorrectivaProcesos: AccionProcesoModel[] = [];

                data.forEach(mapaProcesoHijo => {
                    let accionCorrectivaProceso: AccionProcesoModel = {
                        id_mapa_procesos: mapaProcesoHijo.id,
                        id_accion_correctiva: this.accionCorrectivaActual.id,
                        id_usuario: usuario.id
                    };
                    accionCorrectivaProcesos.push(accionCorrectivaProceso);
                });

                this.accionesCorrectivasProcesoService
                    .addProcesoToAccionCorrectiva(accionCorrectivaProcesos)
                    .subscribe(procesosAccionCorrectiva => {
                        this.accionCorrectivaActual.procesos = [
                            ...this.accionCorrectivaActual.procesos,
                            ...procesosAccionCorrectiva
                        ];

                        this.procesos = this.procesos.filter(procesoActual => {
                            let procesoBuscado = this.accionCorrectivaActual.procesos.find(
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

    deleteProcesoFromAccionCorrectiva(data: AccionProcesoModel) {
        this.showWaitDialog(
            "Acción en proceso",
            "Eliminando proceso de " + this.nombreModulo + ", un momento por favor..."
        );
        this.accionesCorrectivasProcesoService
            .deleteProcesoFromAccionCorrectiva(data.id)
            .subscribe(procesoAccionCorrectiva => {
                this.accionCorrectivaActual.procesos = this.accionCorrectivaActual.procesos.filter(
                    procesoActual => {
                        if (procesoActual.id != procesoAccionCorrectiva.id) {
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

    uploadDocumentosToAccionCorrectiva(files: File[]) {
        this.showWaitDialog(
            "Acción en proceso",
            "Realizando carga de documentos solicitados, un momento por favor..."
        );

        const form: FormData = new FormData();
        files.forEach(archivo => {
            form.append("uploads[]", archivo, archivo.name);
        });

        this.accionCorrectivaDocumentoService
            .uploadDocumentosByAccionCorrectiva(
                this.accionCorrectivaActual.id,
                form
            )
            .subscribe(response => {
                this.documentosAccionCorrectiva = [
                    ...this.documentosAccionCorrectiva,
                    ...response
                ];
                this.documentComponent.fu.clear();
                this.hideWaitDialog();
            });
    }

    downloadDocumentoFromAccionCorrectiva(event: AccionCorrectivaAdjuntoModel) {
        this.accionCorrectivaDocumentoService
            .downloadAccionCorrectivaDocumento({ path: event.path })
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

    deleteDocumentoFromAccionCorrectiva(event: AccionCorrectivaAdjuntoModel) {
        this.showWaitDialog(
            "Accion en proceso",
            "Eliminando documento de " + this.nombreModulo + ", un momento por favor..."
        );
        this.accionCorrectivaDocumentoService
            .deleteDocumentoByAccionCorrectiva(event.id)
            .subscribe(response => {
                this.documentosAccionCorrectiva = this.documentosAccionCorrectiva.filter(
                    documentos => documentos.id != response.id
                );
                this.hideWaitDialog();
            });
    }

    createAccionAnalisis(data: AccionAnalisisTipoModel) {
        this.showWaitDialog("Accion en proceso", "Creando nueva idea, un momento por favor...");
        this.store
            .select(this.fromAuth.getUser)
            .pipe(take(1))
            .subscribe(usuario => {
                const accionAnalisis: AccionCorrectivaAnalisisModel = {
                    id_accion_correctiva: this.accionCorrectivaActual.id,
                    id_accion_analisis_tipo: data.id,
                    id_usuario: usuario.id
                };
                this.accionCorrectivaAnalisisService
                    .crearAnalisisAccionCorrectiva(accionAnalisis)
                    .subscribe(response => {
                        this.createAccionAnalisisHijoByDefault(response);
                        this.accionCorrectivaAnalisisActual = response;
                        this.accionCorrectivaActual.metodologia_analisis = response;
                        this.metodologiaComponent.createFormularioAnalisisHijos(
                            this.accionCorrectivaAnalisisHijos
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

    createAccionAnalisisHijos(data: AccionCorrectivaAnalisisHijoModel[]) {
        this.showWaitDialog(
            "Accion en proceso",
            "Creando nuevas ideas en análisis, un momento por favor..."
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

            this.accionCorrectivaAnalisisService
                .createAnalisisAccionCorrectivaHijos(data)
                .subscribe(response => {
                    this.accionCorrectivaAnalisisHijos = [
                        ...this.accionCorrectivaAnalisisHijos,
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

                    this.accionCorrectivaActual.metodologia_analisis.analisis_hijo = response;
                    this.metodologiaComponent.stepComponent.activeIndex = 2;
                    this.metodologiaComponent.lockItems(true);
                    this.hideWaitDialog();
                });
        });
    }

    createAccionAnalisisHijo5ws(data: AccionCorrectivaAnalisisHijo5wsModel[]) {
        this.showWaitDialog("Accion en proceso", "Creando nuevo porque, un momento por favor...");
        this.store
            .select(this.fromAuth.getUser)
            .pipe(take(1))
            .subscribe(usuario => {
                data.forEach(accionAnalisisHijoActual => {
                    accionAnalisisHijoActual.id_usuario = usuario.id;
                    accionAnalisisHijoActual.id_accion_correctiva_analisis = this.accionCorrectivaAnalisisActual.id;
                });

                this.accionCorrectivaAnalisisService
                    .createAnalisisAccionCorrectivaHijos5ws(data)
                    .subscribe(response => {
                        this.accionCorrectivaAnalisisHijos = response;
                        this.accionCorrectivaActual.metodologia_analisis.analisis_hijo5ws = [
                            ...response
                        ];
                        this.metodologiaComponent.stepComponent.activeIndex = 2;
                    });
                this.hideWaitDialog();
            });
    }

    createAccionAnalisisHijo(data) {
        this.showWaitDialog("Accion en proceso", "Creando nuevo porque, un momento por favor...");
        this.store
            .select(this.fromAuth.getUser)
            .pipe(take(1))
            .subscribe(usuario => {
                data.hijo.id_usuario = usuario.id;
                data.hijo.id_padre = data.hijo.padre.id;

                this.accionCorrectivaAnalisisService
                    .createAnalisisAccionCorrectivaHijos([{ ...data.hijo }])
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

                        this.accionCorrectivaAnalisisHijos = [
                            ...this.accionCorrectivaAnalisisHijos,
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
            "Actualizando información análisis, un momento por favor..."
        );
        this.store
            .select(this.fromAuth.getUser)
            .pipe(take(1))
            .subscribe(usuario => {
                data.hijo.id_accion_correctiva_analisis = this.accionCorrectivaAnalisisActual.id;
                data.hijo.id_usuario = usuario.id;
                return this.accionCorrectivaAnalisisService
                    .createOrUpdateAnalisisAccionCorrectivaHijos(
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

    createAccionCorrectivaTarea(data: AccionCorrectivaTareaModel) {
        this.showWaitDialog("Accion en proceso", "Creando una nueva tarea, un momento por favor...");
        this.store
            .select(this.fromAuth.getUser)
            .pipe(take(1))
            .subscribe(usuario => {
                data.id_usuario = usuario.id;
                data.id_accion_correctiva = this.accionCorrectivaActual.id;
                data.id_accion_correctiva_tarea_tipo = data.tipo.id;

                this.accionesCorrectivasTareaService
                    .createAccionCorrectivaTarea(data)
                    .subscribe(response => {
                        this.accionCorrectivaTareas = [
                            ...this.accionCorrectivaTareas,
                            response
                        ];
                        this.accionCorrectivaActual.tareas.push(response);
                        this.comprobarSiFinalizada();
                        this.hideWaitDialog();
                    });
            });
    }

    updateAccionCorrectivaTarea(data: AccionCorrectivaTareaModel) {
        this.showWaitDialog(
            "Accion en proceso",
            "Actualizando información tarea " + this.nombreModulo + ", un momento por favor..."
        );
        this.accionesCorrectivasTareaService
            .updateAccionCorrectivaTarea(data.id, data)
            .subscribe(response => {
                this.accionCorrectivaActual.tareas = this.accionCorrectivaActual.tareas.map(
                    tareaActual =>
                        tareaActual.id == response.id ? response : tareaActual
                );
                this.comprobarSiFinalizada();
                this.hideWaitDialog();
            });
    }
    deleteAccionCorrectivaTarea(data: AccionCorrectivaTareaModel) {
        this.showWaitDialog(
            "Acción en proceso",
            "Eliminando tarea " + this.nombreModulo + ", un momento por favor..."
        );
        this.accionesCorrectivasTareaService
            .deleteAccionCorrectivaTarea(data.id)
            .subscribe(response => {
                this.accionCorrectivaActual.tareas = this.accionCorrectivaActual.tareas.filter(
                    tareaActual => tareaActual.id != response.id
                );

                this.comprobarSiFinalizada();
                this.hideWaitDialog();
            });
    }

    realizarAccionCorrectivaTarea(data: AccionCorrectivaTareaModel) {
        this.showWaitDialog(
            "Acción en proceso",
            "Cambiando estado " + this.nombreModulo + " realizado, un momento por favor..."
        );
        this.store
            .select(this.fromAuth.getUser)
            .pipe(take(1))
            .subscribe(usuario => {
                data.id_realizada_por = usuario.id;

                this.accionesCorrectivasTareaService
                    .realizarAccionCorrectivaTarea(data)
                    .subscribe(response => {
                        this.accionCorrectivaActual.tareas = this.accionCorrectivaActual.tareas.map(
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

    uploadAdjuntosByAccionCorrectivaTarea(data: {
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

        this.accionesCorrectivasTareaAdjuntoService
            .uploadAdjuntosByTarea(data.idTarea, form)
            .subscribe(response => {
                let adjuntos = this.accionCorrectivaActual.tareas.find(
                    tareaActual => tareaActual.id == data.idTarea
                ).adjunto;

                if (adjuntos) {
                    this.accionCorrectivaActual.tareas.find(
                        tareaActual => tareaActual.id == data.idTarea
                    ).adjunto = [...adjuntos, ...response];
                } else {
                    this.accionCorrectivaActual.tareas.find(
                        tareaActual => tareaActual.id == data.idTarea
                    ).adjunto = [...response];
                }

                this.hideWaitDialog();
            });
    }

    downloadAdjuntoByAccionCorrectivaTarea(
        data: AccionCorrectivaTareaAdjuntoModel
    ) {
        this.showWaitDialog(
            "Acción en proceso",
            "descargando evidencia de una tarea, un momento por favor..."
        );
        this.accionesCorrectivasTareaAdjuntoService
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

    deleteAdjuntoByAccionCorrectivaTarea(data: {
        idTarea: number;
        data: AccionCorrectivaTareaAdjuntoModel;
    }) {
        this.showWaitDialog(
            "Acción en proceso",
            "Eliminando evidencia de una tarea, un momento por favor..."
        );
        this.accionesCorrectivasTareaAdjuntoService
            .deleteAdjuntoByTarea(data.data)
            .subscribe(adjuntoEliminado => {
                this.accionCorrectivaActual.tareas.find(
                    tareaActual => tareaActual.id == data.idTarea
                ).adjunto = [
                        ...this.accionCorrectivaActual.tareas
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

    consultarAdjuntoFromAccionCorrectiva(
        accionCorrectivaAdjunto: AccionCorrectivaAdjuntoModel
    ) {
        const idTipoDocumento =
            environment.tipos_documento.accion_correctiva_adjunto.id;
        this.store.dispatch(
            new fromRootStore.Go({
                path: [
                    `visor-adjunto/${idTipoDocumento}/${
                    accionCorrectivaAdjunto.id
                    }/${accionCorrectivaAdjunto.titulo}`
                ]
            })
        );
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
    // getProcesosByAccionCorrectiva(id: number) {
    //     return this.accionesCorrectivasProcesoService.getProcesosByAccionCorrectiva(id);
    // }

    // getDocumentosByAccionCorrectiva(id: number) {
    //     return this.accionCorrectivaDocumentoService.getDocumentosByAccionCorrectiva(id);
    // }

    getUsuarios() {
        return;
    }

    getImportancias() {
        return this.accionesCorrectivasService.getImportancias();
    }

    getProcesos() {
        return this.accionesCorrectivasService.getProcesos();
    }

    getJefesProcesos() {
        return this.accionesCorrectivasProcesoService.getJefesProcesos();
    }

    getTiposAnalisis() {
        return this.accionCorrectivaAnalisisService.getTiposAnalisis();
    }

    getAccionCorrectivaTareaTipos() {
        return this.accionesCorrectivasTareaService.getAccionCorrectivaTareaTipos();
    }

    anularAccionCorrectiva(data: AccionCorrectivaModel) {
        this.accionCorrectivaActual = {
            ...this.accionCorrectivaActual,
            observacion: data.observacion
        };
        this.actualizarEstadoAccionCorrectiva(this.ACCION_ANULADA);
    }

    asignarAccionCorrectiva(data: AccionCorrectivaModel) {
        this.accionCorrectivaActual = {
            ...this.accionCorrectivaActual,
            id_responsable: data.id_responsable
        };
        this.actualizarEstadoAccionCorrectiva(this.ACCION_ASIGNADA);
    }

    actualizarEstadoAccionCorrectiva(estadoNuevo) {
        let accionCorrectiva: AccionCorrectivaModel = {
            ...this.accionCorrectivaActual
        };
        switch (estadoNuevo) {
            case this.ACCION_EN_CALIDAD: {
                accionCorrectiva.id_estado = this.ACCION_EN_CALIDAD;
                this.updateAccionCorrectiva(accionCorrectiva);
                break;
            }
            case this.ACCION_ANULADA: {
                accionCorrectiva.id_estado = this.ACCION_ANULADA;
                this.updateAccionCorrectiva(accionCorrectiva);
                break;
            }
            case this.ACCION_ASIGNADA: {
                accionCorrectiva.id_estado = this.ACCION_ASIGNADA;
                this.updateAccionCorrectiva(accionCorrectiva);
                break;
            }
            case this.ACCION_EN_ANALISIS: {
                accionCorrectiva.id_estado = this.ACCION_EN_ANALISIS;
                this.updateAccionCorrectiva(accionCorrectiva);
                break;
            }
            case this.ACCION_EN_REASIGNACION: {
                accionCorrectiva.id_estado = this.ACCION_EN_REASIGNACION;
                this.updateAccionCorrectiva(accionCorrectiva);
                break;
            }
            case this.ACCION_EN_ASIGNACION_ACTIVIDADES: {
                accionCorrectiva.id_estado = this.ACCION_EN_ASIGNACION_ACTIVIDADES;
                this.updateAccionCorrectiva(accionCorrectiva);
                break;
            }
            case this.ACCION_EN_DESARROLLO_TAREAS: {
                accionCorrectiva.id_estado = this.ACCION_EN_DESARROLLO_TAREAS;
                this.updateAccionCorrectiva(accionCorrectiva);
                break;
            }
            case this.ACCION_FINALIZADA: {
                accionCorrectiva.id_estado = this.ACCION_FINALIZADA;
                this.updateAccionCorrectiva(accionCorrectiva);
                break;
            }
            default: {
                break;
            }
        }
    }

    getBackAccionesCorrectivas() {
        this.store.dispatch(
            new fromRootStore.Go({
                path: [`/acciones/acciones-correctivas`]
            })
        );
    }

    createAccionAnalisisHijoByDefault(response) {
        let causaDefault: AccionCorrectivaAnalisisHijoModel = {
            pregunta_causa_idea: "Causa inicial",
            id: 0
        };

        let hijoModel: AccionCorrectivaAnalisisHijoModel = {
            id: null,
            id_padre: 0,
            id_usuario: null,
            padre: causaDefault,
            pregunta_causa_idea: "",
            contribuyo: "",
            respuestas: "",
            id_accion_correctiva_analisis: response.id,
            fecha_creacion: null,
            created_at: null,
            updated_at: null
        };

        if (response.id_accion_analisis_tipo == 3) {
            hijoModel.id = 0;
            hijoModel.pregunta_causa_idea = "Causa inicial";
        }

        this.accionCorrectivaAnalisisHijos = [hijoModel];

        this.metodologiaComponent.causas = [causaDefault];
    }

    desabilitarComponentes() {
        let estado = this.accionCorrectivaActual.id_estado;
        this.store
            .select(this.fromAuth.getUser)
            .pipe(take(1))
            .subscribe(usuario => {
                this.usuarioActual = usuario;
                if (
                    estado == this.ACCION_EN_CREACION &&
                    usuario.id != this.accionCorrectivaActual.id_usuario_crea
                ) {
                    this.editAccionCorrectivaComponent.disableComponent();
                    this.relateAccionCorrectivaComponent.disableComponent();
                }

                if (estado == this.ACCION_EN_CALIDAD && !usuario.es_jefe) {
                    this.editAccionCorrectivaComponent.disableComponent();
                    this.relateAccionCorrectivaComponent.disableComponent();
                    if (this.documentComponent) {
                        this.documentComponent.disableComponent();
                    }
                }
                this.hasPermission(301).subscribe(tienePermiso => {
                    if (
                        estado >= this.ACCION_ASIGNADA &&
                        (usuario.id !=
                            this.accionCorrectivaActual.id_responsable &&
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
            this.editAccionCorrectivaComponent.disableComponent();
            this.relateAccionCorrectivaComponent.disableComponent();
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
        this.hasPermission(301).subscribe(tienePermiso => {
            if (
                this.idAccionCorrectivaEstado == this.ACCION_EN_ANALISIS &&
                (this.usuarioActual.id ==
                    this.accionCorrectivaActual.id_responsable ||
                    tienePermiso)
            ) {
                esResponsableAnalisis = true;
            }
            if (
                (this.accionCorrectivaActual.metodologia_analisis &&
                    ((this.accionCorrectivaActual.metodologia_analisis
                        .analisis_hijo &&
                        this.accionCorrectivaActual.metodologia_analisis
                            .analisis_hijo.length > 0) ||
                        (this.accionCorrectivaActual.metodologia_analisis
                            .analisis_hijo5ws &&
                            this.accionCorrectivaActual.metodologia_analisis
                                .analisis_hijo5ws.length > 0))) ||
                this.accionCorrectivaActual.metodologia_analisis
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
        this.accionCorrectivaActual.tareas.forEach(tareaActual => {
            if (tareaActual.realizada) {
                contadorTareasRealizadas++;
            }
        });
        if (
            contadorTareasRealizadas ==
            this.accionCorrectivaActual.tareas.length &&
            this.accionCorrectivaActual.tareas.length > 0
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
