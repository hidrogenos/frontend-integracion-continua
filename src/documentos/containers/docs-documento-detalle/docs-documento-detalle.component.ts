import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, forkJoin } from 'rxjs';
import { MessageService } from 'primeng/api';

import * as fromRouteStore from './../../../app/store';
import * as fromSharedStore from './../../../shared/store';
import * as fromAuthStore from './../../../auth/store';

import { environment } from '../../../environments/environment';

import { take, switchMap } from 'rxjs/operators';

import { DocsDocumentoService } from '../../services';
import { DocumentoProcesoService, DocumentoAdjuntoService, DocumentoDivulgacionRegistroService } from '../../../shared/services';

import { DocumentoProcesoModel } from '../../../shared/models/documento-proceso.model';
import { DocumentoTipoModel } from '../../../shared/models/documento-tipo.model';
import { DocumentoModel } from '../../../shared/models/documento.model';
import { MapaProcesoHijoModel } from '../../../shared/models/mapa_proceso_hijo.model';

import { DocsInformacionGeneralDocumentoComponent } from '../../components/docs-informacion-general-documento/docs-informacion-general-documento.component';
import { DocsDetalleAdjuntarDocumentoComponent } from '../../components/docs-detalle-adjuntar-documento/docs-detalle-adjuntar-documento.component';
import { DocumentoAsociadoModel } from '../../../shared/models/documento-asociado.model';
import { DocumentoAsociadoService } from '../../../shared/services/documento-asociado/documento-asociado.service';
import { DocsDocumentosAsociadosComponent, DocsObservacionDialogComponent } from '../../components';
import { UsuarioModel } from '../../../shared/models/usuario.model';

@Component({
    selector: 'docs-documento-detalle',
    template: `
        <div class="ui-g">
            <div class="ui-g-12">
                <div class="card card-w-title">
                    <h1>{{ documento?.tipo_documento.nombre}} - {{ documento?.titulo }}</h1>
                    <docs-informacion-general-documento #digd
                        [filteredRespAprobacion]="filteredRespAprobacion" (onFilterRespAprobacion)="onFilterRespAprobacion($event)"
                        [filteredRespRevision]="filteredRespRevision" (onFilterRespRevision)="onFilterRespRevision($event)"
                        [filteredRespElaboracion]="filteredRespElaboracion" (onFilterRespElaboracion)="onFilterRespElaboracion($event)"
                        [filteredProcesos]="filteredProcesos" (onFilterProcesos)="onFilterProcesos($event)"
                        (onUpdateDoc)="onSubmitUpdateDoc($event)"
                        [puedeEditar]="permisoPuedeEditar"
                        [puedeReasignar]="permisoPuedeReasignar"
                        [puedeReelaborar]="permisoPuedeReelaborar"
                        (onSolicitarReasignacion)="dialogReasignacion.display = true"
                        (onSolicitarReelaboracion)="dialogReelaboracion.display = true"
                    ></docs-informacion-general-documento>
                    <docs-procesos-asociados [procesos]="procesos" 
                        [procesosDocumento]="documento?.procesos"
                        (onDeleteProceso)="onDeleteProceso($event)"
                        (onAsociarProceso)="onAsociarProceso($event)"
                        [puedeEditar]="permisoPuedeEditar">
                    </docs-procesos-asociados>
                    <docs-detalle-editor-documento 
                        [text]="documento?.documento"
                        (onGuardarDocumento)="onGuardarDocumento($event)"
                        [puedeEditar]="permisoPuedeEditarDocumento">
                    </docs-detalle-editor-documento>
                    <docs-detalle-adjuntar-documento #ddad
                        [titulo]="'Adjuntar documentos'"
                        [adjuntos]="documento?.adjuntos"
                        (onAdjuntarDocumento)="onAdjuntarDocumento($event)"
                        (onDeleteAdjunto)="onDeleteAdjunto($event)"
                        (onVerAdjunto)="onVerAdjunto($event)"
                        [puedeEditar]="permisoPuedeEditarDocumento">
                    </docs-detalle-adjuntar-documento>
                    <docs-documentos-asociados #docasoc
                        [tiposDocumento]="tiposDocumento | async"
                        [documentosAsociados]="documento?.documentos_asociados"
                        [filteredDocumento]="filteredDocumento"
                        (onFilterDocumento)="onFilterDocumento($event)"
                        (onRelacionarDocumento)="onRelacionarDocumento($event)"
                        (onDeleteDocumento)="onDeleteDocumentoAsociado($event)"
                        [puedeEditar]="permisoPuedeEditarDocumento">
                    </docs-documentos-asociados>

                    <docs-detalle-adjuntar-documento #ddadflujo
                        *ngIf="permisoPuedePonerEnMarcha || permisoPuedePonerObsoleto"
                        [titulo]="'Adjuntar documentación del flujo'"
                        [adjuntos]="documento?.divulgacion_registros"
                        (onAdjuntarDocumento)="onAdjuntarDocumentoFlujo($event)"
                        (onDeleteAdjunto)="onDeleteAdjuntoFlujo($event)"
                        (onVerAdjunto)="onVerAdjuntoFlujo($event)"
                        [puedeEditar]="permisoPuedePonerEnMarcha">
                    </docs-detalle-adjuntar-documento>

                    <div class="ui-g" *ngIf="documento">
                        <div class="ui-g-12 text-aling-center ui-fluid">
                            <div class="ui-g-6 ui-md-3 ui-md-offset-2"
                                *ngIf="permisoPuedeEditar &&
                                (documento?.id_estado == env?.estados_documento.en_creacion
                                || documento.id_estado == env?.estados_documento.para_reasignacion)">
                                <button pButton type="button" label="Enviar a elaboración" 
                                (click)="enviarElaboracion()"></button>
                            </div>
                            <div class="ui-g-6 ui-md-4 ui-md-offset-4"
                                *ngIf="permisoPuedeEditarDocumento &&
                                (documento?.id_estado == env?.estados_documento.en_elaboracion
                                || documento.id_estado == env?.estados_documento.para_reelaboracion)">
                                <button pButton type="button" label="Enviar a revisión" 
                                (click)="dialogRevision.display = true"></button>
                            </div>
                            <!-- En revisión-> Solicitar aprobación o rechazar -->
                            <div class="ui-g-6 ui-md-4 ui-md-offset-2"
                                *ngIf="permisoPuedeReelaborar" >
                                <button pButton type="button" label="Solicitar aprobación" 
                                (click)="dialogAprobacion.display = true"></button>
                            </div>
                            <div class="ui-g-6 ui-md-4"
                                *ngIf="permisoPuedeReelaborar" >
                                <button pButton type="button" label="Rechazar" 
                                class="ui-button-danger"
                                (click)="dialogRechazo.display = true"></button>
                            </div>
                            <!-- Usuario creador puede retomar rechazo -->
                            <div class="ui-g-6 ui-md-3 ui-md-offset-2"
                                *ngIf="permisoPuedeRetomar">
                                <button pButton type="button" label="Retomar" 
                                (click)="dialogRevision.display = true"
                                ></button>
                            </div>
                            <!-- Aprobar o solicitar reelaboración -->
                            <div class="ui-g-6 ui-md-3 ui-md-offset-2"
                                *ngIf="permisoPuedeAprobar">
                                <button pButton type="button" label="Aprobar" 
                                (click)="dialogAprobar.display = true"
                                ></button>
                            </div>
                            <div class="ui-g-6 ui-md-3"
                                *ngIf="permisoPuedeAprobar">
                                <button pButton type="button" label="Solicitar reelaboración" 
                                (click)="dialogReelaboracion.display = true"
                                ></button>
                            </div>
                            <!-- Enviar a divulgación -->
                            <div class="ui-g-6 ui-md-4 ui-md-offset-4"
                                *ngIf="puedeDivulgar()">
                                <button pButton type="button" label="Divulgar" 
                                (click)="dialogDivulgar.display = true"
                                ></button>
                            </div>
                            <!-- Puesta en marcha -->
                            <div class="ui-g-6 ui-md-4 ui-md-offset-4"
                                *ngIf="puedePonerEnMarcha()">
                                <button pButton type="button" label="Puesta en marcha" 
                                (click)="dialogPuestaMarcha.display = true"
                                ></button>
                            </div>
                            <!-- Obsoleto -->
                            <div class="ui-g-6 ui-md-4 ui-md-offset-4"
                                *ngIf="puedePonerObsoleto()">
                                <button pButton type="button" label="Obsoleto" 
                                (click)="dialogObsoleto.display = true"
                                ></button>
                            </div>
                            <!-- Anular -->
                            <div class="ui-g-6 ui-md-3"
                                *ngIf="documento?.id_estado !== env?.estados_documento.anulado
                                && documento?.id_estado !== env?.estados_documento.en_elaboracion
                                && documento?.id_estado !== env?.estados_documento.para_reelaboracion
                                && (permisoPuedeEditar || permisoPuedeRetomar || permisoPuedeAprobar)">
                                <button pButton type="button" label="Anular" 
                                (click)="dialogAnular.display = true" class="ui-button-danger"
                                ></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <docs-observaciones-dialog #dialogAnular [tipo]="'Anular ' + documento?.titulo"
        (onConfirmDialog)="anularDocumento($event)"
        ></docs-observaciones-dialog>

        <docs-observaciones-dialog #dialogReasignacion [tipo]="'Reasignar ' + documento?.titulo"
        (onConfirmDialog)="reasignarDocumento($event)"
        ></docs-observaciones-dialog>

        <docs-observaciones-dialog #dialogReelaboracion [tipo]="'Solicitar reelaboración ' + documento?.titulo"
        (onConfirmDialog)="reelaborarDocumento($event)"
        ></docs-observaciones-dialog>

        <docs-observaciones-dialog #dialogRevision [tipo]="'Enviar a revisión ' + documento?.titulo"
        (onConfirmDialog)="enviarARevisionDocumento($event)"
        ></docs-observaciones-dialog>

        <docs-observaciones-dialog #dialogAprobacion [tipo]="'Solicitar aprobación ' + documento?.titulo"
        (onConfirmDialog)="enviarAAprobacionDocumento($event)"
        ></docs-observaciones-dialog>

        <docs-observaciones-dialog #dialogRechazo [tipo]="'Rechazar ' + documento?.titulo"
        (onConfirmDialog)="rechazarDocumento($event)"
        ></docs-observaciones-dialog>

        <docs-observaciones-dialog #dialogAprobar [tipo]="'Aprobar ' + documento?.titulo"
        (onConfirmDialog)="aprobarDocumento($event)"
        ></docs-observaciones-dialog>

        <docs-divulgacion-dialog #dialogDivulgar [tipo]="'Divulgar ' + documento?.titulo"
        (onConfirmDialog)="solDivulgacionDocumento($event)"
        ></docs-divulgacion-dialog>

        <docs-puesta-marcha-dialog #dialogPuestaMarcha [tipo]="'Puesta en marcha ' + documento?.titulo"
            [adjuntos]="documento?.divulgacion_registros"
            (onConfirmDialog)="divulgarDocumento($event)"
            (onAdjuntarDocumento)="onAdjuntarDocumentoFlujo($event)"
            (onDeleteAdjunto)="onDeleteAdjuntoFlujo($event)"
            (onVerAdjunto)="onVerAdjuntoFlujo($event)"
        ></docs-puesta-marcha-dialog>
        
        <docs-obsoleto-dialog #dialogObsoleto [tipo]="'Obsoleto ' + documento?.titulo"
        [documentosObsoleto]="documentosObsoleto"
        (onFilterDocumentosObsoletos)="onFilterDocumentosObsoletos($event)"
        (onConfirmDialog)="docObsoletoDocumento($event)"
        ></docs-obsoleto-dialog>
        
    `
})
export class DocsDocumentoDetalleComponent implements OnInit {

    documento: DocumentoModel;
    procesos: MapaProcesoHijoModel[];

    filteredRespAprobacion;
    filteredRespRevision;
    filteredRespElaboracion;
    filteredProcesos;
    filteredDocumento;
    documentosObsoleto;
    tiposDocumento: Observable<DocumentoTipoModel[]>;
    usuarioLogged: UsuarioModel;

    @ViewChild('digd') digd: DocsInformacionGeneralDocumentoComponent;
    @ViewChild('ddad') ddad: DocsDetalleAdjuntarDocumentoComponent;
    @ViewChild('ddadflujo') ddadflujo: DocsDetalleAdjuntarDocumentoComponent;
    @ViewChild('docasoc') docasoc: DocsDocumentosAsociadosComponent;
    @ViewChild('dialogAnular') dialogAnular: DocsObservacionDialogComponent;

    permisoPuedeEditar: boolean = false;
    permisoPuedeEditarDocumento: boolean = false;
    permisoPuedeReasignar: boolean = false;
    permisoPuedeReelaborar: boolean = false;
    permisoPuedeRetomar: boolean = false;
    permisoPuedeAprobar: boolean = false;
    permisoPuedePonerEnMarcha: boolean = false;
    permisoPuedePonerObsoleto: boolean = false;

    env = environment;

    constructor(
        private store: Store<fromRouteStore.State>,
        private docsDocumentoService: DocsDocumentoService,
        private documentoAsociadoService: DocumentoAsociadoService,
        private documentoProcesoService: DocumentoProcesoService,
        private documentoAdjuntoService: DocumentoAdjuntoService,
        private documentoDivulgacionregistroService: DocumentoDivulgacionRegistroService,
        private messageService: MessageService
    ) {

    }

    ngOnInit() {
        this.showWaitDialog('Documento', 'Consultando documento, un momento por favor...')
        this.tiposDocumento = this.store.select(fromSharedStore.getAllDocumentoTipos);
        this.store.select(fromAuthStore.getUser).subscribe(usuario => {
            this.usuarioLogged = usuario;
        });
        this.store.select(fromRouteStore.getRouterState).pipe(
            take(1),
            switchMap(route => {
                return forkJoin(
                    this.getDocumentoById(route.state.params.documentoId),
                    this.getProcesosNoAsociados(route.state.params.documentoId)
                )

            })
        ).subscribe(([documento, procesos]) => {
            this.documento = documento;
            this.procesos = procesos;
            this.permisoPuedeEditar = this.puedeEditar();
            this.permisoPuedeEditarDocumento = this.puedeEditarDocumento();
            this.permisoPuedeReasignar = this.puedeReasignar();
            this.permisoPuedeReelaborar = this.puedeReelaborar();
            this.permisoPuedeRetomar = this.puedeRetomar();
            this.permisoPuedeAprobar = this.puedeAprobar();
            this.permisoPuedePonerEnMarcha = this.puedePonerEnMarcha();
            this.permisoPuedePonerObsoleto = this.puedePonerObsoleto();
            this.digd.inicializarForm(this.documento, this.permisoPuedeEditar);
            this.hideWaitDialog();
        })
    }

    getDocumentoById(id) {
        return this.docsDocumentoService.getDocumentoById(id)
    }

    getProcesosNoAsociados(idDocumento): Observable<MapaProcesoHijoModel[]> {
        return this.docsDocumentoService.getProcesosNoAsociados(idDocumento)
    }

    hideWaitDialog() {
        this.store.dispatch(new fromSharedStore.HideWaitDialog());
    }

    showWaitDialog(header: string, body?: string) {
        this.store.dispatch(new fromSharedStore.ShowWaitDialog({ header, body }));
    }
    onFilterRespAprobacion(event) {
        this.getUserQuery(event).subscribe(response => {
            this.filteredRespAprobacion = response;
        })
    }

    onFilterRespRevision(event) {
        this.getUserQuery(event).subscribe(response => {
            this.filteredRespRevision = response;
        })
    }

    onFilterRespElaboracion(event) {
        this.getUserQuery(event).subscribe(response => {
            this.filteredRespElaboracion = response;
        })
    }

    onFilterDocumentosObsoletos(event) {
        let obj = {
            query: event,
            id_documento: this.documento.id
        }
        this.docsDocumentoService.getDocumentosReemplazoQuery(obj).subscribe(response => {
            this.documentosObsoleto = response;
        })
    }

    getUserQuery(query) {
        return this.docsDocumentoService.getUsuariosQuery(query);
    }

    onSubmitUpdateDoc(documentoForm) {
        this.showWaitDialog('Documentos', 'Actualizando documento, un momento por favor...');
        this.docsDocumentoService.updateDocumento(documentoForm).subscribe((response: DocumentoModel) => {
            this.documento.titulo = response.titulo;
            this.digd.form.patchValue({
                version: response.version
            });
            this.hideWaitDialog();
            this.messageService.add({ severity: 'success', summary: 'Documento actualizado correctamente' })
        })
    }

    onDeleteProceso(idProcesoDoc) {
        this.showWaitDialog('Documentos', 'Eliminando proceso, un momento por favor...');
        this.documentoProcesoService.deleteDocumentoProceso(idProcesoDoc).pipe(
            switchMap(() => {
                return this.getProcesosNoAsociados(this.documento.id)
            })
        ).subscribe((procesos) => {
            this.documento.procesos = this.documento.procesos.filter(proceso => proceso.pivot.id !== idProcesoDoc);
            this.procesos = procesos;
            this.hideWaitDialog();
        })
    }

    onAsociarProceso(proceso) {
        this.showWaitDialog('Documentos', 'Asociando proceso, un momento por favor...');
        let docProceso: DocumentoProcesoModel = {
            id_documento: this.documento.id,
            id_mapa_procesos: proceso.id,
            id: null
        }
        this.documentoProcesoService.createDocumentoProceso(docProceso).subscribe(response => {
            let procesoAsociado = this.procesos.find(item => item.id == proceso.id);
            procesoAsociado.pivot = response;
            this.procesos = this.procesos.filter(item => item.id !== proceso.id);
            this.documento.procesos.push(procesoAsociado);
            this.hideWaitDialog();
        })
    }

    onGuardarDocumento(texto) {
        this.showWaitDialog('Documentos', 'Editando documento, un momento por favor...');
        this.docsDocumentoService.updateDocumentoTexto(this.documento.id, texto).subscribe(response => {
            this.hideWaitDialog();
        })
    }

    onAdjuntarDocumento(files: File[]) {
        this.showWaitDialog(
            'Documento',
            'Realizando carga de documentos, un momento por favor...'
        );

        const formData: FormData = new FormData();
        files.forEach(archivo => {
            formData.append('uploads[]', archivo, archivo.name);
        });

        this.docsDocumentoService
            .uploadAdjuntoByDocumento(this.documento.id, formData)
            .subscribe(response => {
                this.documento.adjuntos = [
                    ...this.documento.adjuntos,
                    ...response
                ]
                this.ddad.fu.clear();
                this.hideWaitDialog();
            });
    }

    onDeleteAdjunto(adjunto) {
        this.showWaitDialog(
            'Documento',
            'Eliminando documento, un momento por favor...'
        );
        this.documentoAdjuntoService.updateDocumentoAdjunto(adjunto).subscribe(response => {
            this.documento.adjuntos = this.documento.adjuntos.filter(item => item.id !== adjunto.id);
            this.hideWaitDialog();
        })
    }

    onVerAdjunto(adjunto) {
        this.store.dispatch(
            new fromRouteStore.Go({
                path: [
                    `visor-adjunto/${
                    environment.tipos_documento.documento_adjunto_doc.id
                    }/${adjunto.id}/${adjunto.titulo}`
                ]
            })
        );
    }

    onAdjuntarDocumentoFlujo(files: File[]) {
        this.showWaitDialog(
            'Documento',
            'Realizando carga de documentos, un momento por favor...'
        );

        const formData: FormData = new FormData();
        files.forEach(archivo => {
            formData.append('uploads[]', archivo, archivo.name);
        });

        this.docsDocumentoService
            .uploadAdjuntoFlujoByDocumento(this.documento.id, formData)
            .subscribe(response => {
                this.documento.divulgacion_registros = [
                    ...this.documento.divulgacion_registros,
                    ...response
                ]
                this.ddadflujo.fu.clear();
                this.hideWaitDialog();
            });
    }

    onDeleteAdjuntoFlujo(adjunto) {
        this.showWaitDialog(
            'Documento',
            'Eliminando documento, un momento por favor...'
        );
        this.documentoDivulgacionregistroService.updateDocumentoDivulgacionRegistro(adjunto)
            .subscribe(response => {
                this.documento.divulgacion_registros = this.documento.divulgacion_registros
                    .filter(item => item.id !== adjunto.id);
                this.hideWaitDialog();
            })
    }

    onVerAdjuntoFlujo(adjunto) {
        this.store.dispatch(
            new fromRouteStore.Go({
                path: [
                    `visor-adjunto/${
                    environment.tipos_documento.documento_adjunto_flujo_doc.id
                    }/${adjunto.id}/${adjunto.titulo}`
                ]
            })
        );
    }

    onFilterDocumento(filter: { query: string, id_tipo_documento: number, id_documento: number }) {
        filter.id_documento = this.documento.id;
        this.docsDocumentoService.getDocumentoQueryByTipo(filter).subscribe(response => {
            this.filteredDocumento = response;
        })
    }

    onRelacionarDocumento(documentoAsociado) {
        this.showWaitDialog('Documentos', 'Asociando documento, un momento por favor...');
        let docAsociado: DocumentoAsociadoModel = {
            id_documento: this.documento.id,
            id_documento_asociado: documentoAsociado.id,
            id: null
        }
        this.documentoAsociadoService.createDocumentoAsociado(docAsociado).subscribe(response => {
            documentoAsociado.pivot = response;
            this.documento.documentos_asociados.push(documentoAsociado);
            this.docasoc.documentoSelected = null;
            this.hideWaitDialog();
        })
    }

    onDeleteDocumentoAsociado(docAsociado) {
        this.showWaitDialog('Documentos', 'Eliminando asociado, un momento por favor...');
        this.documentoAsociadoService.deleteDocumentoAsociado(docAsociado.pivot.id).subscribe(response => {
            this.documento.documentos_asociados = this.documento.documentos_asociados
                .filter(item => item.id !== docAsociado.id);
            this.hideWaitDialog();
        })
    }

    anularDocumento(observacion) {
        this.showWaitDialog('Documentos', 'Anulando documento, un momento por favor...');
        let data = {
            estado: environment.estados_documento.anulado,
            data: {
                observacion: observacion
            }
        };
        this.cambiarEstadoDocumento(data);
    }

    reasignarDocumento(observacion) {
        this.showWaitDialog('Documentos', 'Reasignando documento, un momento por favor...');
        let data = {
            estado: environment.estados_documento.para_reasignacion,
            data: {
                observacion: observacion
            }
        };
        this.cambiarEstadoDocumento(data);
    }

    reelaborarDocumento(observacion) {
        this.showWaitDialog('Documentos', 'Solicitando reelaboración de documento, un momento por favor...');
        let data = {
            estado: environment.estados_documento.para_reelaboracion,
            data: {
                observacion: observacion
            }
        };
        this.cambiarEstadoDocumento(data);
    }

    enviarElaboracion() {
        this.showWaitDialog('Documentos', 'Enviando documento a elaboración, un momento por favor...');
        let data = {
            estado: environment.estados_documento.en_elaboracion,
            data: null
        };
        this.cambiarEstadoDocumento(data);
    }

    enviarARevisionDocumento(observacion) {
        this.showWaitDialog('Documentos', 'Enviando documento a revisión, un momento por favor...');
        let data = {
            estado: environment.estados_documento.en_revision,
            data: {
                observacion: observacion
            }
        };
        this.cambiarEstadoDocumento(data);
    }

    enviarAAprobacionDocumento(observacion) {
        this.showWaitDialog('Documentos', 'Solicitando aprobación de documento, un momento por favor...');
        let data = {
            estado: environment.estados_documento.en_aprobacion,
            data: {
                observacion: observacion
            }
        };
        this.cambiarEstadoDocumento(data);
    }

    rechazarDocumento(observacion) {
        this.showWaitDialog('Documentos', 'Rechazando documento, un momento por favor...');
        let data = {
            estado: environment.estados_documento.rechazado,
            data: {
                observacion: observacion
            }
        };
        this.cambiarEstadoDocumento(data);
    }

    aprobarDocumento(observacion) {
        this.showWaitDialog('Documentos', 'Aprobando documento, un momento por favor...');
        let data = {
            estado: environment.estados_documento.aprobado,
            data: {
                observacion: observacion
            }
        };
        this.cambiarEstadoDocumento(data);
    }

    solDivulgacionDocumento(formData) {
        this.showWaitDialog('Documentos', 'Solicitando divulgación de documento, un momento por favor...');
        let data = {
            estado: environment.estados_documento.en_divulgacion,
            data: {
                observacion: formData.observacion,
                fecha_divulgacion: (formData.fecha_divulgacion.getTime()) / 1000
            }
        };
        this.cambiarEstadoDocumento(data);
    }

    divulgarDocumento(formData) {
        this.showWaitDialog('Documentos', 'Divulgando documento, un momento por favor...');
        let data = {
            estado: environment.estados_documento.vigente,
            data: {
                observacion: formData.observacion,
                fecha_inicio: (formData.fecha_inicio.getTime()) / 1000,
                fecha_fin: (formData.fecha_fin.getTime()) / 1000
            }
        };
        this.cambiarEstadoDocumento(data);
    }

    docObsoletoDocumento(formData) {
        this.showWaitDialog('Documentos', 'Divulgando documento, un momento por favor...');
        let data = {
            estado: environment.estados_documento.obsoleto,
            data: formData
        };
        this.cambiarEstadoDocumento(data);
    }

    cambiarEstadoDocumento(data) {
        this.docsDocumentoService
            .updateEstadoDocumento(this.documento.id, data)
            .subscribe(response => {
                this.hideWaitDialog();
                this.store.dispatch(
                    new fromRouteStore.Go({
                        path: [
                            `documentos/${this.documento.id_tipo}`
                        ]
                    })
                );
            })
    }

    puedeEditar() {
        // usuario logueado crea el documento ó se solicitó reasignación
        if (this.usuarioLogged.id == this.documento.id_responsable_crea
            && (this.documento.id_estado == environment.estados_documento.en_creacion
                || this.documento.id_estado == environment.estados_documento.para_reasignacion)
        ) {
            return true;
        }
        else {
            return false;
        }
    }
    puedeEditarDocumento() {
        // usuario logueado crea el documento ó se solicitó reasignación
        if (this.usuarioLogged.id == this.documento.id_responsable_crea
            && (this.documento.id_estado == environment.estados_documento.en_creacion
                || this.documento.id_estado == environment.estados_documento.para_reasignacion)
        ) {
            return true;
        }
        // usuario logueado elabora documento ó se solicitó reelaboración
        else if (this.usuarioLogged.id == this.documento.id_responsable_elabora
            && (this.documento.id_estado == environment.estados_documento.en_elaboracion
                || this.documento.id_estado == environment.estados_documento.para_reelaboracion)) {
            return true;
        }
        else {
            return false;
        }
    }

    puedeReasignar() {
        if (this.usuarioLogged.id == this.documento.id_responsable_elabora
            && (this.documento.id_estado == environment.estados_documento.en_elaboracion
                || this.documento.id_estado == environment.estados_documento.para_reelaboracion)) {
            return true;
        }
        else {
            return false;
        }
    }

    puedeReelaborar() {
        if (this.usuarioLogged.id == this.documento.id_responsable_revisa
            && this.documento.id_estado == environment.estados_documento.en_revision) {
            return true;
        }
        else {
            return false;
        }
    }

    puedeRetomar() {
        if (this.usuarioLogged.id == this.documento.id_responsable_crea
            && this.documento.id_estado == environment.estados_documento.rechazado) {
            return true;
        }
        else {
            return false;
        }
    }

    puedeAprobar() {
        if (this.usuarioLogged.id == this.documento.id_responsable_aprueba
            && this.documento.id_estado == environment.estados_documento.en_aprobacion) {
            return true;
        }
        else {
            return false;
        }
    }

    puedeDivulgar() {
        if (this.documento.id_estado == environment.estados_documento.aprobado &&
            this.usuarioLogged.es_jefe == true) {
            return true;
        } else {
            return false;
        }
    }

    puedePonerEnMarcha() {
        if (this.documento.id_estado == environment.estados_documento.en_divulgacion &&
            this.usuarioLogged.es_jefe == true) {
            return true;
        } else {
            return false;
        }
    }

    puedePonerObsoleto() {
        if (this.documento.id_estado == environment.estados_documento.vigente &&
            this.usuarioLogged.es_jefe == true) {
            return true;
        } else {
            return false;
        }
    }
}