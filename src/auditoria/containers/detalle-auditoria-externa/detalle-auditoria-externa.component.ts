import { Component, OnInit, ViewChild } from '@angular/core';
import { map, switchMap, take } from 'rxjs/operators';

//models
import { StoreModel } from '../../../shared/models/store.model';

//services
import { DetalleAuditoriaExternaService } from '../../services/detalle-auditoria-externa/detalle-auditoria-externa.service';
import { InformeService } from '../../../informes/services';

//store
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../app/store';
import * as fromShared from './../../../shared/store';
import { AuditoriaExternaModel } from '../../../shared/models/auditoria-externa.model';
import { forkJoin } from 'rxjs';
import { UsuarioModel } from '../../../shared/models/usuario.model';
import { ProveedorModel } from '../../../shared/models/proveedor.model';
import { DatosBasicosAuditoriaExternaComponent } from '../../components';
import { ListaPreguntaModel } from '../../../shared/models/auditoria-lista.model';
import { ListaAuditoriaExternaService } from '../../services';
import { AuditoriaExternaListaPreguntaModel } from '../../../shared/models/auditoria-externa-lista-pregunta.model';
import { AdministradorListasService } from '../../services';
import { MessageService } from 'primeng/api';
import * as fromRootStore from './../../../app/store';

import * as fromRouteStore from './../../../app/store';
import * as fromSharedStore from './../../../shared/store';
import * as fromAuthStore from './../../../auth/store';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'detalle-auditoria-externa',
    styleUrls: ['detalle-auditoria-externa.component.scss'],
    template: `
        <div class="ui-g">
            <div class="ui-g-12">
                <div class="card card-w-title">
                    <h1>Detalle auditoria externa 1</h1>
                    <div class="ui-g">
                        <div class="ui-g-12">
                            <datos-basicos-auditoria-externa #dbae
                                *ngIf="loadedAuditoria"
                                [auditores]="auditores"
                                [auditoria]="loadedAuditoria"
                                (onSearchProveedor)="searchProveedor($event)"
                                (onUpdateDatosBasicos)="updateDatosBasicos($event)">
                            </datos-basicos-auditoria-externa>
                            <listado-auditoria-listas #lal
                                *ngIf="listas"
                                [listas]="listas" 
                                (onSelectLista)="selectLista($event)">
                            </listado-auditoria-listas>
                            <programar-reunion-dialog #dialogProgramacion
                                (onCreateProgramacion)="programarReunion($event)">
                            </programar-reunion-dialog>
                            <div *ngIf="(loadedAuditoria?.id_estado == env?.estados_auditoria.reunion_programada) ||(loadedAuditoria?.id_estado == env?.estados_auditoria.creada)">
                                <editor-lista
                                    *ngIf="selectedLista"
                                    [lista]="selectedLista"
                                    (onUpdateListaData)="updateListaData($event)"
                                    (onUpdateListaNombre)="updateListaNombre($event)">
                                </editor-lista>
                            </div>
                            <div *ngIf="(loadedAuditoria?.id_estado == env?.estados_auditoria.inicio_preguntas) || (loadedAuditoria?.id_estado == env?.estados_auditoria.fin_preguntas) || (loadedAuditoria?.id_estado == env?.estados_auditoria.conclusiones_auditoria)|| (loadedAuditoria?.id_estado == env?.estados_auditoria.pre_finalizacion) || (loadedAuditoria?.id_estado == env?.estados_auditoria.finalizacion)">
                                <editor-lista-respuestas
                                    *ngIf="selectedLista"
                                    [lista]="selectedLista"
                                    [auditoria]="loadedAuditoria"
                                    (onPdf)="onExportPDF2($event)"
                                    (onUpdateListaData)="updateListaData($event)"
                                    (onUpdateListaNombre)="updateListaNombre($event)">
                                </editor-lista-respuestas>
                            </div>
                            <div>
                                
                            <div *ngIf="(loadedAuditoria?.id_estado == env?.estados_auditoria.finalizacion) || (loadedAuditoria?.id_estado == env?.estados_auditoria.pre_finalizacion)">
                                <conclusion-auditoria-finalizada #caf
                                    *ngIf="loadedAuditoria"
                                    [auditoria]="loadedAuditoria"
                                ></conclusion-auditoria-finalizada>
                            </div>
                            <conclusion-auditoria 
                                #dialogObs22
                                [auditoria]="loadedAuditoria"
                                (onCreateProgramacion)="preFinalizacionAuditoria($event,null,null)">
                            </conclusion-auditoria>
                            
                            </div>

                        </div>
                    
                        <div class="ui-g-12 text-aling-center ui-fluid">
                        <div
                            class="ui-g-6 ui-md-6 ui-md-offset-3"
                            *ngIf="
                                (loadedAuditoria?.id_estado ==
                                    env?.estados_auditoria.creada )">
                            <button
                                pButton
                                type="button"
                                label="Programar reunión"
                                (click)="dialogProgramacion.display = true">
                            </button>
                        </div>
                        <div
                            class="ui-g-6 ui-md-6 ui-md-offset-3"
                            *ngIf="
                                (loadedAuditoria?.id_estado ==
                                env?.estados_auditoria.reunion_programada )">
                            <button
                                pButton
                                type="button"
                                label="Iniciar preguntas"
                                (click) = "inicioPreguntas()">
                            </button>
                        </div>
                        <div
                            class="ui-g-6 ui-md-6 ui-md-offset-3"
                            *ngIf="
                                (loadedAuditoria?.id_estado ==
                                env?.estados_auditoria.inicio_preguntas )">
                            <button
                                pButton
                                type="button"
                                label="Finalizar preguntas"
                                (click) = "finPreguntas()">
                            </button>
                        </div>
                       
                        <div
                            class="ui-g-6 ui-md-6 ui-md-offset-3"
                            *ngIf="
                                (loadedAuditoria?.id_estado ==
                                env?.estados_auditoria.fin_preguntas )">
                            <button
                                pButton
                                type="button"
                                label="Pre finalización auditoria"
                                (click)="dialogObs22.display = true">
                            </button>
                        </div>
                        <div
                            class="ui-g-6 ui-md-6 ui-md-offset-3"
                            *ngIf="
                                (loadedAuditoria?.id_estado ==
                                env?.estados_auditoria.pre_finalizacion )">
                            <button
                                pButton
                                type="button"
                                label="Finalizar auditoria"
                                (click)="finalizacionAuditoria()">
                        </button>
                    </div>
                    </div>
                </div>
                
            </div>
        </div>
       
    `
})
export class DetalleAuditoriaExternaComponent implements OnInit {
    //atributos
    auditores: UsuarioModel[];
    loadedAuditoria: AuditoriaExternaModel;
    proveedores: ProveedorModel[];
    listas: any;
    selectedLista: ListaPreguntaModel;
    env = environment;
    display = true;
    //viewchild
    @ViewChild('dbae')
    dbae: DatosBasicosAuditoriaExternaComponent;

    constructor(
        private detalleAuditoriaExternaService: DetalleAuditoriaExternaService,
        private store: Store<StoreModel>,
        private listaAuditoriaExternaService: ListaAuditoriaExternaService,
        private administradorListasService: AdministradorListasService,
        private messageService: MessageService,
        private informeService: InformeService,


    ) {}

    ngOnInit() {
        this.getInitialInfo();
    }

    getInitialInfo() {
        this.showWaitDialog(
            'Consultado datos de auditoria, un momento por favor'
        );
        forkJoin([
            this.getAuditoria(),
            this.detalleAuditoriaExternaService.getInitialInfo()
        ]).subscribe(([auditoria, initialInfo]) => {
            this.loadedAuditoria = auditoria;
            this.auditores = initialInfo.auditores;
            this.listas = auditoria.listas;
            
            this.hideWaitDialog();
            console.log("HOLAA",auditoria);
        });
    }

    getAuditoria() {
        return this.store.select(fromRoot.getRouterState).pipe(
            take(1),
            map(routeState => routeState.state.params.id),
            switchMap(id =>
                this.detalleAuditoriaExternaService.getAuditoriaExterna(id)
            )
        );
    }

    hideWaitDialog() {
        this.store.dispatch(new fromShared.HideWaitDialog());
    }

    selectLista(id: number) {
        this.showWaitDialog("","Consultando lista, un momento por favor");
        this.administradorListasService.getListaAud(id).subscribe(response => {
            this.selectedLista = response;
            this.hideWaitDialog();
        });
    }

    searchProveedor(query: string) {
        this.detalleAuditoriaExternaService
            .serachProveedor({ query })
            .subscribe(response => (this.dbae.filteredProveedores = response));
    }

    showWaitDialog(header: string, body?: string) {
        this.store.dispatch(new fromShared.ShowWaitDialog({ header, body }));
    }

    updateDatosBasicos(data: AuditoriaExternaModel) {
        this.showWaitDialog(
            'Actualizando datos de auditoria, un momento por favor...'
        );
        this.detalleAuditoriaExternaService
            .updateDatosBasicos(this.loadedAuditoria.id, data)
            .subscribe(response => {
                this.loadedAuditoria = {
                    ...this.loadedAuditoria,
                    ...response
                };
                setTimeout(() => {
                    this.dbae.createForm();
                    this.hideWaitDialog();
                }, 1);
            });
    }

    updateListaData(lista: ListaPreguntaModel) {
        this.showWaitDialog(
            'Actualizando datos de la lista, un momento por favor'
        );
        this.administradorListasService
            .updateListaDataAud(lista.id, lista.data)
            .subscribe(response => {
                this.hideWaitDialog();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Lista actualizada exitosamente'
                });

            });
    }

    updateListaNombre(lista: ListaPreguntaModel) {
        this.showWaitDialog(
            'Actualizando nombre de la lista, un momento por favor'
        );
        this.administradorListasService
            .updateListaNombre(lista.id, { nombre: lista.nombre })
            .subscribe(response => {
                this.listas = this.listas.map(
                    (e, i) =>
                        e.id != lista.id ? e : { ...e, nombre: lista.nombre }
                );

                this.hideWaitDialog();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Lista actualizada exitosamente'
                });
            });
    }

    programarReunion(fecha_reunion) {
        this.showWaitDialog('','Programando reunión, un momento por favor...');

        let data = {
            estado: environment.estados_auditoria.reunion_programada,
            data: {
                fecha_reunion: fecha_reunion * 1000
                
            }
        };
        this.cambiarEstadoAuditoria(data);
    }

    inicioPreguntas() {
        this.showWaitDialog('','Programando reunión, un momento por favor...');

        let data = {
            estado: environment.estados_auditoria.inicio_preguntas,
           
        };
        this.cambiarEstadoAuditoria(data);
    }

    
    finPreguntas() {
        this.showWaitDialog('','Programando reunión, un momento por favor...');

        let data = {
            estado: environment.estados_auditoria.fin_preguntas,
           
        };
        this.cambiarEstadoAuditoria(data);
    }

    conclusionAuditoria(conclusion,fortaleza) {
        this.showWaitDialog('','Programando reunión, un momento por favor...');

        let data = {
            estado: environment.estados_auditoria.conclusiones_auditoria,
            data: {
                conclusion: conclusion,
                fortaleza: fortaleza   
            }
           
        };
        this.cambiarEstadoAuditoria(data);
    }

    preFinalizacionAuditoria(observacion,conclusion,fortaleza) {
        this.showWaitDialog('','Programando reunión, un momento por favor...');

        let data = {
            estado: environment.estados_auditoria.pre_finalizacion,
            data:{
                observacion: observacion,
                conclusion: conclusion,
                fortaleza: fortaleza
            
            }
        };
        this.cambiarEstadoAuditoria(data);
    }
    
    finalizacionAuditoria() {
        this.showWaitDialog('','Programando reunión, un momento por favor...');

        let data = {
            estado: environment.estados_auditoria.finalizacion,

        };
        this.cambiarEstadoAuditoria(data);
    }
    
    cambiarEstadoAuditoria(data) {
        this.listaAuditoriaExternaService
            .updateEstadoAuditoria(this.loadedAuditoria.id, data)
            .subscribe(response => {
                this.hideWaitDialog();
                this.store.dispatch(
                    new fromRouteStore.Go({
                        path: [`/auditoria/externa/lista`]
                    })
                );
            });
    }

    onExportPDF2(event) {
        this.showWaitDialog('Informes', 'Generando informe, un momento por favor...')
        this.informeService.exportPDF2AuditoriaExterna(event,event.id).subscribe(response => {
            const blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
            this.hideWaitDialog();
        })
    }

}
