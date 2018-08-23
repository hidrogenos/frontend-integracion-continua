import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, forkJoin } from 'rxjs';
import { MessageService } from 'primeng/api';

import * as fromRouteStore from './../../../app/store';
import * as fromSharedStore from './../../../shared/store';

import { take, switchMap } from 'rxjs/operators';

import { DocsDocumentoService } from '../../services';
import { DocumentoProcesoService, DocumentoAdjuntoService } from '../../../shared/services';

import { DocumentoProcesoModel } from '../../../shared/models/documento-proceso.model';
import { DocumentoTipoModel } from '../../../shared/models/documento-tipo.model';
import { DocumentoModel } from '../../../shared/models/documento.model';
import { MapaProcesoHijoModel } from '../../../shared/models/mapa_proceso_hijo.model';

import { DocsInformacionGeneralDocumentoComponent } from '../../components/docs-informacion-general-documento/docs-informacion-general-documento.component';
import { DocsDetalleAdjuntarDocumentoComponent } from '../../components/docs-detalle-adjuntar-documento/docs-detalle-adjuntar-documento.component';

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
                    ></docs-informacion-general-documento>
                    <docs-procesos-asociados [procesos]="procesos" 
                        [procesosDocumento]="documento?.procesos"
                        (onDeleteProceso)="onDeleteProceso($event)"
                        (onAsociarProceso)="onAsociarProceso($event)">
                    </docs-procesos-asociados>
                    <docs-detalle-editor-documento 
                        [text]="documento?.documento"
                        (onGuardarDocumento)="onGuardarDocumento($event)">
                    </docs-detalle-editor-documento>
                    <docs-detalle-adjuntar-documento #ddad
                        [adjuntos]="documento?.adjuntos"
                        (onAdjuntarDocumento)="onAdjuntarDocumento($event)"
                        (onDeleteAdjunto)="onDeleteAdjunto($event)">
                    </docs-detalle-adjuntar-documento>
                </div>
            </div>
        </div>
    `
})
export class DocsDocumentoDetalleComponent implements OnInit {

    documento: DocumentoModel;
    procesos: MapaProcesoHijoModel[];

    filteredRespAprobacion;
    filteredRespRevision;
    filteredRespElaboracion;
    filteredProcesos;

    @ViewChild('digd') digd: DocsInformacionGeneralDocumentoComponent;
    @ViewChild('ddad') ddad: DocsDetalleAdjuntarDocumentoComponent;

    constructor(
        private store: Store<fromRouteStore.State>,
        private docsDocumentoService: DocsDocumentoService,
        private documentoProcesoService: DocumentoProcesoService,
        private documentoAdjuntoService: DocumentoAdjuntoService,
        private messageService: MessageService
    ) {

    }

    ngOnInit() {
        this.showWaitDialog('Documento', 'Consultando documento, un momento por favor...')
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
            this.digd.inicializarForm(this.documento);
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

    getUserQuery(query) {
        return this.docsDocumentoService.getUsuariosQuery(query);
    }

    onSubmitUpdateDoc(documentoForm) {
        this.showWaitDialog('Documentos', 'Actualizando documento, por favor espere...');
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
        this.showWaitDialog('Documentos', 'Eliminando proceso, por favor espere...');
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
        this.showWaitDialog('Documentos', 'Asociando proceso, por favor espere...');
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
        this.showWaitDialog('Documentos', 'Editando documento, por favor espere...');
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
                this.documento = {
                    ...this.documento,
                    adjuntos: response
                };
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
}