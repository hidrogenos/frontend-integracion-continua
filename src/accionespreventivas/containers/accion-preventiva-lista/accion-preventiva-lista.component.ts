import { Component, OnInit, ViewChild } from "@angular/core";
import { AccionPreventivaModel } from "../../../shared/models/accion-preventiva.model";
import { HasPermisionService } from "../../../shared/services";

//store
import { Store } from "@ngrx/store";
import { StoreModel } from "../../../shared/models/store.model";
import * as fromShared from "./../../../shared/store";
import * as fromAuth from "./../../../auth/store";
import * as fromRootStore from "./../../../app/store";
import { forkJoin } from "rxjs";

//Modelos
import { AccionImportanciaModel } from "../../../shared/models/accion-importancia.model";
//Child
import { CreateAccionPreventivaDialogComponent } from "../../components";
import { AccionPreventivaEstadoModel } from "../../../shared/models/accion-preventiva-estado.model";
import { MapaProcesoHijoModel } from "../../../shared/models/mapa_proceso_hijo.model";
import { take } from "rxjs/operators";
import { MessageService } from "primeng/api";
import { UsuarioModel } from "../../../shared/models/usuario.model";
import { PermisosService } from "../../../administracion/services";
import {
    AccionPreventivaListaService,
    AccionPreventivaDetalleService
} from "../../services";
import { environment } from "../../../environments/environment";

@Component({
    selector: "accion-preventiva-lista",
    template: `<div class="ui-g">
                    <div class="ui-g-12">                    
                        <div class="card card-w-title">
                            <h1> {{ nombreModulo }}</h1>

                             <acciones-estados-lista 
                                [estados]="estados"> 
                            </acciones-estados-lista> 
                             <div class="ui-g">
                                <div class="ui-g-12 text-aling-right">
                                    <button *ngIf="(hasPermission(400) | async)" pButton type="button" (click)="cacd.display=true" label="Crear {{nombreModulo | lowercase}}" class="ui-button-success">
                                    </button>  
                                </div>               
                            </div> 
                            
                                    <acciones-lista 
                                        [data]="accionesPreventivas" [rows]="10" 
                                        [loading]="estaCargando" [cols]="colsAccionPreventiva"
                                        [cantidadTotalAcciones]="cantidadTotalAccionesPreventivas" 
                                        (onLazy)="loadLazyAccionesPreventivas($event)"
                                        (onEdit)="selectAccionPreventiva($event)"
                                        (onDeleteAccionPreventiva)="deleteAccionPreventiva($event)">
                                    </acciones-lista>
                                 
                        </div>
                    </div>
                </div>
                
                <create-accion-preventiva-dialog #cacd [procesos]="procesos" [importancias]="importancias" 
                (onCreateAccionPreventiva)="createAccionPreventiva($event)" >
                 </create-accion-preventiva-dialog>
                `
})
export class AccionPreventivaListaComponent implements OnInit {
    /**
     * @var accionesPreventivas lista donde se almacenan las acciones preventivas
     */
    accionesPreventivas: AccionPreventivaModel[];

    /**
     * @var cantidadTotalAccionesPreventivas total de acciones preventivas
     */
    cantidadTotalAccionesPreventivas: number;

    /**
     * @var estaCargando si la tabla esta o no en estado de carga
     */
    estaCargando: boolean;

    colsAccionPreventiva: any[];

    importancias: AccionImportanciaModel[];

    procesos: MapaProcesoHijoModel[];

    estados: AccionPreventivaEstadoModel[];

    usuarioActual: UsuarioModel;

    nombreModulo: string = environment.nombres_modulos_visuales.acciones_preventivas;

    msgs = [];

    //viewChild
    @ViewChild("cacd")
    onCreateDialog: CreateAccionPreventivaDialogComponent;

    constructor(
        private accionPreventivaListaService: AccionPreventivaListaService,
        private accionPreventivaDetalleService: AccionPreventivaDetalleService,
        private store: Store<StoreModel>,
        private hasPermisosService: HasPermisionService,
        private messageService: MessageService
    ) {
        this.estaCargando = true;

        this.colsAccionPreventiva = [
            { field: "estado", header: "Ver" },
            { field: "codigo", header: "Código" },
            { field: "accion_estado", header: "Estado" },
            { field: "titulo", header: "Titulo" },
            { field: "importancia", header: "Importancia" },
            { field: "responsable", header: "Responsable" },
            { field: "fecha_creacion", header: "Creación" },
            { field: "fecha_compromiso", header: "Fecha compromiso" },
            { field: "none", header: "Funciones" }
        ];
    }

    ngOnInit() {
        this.loadInitData();
    }

    loadInitData() {
        this.showWaitDialog(
            "Acción en proceso",
            "Consultado datos requeridos, un momento por favor..."
        );

        let aux = forkJoin([
            this.getImportancias(),
            this.getProcesos(),
            this.getEstados()
        ]);

        aux.subscribe(([importancias, procesos, estados]) => {
            this.importancias = importancias;
            this.procesos = procesos;
            this.estados = estados;
            this.hideWaitDialog();
        });

        this.store.select(fromAuth.getUser).subscribe(user => {
            this.usuarioActual = user;
        });
    }

    loadAccionesPreventivas() {
        this.accionPreventivaListaService
            .getAccionesPreventivas()
            .subscribe(response => {
                this.accionesPreventivas = response;
                this.cantidadTotalAccionesPreventivas = response.length;
                this.estaCargando = false;
            });
    }

    /**
     * Este método se encarga de hacer una petición cada vez que sea necesario hacer un lazy loading
     */
    loadLazyAccionesPreventivas(event) {
        this.estaCargando = true;
        this.accionPreventivaListaService
            .getLazyAccionesPreventivas(event)
            .subscribe(
                (response: {
                    cantidad: number;
                    data: AccionPreventivaModel[];
                }) => {
                    this.accionesPreventivas = response.data;
                    this.cantidadTotalAccionesPreventivas = response.cantidad;
                    this.estaCargando = false;
                },
                error => {
                    this.msgs.push({
                        severity: "danger",
                        summary: "Carga fallida",
                        detail:
                            "No se han podido obtener respuesta valida del servidor"
                    });
                }
            );
    }

    createAccionPreventiva(event: AccionPreventivaModel) {
        this.showWaitDialog(
            "Acción en proceso",
            "Registrando nueva Acción Preventiva, un momento por favor..."
        );
        this.store
            .select(fromAuth.getUser)
            .pipe(take(1))
            .subscribe(usuario => {
                event.id_usuario_crea = usuario.id;
                this.accionPreventivaDetalleService
                    .createAccionPreventiva(event)
                    .subscribe(
                        response => {
                            this.accionesPreventivas = [
                                ...this.accionesPreventivas,
                                response
                            ];
                            this.hideWaitDialog();
                            this.onCreateDialog.display = false;
                            this.messageService.add({
                                severity: "success",
                                summary: "Acción exitosa",
                                detail: "Acción preventiva creada exitosamente"
                            });
                        },
                        error => {
                            this.hideWaitDialog();
                            this.msgs.push({
                                severity: "danger",
                                summary: "Acción fallida",
                                detail:
                                    "No se puede crear una acción con un codigo repetido"
                            });
                        }
                    );
            });
    }

    selectAccionPreventiva(data: AccionPreventivaModel) {
        // if (this.usuarioActual.es_jefe) {
        this.store.dispatch(
            new fromRootStore.Go({
                path: [`/acciones/acciones-preventivas/detalle/${data.id}`]
            })
        );
        // } else {
        //     this.messageService.add({
        //         severity: "error",
        //         summary: "Acción denegada",
        //         detail:
        //             "Usted no cuenta con los privilegios suficientes para acceder a esta sección"
        //     });
        // }
    }

    deleteAccionPreventiva(data: AccionPreventivaModel) {
        this.accionPreventivaDetalleService
            .deleteAccionPreventiva(data)
            .subscribe(response => {
                this.accionesPreventivas = this.accionesPreventivas.filter(
                    accionPreventivaActual =>
                        accionPreventivaActual.id != response.id
                );
            });
    }

    getImportancias() {
        return this.accionPreventivaListaService.getImportancias();
    }

    getProcesos() {
        return this.accionPreventivaListaService.getProcesos();
    }

    getEstados() {
        return this.accionPreventivaListaService.getEstados();
    }

    hideWaitDialog() {
        this.store.dispatch(new fromShared.HideWaitDialog());
    }

    showWaitDialog(header: string, body?: string) {
        this.store.dispatch(new fromShared.ShowWaitDialog({ header, body }));
    }

    hasPermission(id: number) {
        return this.hasPermisosService.hasPermision(id);
    }
}
