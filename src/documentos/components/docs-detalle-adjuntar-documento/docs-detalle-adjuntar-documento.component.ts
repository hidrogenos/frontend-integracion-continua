
import { Component, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { FileUpload } from 'primeng/primeng';
import { DocumentoAdjuntoModel } from '../../../shared/models/documento-adjunto.model';

import { environment } from '../../../environments/environment';

@Component({
    selector: 'docs-detalle-adjuntar-documento',
    template: `
    <div>
        <div class="ui-g">
            <h2>Adjuntar documentos</h2>
        </div>
        <div class="ui-g">
            <div class="ui-g-12 text-aling-right">
                <p-fileUpload #fu
                    customUpload="true"
                    name="demo[]"
                    (uploadHandler)="uploadFiles($event)"
                    multiple="multiple"
                    cancelLabel="Limpiar"
                    chooseLabel="Seleccionar"
                    uploadLabel="Adjuntar">
                </p-fileUpload>
            </div>
        </div>
        <div class="ui-g" *ngIf="adjuntos && adjuntos.length > 0">
            <div class="ui-g-12">
                <p-table [value]="adjuntos">
                    <ng-template pTemplate="caption">
                        Documentos
                    </ng-template>
                    <ng-template pTemplate="header">
                        <tr>
                            <th>Nombre</th>
                            <th>Fecha de carga</th>
                            <th style="width: 15%;">Acciones</th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-adjunto>
                        <tr>
                            <td>{{adjunto.titulo}}</td>
                            <td>{{adjunto.fecha_carga | date: formatDateAngular}}</td>
                            <td style="text-align: center;">
                                <button pButton type="button" icon="fa fa-eye" style="margin-right: 10px;" 
                                class="ui-button-success" (click)="verDocumentoAdjunto(adjunto)"></button>
                                <button pButton type="button" icon="fa fa-trash" 
                                class="ui-button-danger" (click)="deleteDocumentoAdjunto(adjunto)"></button>
                            </td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </div>
    </div>
    `
})
export class DocsDetalleAdjuntarDocumentoComponent {

    @Input()
    adjuntos: DocumentoAdjuntoModel[];

    @Output()
    onAdjuntarDocumento = new EventEmitter<File[]>();

    @Output()
    onDeleteAdjunto = new EventEmitter<DocumentoAdjuntoModel>();

    @ViewChild('fu') fu: FileUpload;

    formatDateAngular = environment.dateFormatAngular;

    constructor() { }

    uploadFiles(event) {
        const files: File[] = event.files;
        this.onAdjuntarDocumento.emit(files);
    }

    deleteDocumentoAdjunto(adjunto) {
        adjunto.activo = false;
        this.onDeleteAdjunto.emit(adjunto);
    }
}