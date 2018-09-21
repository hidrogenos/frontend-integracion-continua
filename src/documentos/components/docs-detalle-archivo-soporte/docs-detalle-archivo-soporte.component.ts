
import { Component, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { FileUpload } from 'primeng/primeng';

import { environment } from '../../../environments/environment';
import { DocumentoArchivoSoporteModel } from '../../../shared/models/documento-archivo-soporte.model';

@Component({
    selector: 'docs-detalle-archivo-soporte',
    template: `
    <div *ngIf="permisoVerArchivosSoporte">
        <div class="ui-g">
            <h2>{{ titulo }}</h2>
        </div>
        <div class="ui-g" *ngIf="permisoCrearArchivoSoporte">
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
        <div class="ui-g">
            <div class="ui-g-12">
                <p-table [value]="archivosSoporte" [paginator]="true" [rows]="10">
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
                    <ng-template pTemplate="body" let-archivosSoporte>
                        <tr>
                            <td>{{archivosSoporte.titulo}}</td>
                            <td>{{archivosSoporte.fecha_carga | date: formatDateAngular}}</td>
                            <td style="text-align: center;">
                                <button pButton type="button" icon="fa fa-eye" style="margin-right: 10px;" 
                                *ngIf="permisoConsultarArchivoSoporte"
                                class="ui-button-blue"
                                (click)="onVerAdjunto.emit(archivosSoporte)"></button>
                                <button style="margin-right:10px;" pButton type="button"
                                *ngIf="permisoDescargarArchivoSoporte" 
                                icon="fa fa-download" 
                                (click)="onDownloadArchivoSoporte.emit(archivosSoporte)"class="ui-button-success"></button>
                                <button pButton type="button" icon="fa fa-trash" 
                                *ngIf="permisoEliminarArchivoSoporte"
                                class="ui-button-danger"
                                (click)="onDeleteArchivoSoporte.emit(archivosSoporte)"></button>

                            </td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </div>
    </div>
    `
})
export class DocsDetalleArchivoSoporteComponent {

    @Input()
    titulo: string;
    @Input()
    permisoCrearArchivoSoporte: boolean;
    @Input()
    permisoConsultarArchivoSoporte: boolean;
    @Input()
    permisoDescargarArchivoSoporte: boolean;
    @Input()
    permisoEliminarArchivoSoporte: boolean;
    @Input()
    permisoVerArchivosSoporte: boolean;

    @Input()
    archivosSoporte: DocumentoArchivoSoporteModel[];

    @Output()
    onCreateArchivoSoporte = new EventEmitter<File[]>();

    @Output()
    onDeleteArchivoSoporte = new EventEmitter<DocumentoArchivoSoporteModel>();

    @Output()
    onDownloadArchivoSoporte = new EventEmitter<DocumentoArchivoSoporteModel>();

    @Output()
    onVerAdjunto = new EventEmitter<File[]>();

    @ViewChild('fu') fu: FileUpload;

    formatDateAngular = environment.dateFormatAngular;

    constructor() { }

    uploadFiles(event) {
        const files: File[] = event.files;
        this.onCreateArchivoSoporte.emit(files);
    }
    
}