import { Component, ViewChild, OnInit } from "@angular/core";
import { AccionModel } from "../../../shared/models/accion.model";
import { AccionImportanciaModel } from "../../../shared/models/accion-importancia.model";
import { AccionCorrectivaService } from "../../../shared/services";
import { AccionesCorrectivasService, AccionesCorrectivasProcesoService, AccionesCorrectivasDocumentoService, AccionesCorrectivasAnalisisService } from "../../services";
import { ComponenteCargado } from "./ComponenteCargado";
import { EditAccionCorrectivaComponent, RelacionarProcesoComponent, CreateDocumentoAccionCorrectivaComponent, CreateMetodologiaAnalisisComponent } from "../../components";

// store
import { StoreModel } from "../../../shared/models/store.model";
import { Store } from "@ngrx/store";
import * as fromRootStore from "./../../../app/store"; 
import { forkJoin } from "rxjs";
import { map, finalize } from "rxjs/operators";

// models
import { AccionProcesoModel } from "../../../shared/models/accion-proceso.model";
import { MapaProcesoHijoModel } from "../../../shared/models/mapa_proceso_hijo.model";
import { AccionDocumentoModel } from "../../../shared/models/accion-documento.model";
import { AccionAnalisisTipoModel } from "../../../shared/models/accionAnalisisTipo.model";
import { AccionCorrectivaAnalisisModel } from "../../../shared/models/accion-correctiva-analisis.model";
import { AccionCorrectivaAnalisisHijoModel } from "../../../shared/models/accion-correctiva-analisis-hijo.model";
import { FormControl, FormArray, FormGroup } from "@angular/forms";



@Component({
    selector: 'accion-correctiva-panel',
    template: `<div class="ui-g">
                    <div class="ui-g-12">
                        <edit-accion-correctiva #edit [accionCorrectiva]="accionCorrrectivaActual"
                                                [importancias]="importancias"
                                                (onEditAccionCorrectiva)="updateAccionCorrectiva($event)">
                        </edit-accion-correctiva>
                    </div>
                </div>
                <div class="ui-g">
                    <div class="ui-g-12">
                        <div class="card card-w-title">
                            <relacionar-proceso #relate [data]="procesosAccionCorrectiva" 
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
                <div class="ui-g">
                    <div class="ui-g-12">
                        <div class="card card-w-title">
                            <create-accion-correctiva-documento #documentos 
                                                                [documentos]="documentosAccionCorrectiva"
                                                                (onCreateDocumentoAccionCorrectiva)="uploadDocumentosToAccionCorrectiva($event)"
                                                                (onDeleteDocumentoAccionCorrectiva)="deleteDocumentoFromAccionCorrectiva($event)"
                                                                (onDownloadDocumentoAccionCorrectiva)="downloadDocumentoFromAccionCorrectiva($event)">
                            </create-accion-correctiva-documento>
                        </div>
                    </div>
                </div>
                <div class="ui-g">
                    <div class="ui-g-12">
                        <div class="card card-w-title">
                            <create-metodologia-analisis #metodologia [metodologias]="metodologias"
                                                         [causas]="accionCorrectivaAnalisisHijos"
                                                         [metodologiaActual]="accionCorrectivaAnalisisActual"
                                                         (onCreateAccionAnalisis)="createAccionAnalisis($event)"
                                                         (onCreateAccionAnalisisHijos)="createAccionAnalisisHijos($event)"
                                                         (onCreateOnlyAccionAnalisisHijo)="createAccionAnalisisHijo($event)"
                                                         (onUpdateAccionAnalisisHijo)="updateAccionAnalisisHijo($event)"
                                                         [stepsItems]="stepsItems">
                            </create-metodologia-analisis>
                        </div>
                    </div>
                </div>
                `
})
export class AccionCorrectivaPanel extends ComponenteCargado implements OnInit {

    constructor(private accionCorrectivaService: AccionCorrectivaService,
                private accionesCorrectivasService: AccionesCorrectivasService,
                private accionesCorrectivasProcesoService: AccionesCorrectivasProcesoService,
                private accionCorrectivaDocumentoService: AccionesCorrectivasDocumentoService,
                private accionCorrectivaAnalisisService: AccionesCorrectivasAnalisisService, 
                private store: Store<StoreModel>){
        super(store);
    }

    // labels
    colsAccionCorrectivaProceso: any[];
    stepsItems: any[];

    // listas para utilizar

    importancias: AccionImportanciaModel[];

    procesos: MapaProcesoHijoModel[];

    metodologias: AccionAnalisisTipoModel[];

    loadingProcesos: boolean;

    // relaciones de accion correctiva

    accionCorrectivaActual: AccionModel;

    accionCorrectivaAnalisisActual: AccionCorrectivaAnalisisModel

    accionCorrectivaAnalisisHijos: AccionCorrectivaAnalisisHijoModel[];

    procesosAccionCorrectiva: AccionProcesoModel[];

    documentosAccionCorrectiva: AccionDocumentoModel[];
    

    // Hijos
    @ViewChild('edit')
    editAccionCorrectivaComponent: EditAccionCorrectivaComponent;

    @ViewChild('relate')
    relateAccionCorrectivaComponent: RelacionarProcesoComponent;

    @ViewChild('documentos')
    documentComponent: CreateDocumentoAccionCorrectivaComponent;

    @ViewChild('metodologia')
    metodologiaComponent: CreateMetodologiaAnalisisComponent;

    ngOnInit(){
        this.loadInitData();
    }

    loadInitData() {
        this.showWaitDialog(
            'Acción en proceso',
            'Consultado datos requeridos, un momento por favor...'
        );

        this.loadingProcesos = true;

        this.colsAccionCorrectivaProceso = [
            { field: 'nombre', header: 'Nombre proceso' },
            { field: 'acciones', header: 'Acciones' }
        ];

        this.stepsItems = [
            {label: 'Seleccione una metodología'},
            {label: 'Ingrese las ideas asociadas'},
            {label: 'Ajuste los cambios'}
        ]

        let esperandoId = true;
        let id = 0;

        this.store.select(fromRootStore.getRouterState).subscribe((RouterState) => {
            esperandoId = false;
            id = RouterState.state.params.id;
        });
            if(!esperandoId)
            {
                let aux = forkJoin([
                    this.getImportancias(),
                    this.getProcesos(),
                    this.getTiposAnalisis(),
                    this.getAccionCorrectiva(id)
                ]);

                aux.subscribe((
                    [   importancias,
                        procesos,
                        tiposAnalisis,
                        accionCorrectiva
                    ]) => {

                    this.importancias = importancias;
                    this.metodologias = tiposAnalisis
                    this.procesos = procesos.filter(procesoActual => !accionCorrectiva.procesos.find(procesoAccionCorrectivaA => procesoAccionCorrectivaA.id_mapa_procesos == procesoActual.id));

                    // Variables
                    this.accionCorrectivaActual = accionCorrectiva;


                    this.documentosAccionCorrectiva = accionCorrectiva.documentos;
                    this.procesosAccionCorrectiva = accionCorrectiva.procesos;
                    this.accionCorrectivaAnalisisActual = accionCorrectiva.metodologia_analisis;
                   

                    if(accionCorrectiva.metodologia_analisis)
                    {
                        this.accionCorrectivaAnalisisHijos = accionCorrectiva.metodologia_analisis.analisis_hijo;
                        // Validación estado wizard
                            if(this.accionCorrectivaAnalisisActual){
            
                                this.metodologiaComponent.stepComponent.activeIndex = 1;
                            }
                            if(this.accionCorrectivaAnalisisHijos.length > 0){
                                this.metodologiaComponent.stepComponent.activeIndex = 2;
                            }

                        this.createAccionAnalisisHijoByDefault(this.accionCorrectivaAnalisisActual);
                        this.metodologiaComponent.createFormularioAnalisisHijos(this.accionCorrectivaAnalisisHijos);
                    }
                    
                    setTimeout(() => {
                        this.editAccionCorrectivaComponent.setDataAccionCorrectiva(this.accionCorrectivaActual);
                        console.log(accionCorrectiva)
                        this.loadingProcesos = false;
                    }, 1);
                    this.hideWaitDialog();
                }
            );
        }
    }

    updateAccionCorrectiva(data: AccionModel) {
        this.accionCorrectivaService
            .updateAccionCorrectiva(data)
            .subscribe(response => {
                this.accionCorrectivaActual = response;
                this.hideWaitDialog();
            });
    }

    getAccionCorrectiva(id: number) {
        return this.accionCorrectivaService.getAccionCorrectiva(id).pipe(
            map(response => {
                const accionCorrectiva: AccionModel = {
                    ...response,
                    fecha_creacion: response.fecha_creacion * 1000
                };
                return accionCorrectiva;
            })
        );
    }

    addProcesoToAccionCorrectiva( data: MapaProcesoHijoModel[]) {
        this.showWaitDialog(
            'Acción en proceso',
            'Relacionando proceso a acción correctiva, un momento por favor...'
        );
        this.store.select(this.fromAuth.getUser).subscribe(usuario => {
            let accionCorrectivaProcesos: AccionProcesoModel[] = [];

            data.forEach(mapaProcesoHijo => {
                let accionCorrectivaProceso: AccionProcesoModel = {
                    id_mapa_procesos: mapaProcesoHijo.id,
                    id_accion_correctiva: this.accionCorrectivaActual.id,
                    id_usuario: usuario.id
                };
                accionCorrectivaProcesos.push(accionCorrectivaProceso);
            });

            this.accionesCorrectivasProcesoService.addProcesoToAccionCorrectiva(accionCorrectivaProcesos)
            .subscribe( procesosAccionCorrectiva => {
                this.procesosAccionCorrectiva = [
                    ...this.procesosAccionCorrectiva,
                    ...procesosAccionCorrectiva
                ]


                this.procesos = this.procesos.filter(procesoActual => {
                    let procesoBuscado = procesosAccionCorrectiva.find(element => procesoActual.id == element.id_mapa_procesos);
                    if(!procesoBuscado){
                        return procesoActual;
                    }
                });
                this.hideWaitDialog();
            });
        });
    }

    deleteProcesoFromAccionCorrectiva(data: AccionProcesoModel) {
        this.showWaitDialog(
            'Acción en proceso',
            'Eliminando proceso de acción correctiva, un momento por favor...'
        );
        this.accionesCorrectivasProcesoService
            .deleteProcesoFromAccionCorrectiva(data.id)
            .subscribe(procesoAccionCorrectiva => {
                this.procesosAccionCorrectiva = this.procesosAccionCorrectiva.filter(
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
            'Acción en proceso',
            'Realizando carga de documentos solicitados...'
        );

        const form: FormData = new FormData();
        files.forEach( archivo => {
            form.append('uploads[]',archivo, archivo.name);
        });

        this.accionCorrectivaDocumentoService
        .uploadDocumentosByAccionCorrectiva( this.accionCorrectivaActual.id ,form )
        .subscribe(response => {
            this.documentosAccionCorrectiva = [
                ...this.documentosAccionCorrectiva,
                ...response
            ]
            this.documentComponent.fu.clear();
            this.hideWaitDialog();
        });
    }

    downloadDocumentoFromAccionCorrectiva(event: AccionDocumentoModel) {
        this.accionCorrectivaDocumentoService
            .downloadAccionCorrectivaDocumento({ path: event.path })
            .subscribe(file => {
                const blob = new Blob([file], { type: file.type });

                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                document.body.appendChild(a);
                a.setAttribute('style', 'display: none');
                a.href = url;
                a.download = event.titulo;
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove(); // remove the element
                this.hideWaitDialog();
            });
    }
    
    deleteDocumentoFromAccionCorrectiva(event: AccionDocumentoModel) {
        this.accionCorrectivaDocumentoService.deleteDocumentoByAccionCorrectiva(event.id)
        .subscribe(response => {
            this.documentosAccionCorrectiva = this.documentosAccionCorrectiva.filter(
                documentos => documentos.id != response.id
            );
        });
    }

    createAccionAnalisis(data: AccionAnalisisTipoModel){
        this.store.select(this.fromAuth.getUser).subscribe(usuario => {
            const accionAnalisis: AccionCorrectivaAnalisisModel = {
                id_accion_correctiva: this.accionCorrectivaActual.id,
                id_accion_analisis_tipo: data.id,
                id_usuario: usuario.id 
            }
            this.accionCorrectivaAnalisisService.crearAnalisisAccionCorrectiva(accionAnalisis)
            .subscribe( response => {

                this.createAccionAnalisisHijoByDefault(response);
                this.accionCorrectivaAnalisisActual = response;
                this.metodologiaComponent.createFormularioAnalisisHijos(this.accionCorrectivaAnalisisHijos);
                this.metodologiaComponent.stepComponent.activeIndex = 1;
           
            });
        });
    }

    createAccionAnalisisHijos(data: AccionCorrectivaAnalisisHijoModel[]){
        this.store.select(this.fromAuth.getUser).subscribe(usuario => {

            data.forEach(accionAnalisisHijoActual => { 
                accionAnalisisHijoActual.id_usuario = usuario.id
                
                if(accionAnalisisHijoActual.padre){
                    accionAnalisisHijoActual.id_padre = accionAnalisisHijoActual.padre.id;
                    accionAnalisisHijoActual.padre = undefined;
                }
            });
            this.accionCorrectivaAnalisisService.createAnalisisAccionCorrectivaHijos(data).subscribe(response => {
                this.accionCorrectivaAnalisisHijos = [
                    ...this.accionCorrectivaAnalisisHijos,
                    ...response
                ];
                let cont: number = 0;
                let ideas = this.metodologiaComponent.ideasForm.get('ideas') as FormArray;

                response.forEach(hijoActual => {
                        let hijoFormado = {
                            id: hijoActual.id,
                            id_padre: hijoActual.id_padre,
                            padre: null,
                            id_accion_correctiva_analisis: hijoActual.id_accion_correctiva_analisis,
                            pregunta_causa_idea: hijoActual.pregunta_causa_idea,
                            respuestas: hijoActual.respuestas,
                            contribuyo: hijoActual.contribuyo
                        };
                        ideas.at(cont).setValue(hijoFormado);
                        cont++;
                });
            })
        });
    }

    createAccionAnalisisHijo(data){
        this.store.select(this.fromAuth.getUser).subscribe(usuario => {
            
            data.hijo.id_usuario = usuario.id;
            data.hijo.id_padre = data.hijo.padre.id;
                
            this.accionCorrectivaAnalisisService.createAnalisisAccionCorrectivaHijos([{...data.hijo}]).subscribe(response => {
                this.accionCorrectivaAnalisisHijos = [
                    ...this.accionCorrectivaAnalisisHijos,
                    ...response
                ];
                let cont: number = 0;
                let ideas = this.metodologiaComponent.ideasForm.get('ideas') as FormArray;
                console.log(ideas.at(data.index));
                let accionCorrectivaAnalisisHijoModel = [

                ];
                let hijoActual = response[0];
                let hijoFormado = {
                            id: hijoActual.id,
                            id_padre: hijoActual.id_padre,
                            padre: data.hijo.padre,
                            id_accion_correctiva_analisis: hijoActual.id_accion_correctiva_analisis,
                            pregunta_causa_idea: hijoActual.pregunta_causa_idea,
                            respuestas: hijoActual.respuestas,
                            contribuyo: hijoActual.contribuyo
                        };
                ideas.at(data.index).setValue(hijoFormado);
            })
        });
    }

    updateAccionAnalisisHijo(index,data: AccionCorrectivaAnalisisHijoModel){
        return this.accionCorrectivaAnalisisService.updateAnalisisAccionCorrectivaHijos(data.id,data).subscribe(response => {
            let ideas = this.metodologiaComponent.ideasForm.get('ideas') as FormArray;
            ideas.at(index).setValue(response);
        });
    }

    // getProcesosByAccionCorrectiva(id: number) {
    //     return this.accionesCorrectivasProcesoService.getProcesosByAccionCorrectiva(id);
    // }

    // getDocumentosByAccionCorrectiva(id: number) {
    //     return this.accionCorrectivaDocumentoService.getDocumentosByAccionCorrectiva(id);
    // }

    getImportancias() {
        return this.accionesCorrectivasService.getImportancias();
    }

    getProcesos() {
        return this.accionesCorrectivasService.getProcesos();
    }

    getTiposAnalisis() {
        return this.accionCorrectivaAnalisisService.getTiposAnalisis();
    }

    createAccionAnalisisHijoByDefault( response ) {
        let hijoModel: AccionCorrectivaAnalisisHijoModel = {
            id: null,
            id_padre: 0,
            padre: null,
            pregunta_causa_idea: '',
            contribuyo: '',
            respuestas: '',
            id_accion_correctiva_analisis: response.id};

            if(response.id_accion_analisis_tipo == 3)
            {
               hijoModel.id = 0;
               hijoModel.pregunta_causa_idea = 'Causa inicial';
            }

            this.accionCorrectivaAnalisisHijos = [
                hijoModel
            ]
    }

}
