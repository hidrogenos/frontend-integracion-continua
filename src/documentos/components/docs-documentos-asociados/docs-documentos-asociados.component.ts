import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DocumentoTipoModel } from '../../../shared/models/documento-tipo.model';
import { DocumentoModel } from '../../../shared/models/documento.model';
import { DocumentoAsociadoModel } from '../../../shared/models/documento-asociado.model';

@Component({
    selector: 'docs-documentos-asociados',
    template: `
    <div>
    <br/>
        <div class="ui-g">
            <h2>Documentos asociados</h2>
        </div>
        <div class="ui-g">
            <div class="ui-g-3 ui-fluid">
                <p-dropdown 
                    [options]="tiposDocumento"
                    [(ngModel)]="tipoSelected"
                    optionLabel="nombre"
                    [autoWidth]="false"
                    filter="true"
                    placeholder="Seleccione..."
                    [disabled]="!puedeEditar">
                </p-dropdown>
            </div>
            <div class="ui-g-5 ui-fluid">
                <p-autoComplete [forceSelection]="true" *ngIf="tipoSelected"
                    [(ngModel)]="documentoSelected"
                    [suggestions]="filteredDocumento" 
                    (completeMethod)="filterDocumento($event)"
                    [minLength]="1" field="titulo" [dropdown]="true">
                        <ng-template let-doc pTemplate="item">
                            {{doc.codigo}} {{doc.titulo}}
                        </ng-template>
                </p-autoComplete>
            </div>
            <div class="ui-g-3 text-aling-center" *ngIf="puedeEditar">
                <button pButton type="button" label="Relacionar documento" (click)="relacionarDocumento()"
                [disabled]="!tipoSelected || !documentoSelected"></button>
            </div>
        </div>
        <div class="ui-g">
            <div class="ui-g-12">
                <p-table [value]="documentosAsociados" [paginator]="true" [rows]="10">
                    <ng-template pTemplate="header">
                        <tr>
                            <th style="width: 20%;">Código</th>
                            <th>Título</th>
                            <th style="width: 10%;"></th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-documento>
                        <tr>
                            <td>{{documento.codigo}}</td>
                            <td>{{documento.titulo}}</td>
                            <td style="text-align: center;">
                                <button pButton type="button" icon="pi pi-trash" *ngIf="puedeEditar"
                                class="ui-button-danger" (click)="deleteDocumentoAsociado(documento)"></button>
                            </td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </div>
    </div>
    `
})
export class DocsDocumentosAsociadosComponent {

    @Input()
    documentosAsociados: DocumentoAsociadoModel[];

    @Input()
    tiposDocumento: DocumentoTipoModel[];
    @Input()
    filteredDocumento: DocumentoModel[];
    
    @Input()
    puedeEditar: boolean;

    tipoSelected: DocumentoTipoModel;
    documentoSelected: DocumentoModel;

    @Output()
    onFilterDocumento = new EventEmitter<any>();

    @Output()
    onRelacionarDocumento = new EventEmitter<DocumentoModel>();
    @Output()
    onDeleteDocumento = new EventEmitter<DocumentoModel>();

    constructor() { }

    filterDocumento(event) {
        let filter = {
            query: event.query,
            id_tipo_documento: this.tipoSelected.id,
            id_documento: null
        }
        this.onFilterDocumento.emit(filter);
    }

    relacionarDocumento() {
        this.onRelacionarDocumento.emit(this.documentoSelected);
    }

    deleteDocumentoAsociado(documentoAsociado) {
        this.onDeleteDocumento.emit(documentoAsociado);
    }
}