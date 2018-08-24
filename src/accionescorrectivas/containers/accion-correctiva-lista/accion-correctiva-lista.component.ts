import { Component, OnInit, ViewChild } from "@angular/core";
import { AccionCorrectivaModel } from "../../../shared/models/accion-correctiva.model";
import { AccionesCorrectivasService } from "../../services";
import { AccionCorrectivaService } from "../../../shared/services";

//store
import { Store } from "@ngrx/store";
import { StoreModel } from "../../../shared/models/store.model";
import * as fromShared from "./../../../shared/store";
import * as fromAuth from "./../../../auth/store";
import * as fromRootStore from "./../../../app/store";
import { forkJoin } from "rxjs";

//Modelos
import { AccionImportanciaModel } from "../../../shared/models/accion-importancia.model";
import { AccionProcesoModel } from "../../../shared/models/accion-proceso.model";

//Child
import { CreateAccionCorrectivaDialogComponent } from "../../components";
import { MessageService } from "primeng/primeng";
import { AccionCorrectivaEstadoModel } from "../../../shared/models/accion-correctiva-estado.model";
import { MapaProcesoHijoModel } from "../../../shared/models/mapa_proceso_hijo.model";

@Component({
    selector: "accion-correctiva-lista",
    template: `<div class="ui-g">
                    <div class="ui-g-12">                    
                        <div class="card card-w-title">
                            <h1> Acciones Correctivas </h1>

                             <acciones-estados-lista 
                                [estados]="estados"> 
                            </acciones-estados-lista> 
                             <div class="ui-g">
                                <div class="ui-g-12 text-aling-right">
                                    <button pButton type="button" (click)="cacd.display=true" label="Crear Acción Correctiva" class="ui-button-success">
                                    </button>  
                                </div>               
                            </div> 
                            
                                    <acciones-lista 
                                        [data]="accionesCorrectivas" [rows]="10" 
                                        [loading]="estaCargando" [cols]="colsAccionCorrectiva"
                                        [cantidadTotalAcciones]="cantidadTotalAccionesCorrectivas" 
                                        (onLazy)="loadLazyAccionesCorrectivas($event)"
                                        (onEdit)="selectAccionCorrectiva($event)"
                                        (onDeleteAccionCorrectiva)="deleteAccionCorrectiva($event)">
                                    </acciones-lista>
                                 
                        </div>
                    </div>
                </div>
                
                <create-accion-correctiva-dialog #cacd [procesos]="procesos" [importancias]="importancias" 
                (onCreateAccionCorrectiva)="createAccionCorrectiva($event)" >
                 </create-accion-correctiva-dialog>
                `
})
export class AccionCorrectivaListaComponent implements OnInit {
    /**
     * @var accionesCorrectivas lista donde se almacenan las acciones correctivas
     */
    private accionesCorrectivas: AccionCorrectivaModel[];

    /**
     * @var cantidadTotalAccionesCorrectivas total de acciones correctivas
     */
    private cantidadTotalAccionesCorrectivas: number;

    /**
     * @var estaCargando si la tabla esta o no en estado de carga
     */
    private estaCargando: boolean;

    private colsAccionCorrectiva: any[];

    private importancias: AccionImportanciaModel[];

    private procesos: MapaProcesoHijoModel[];

    private estados: AccionCorrectivaEstadoModel[];

    msgs = [];

    //viewChild
    @ViewChild("cacd")
    onCreateDialog: CreateAccionCorrectivaDialogComponent;

    constructor(
        private accionesCorrectivasService: AccionesCorrectivasService,
        private resourceAccionCorrectivaService: AccionCorrectivaService,
        private store: Store<StoreModel>,
        private messageService: MessageService
    ) {
        this.estaCargando = true;

        this.colsAccionCorrectiva = [
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
    }

    loadAccionesCorrectivas() {
        this.accionesCorrectivasService
            .getAccionesCorrectivas()
            .subscribe(response => {
                this.accionesCorrectivas = response;
                this.cantidadTotalAccionesCorrectivas = response.length;
                this.estaCargando = false;
            });
    }

    /**
     * Este método se encarga de hacer una petición cada vez que sea necesario hacer un lazy loading
     */
    loadLazyAccionesCorrectivas(event) {
        this.estaCargando = true;
        this.accionesCorrectivasService
            .getLazyAccionesCorrectivas(event)
            .subscribe(
                (response: {
                    cantidad: number;
                    data: AccionCorrectivaModel[];
                }) => {
                    this.accionesCorrectivas = response.data;
                    this.cantidadTotalAccionesCorrectivas = response.cantidad;
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

    createAccionCorrectiva(event: AccionCorrectivaModel) {
        this.showWaitDialog(
            "Acción en proceso",
            "Registrando nueva Acción Correctiva, un momento por favor..."
        );
        this.store.select(fromAuth.getUser).subscribe(usuario => {
            event.id_usuario_crea = usuario.id;
            this.resourceAccionCorrectivaService
                .createAccionCorrectiva(event)
                .subscribe(
                    response => {
                        this.accionesCorrectivas = [
                            ...this.accionesCorrectivas,
                            response
                        ];
                        this.hideWaitDialog();
                        this.onCreateDialog.display = false;
                        this.msgs.push({
                            severity: "success",
                            summary: "Acción exitosa",
                            detail:
                                "Enhorabuena!, Se ha creado una Acción correctiva"
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

    selectAccionCorrectiva(data: AccionCorrectivaModel) {
        this.store.dispatch(
            new fromRootStore.Go({
                path: [`/acciones/acciones-correctivas/${data.id}`]
            })
        );
    }

    deleteAccionCorrectiva(data: AccionCorrectivaModel) {
        this.resourceAccionCorrectivaService
            .deleteAccionCorrectiva(data)
            .subscribe(response => {
                this.accionesCorrectivas = this.accionesCorrectivas.filter(
                    accionCorrectivaActual =>
                        accionCorrectivaActual.id != response.id
                );
            });
    }

    getImportancias() {
        return this.accionesCorrectivasService.getImportancias();
    }

    getProcesos() {
        return this.accionesCorrectivasService.getProcesos();
    }

    getEstados() {
        return this.accionesCorrectivasService.getEstados();
    }

    hideWaitDialog() {
        this.store.dispatch(new fromShared.HideWaitDialog());
    }

    showWaitDialog(header: string, body?: string) {
        this.store.dispatch(new fromShared.ShowWaitDialog({ header, body }));
    }
}
