import { Component, EventEmitter, Output, Input, OnInit } from "@angular/core";
import { DocumentoRestringidoModel } from "../../../shared/models/documento-restringido.model";
import { DocumentoModel } from "../../../shared/models/documento.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'documentos-restringidos-panel',
    template: `
        <div>
            <form [formGroup]="form">
                    <div class="ui-g ui-fluid" *ngIf="permisoRestringirDocumento">
                        <div class="ui-g-10">
                            <div>
                                <label>Código documento</label>
                            </div>
                            <input formControlName="codigo" pInputText placeholder="Buscar documento por código" />
                        </div>
                        <div class="ui-g-2" style="margin-top: 15px">
                            <button type="button" pButton class="ui-button-primary" icon="pi pi-search" [disabled]="disabled" (click)="searchDocumentosByCodigo()"></button>
                        </div>
                    </div>
                    <div class="ui-g ui-fluid" *ngIf="permisoRestringirDocumento">
                        <div class="ui-g-10" style="margin:auto">
                            <p-multiSelect [options]="documentosPorRelacionar" optionLabel="codigo" defaultLabel="Seleccione los documentos a restringir..." formControlName="documentos">
                                <ng-template let-item  pTemplate="selectedItem">
                                </ng-template>
                                <ng-template let-item let-i="index" pTemplate="item">
                                    <span> {{item.value.codigo}} | {{ item.value.titulo }}</span>
                                </ng-template>
                            </p-multiSelect>
                        </div>
                        <div class="ui-g-2">
                            <button type="button" class="ui-button-primary" pButton label="Restringir documentos" [disabled]="!form.valid" (click)="relateDocumentosRestringidos()"></button>
                        </div>
                    </div>
                    <div class="ui-g ui-fluid">
                        <div class="ui-g-12">
                                <p-table #dt
                                [value]="documentosRestringidos"
                                [paginator]="true"
                                [rows]="10">          
                
                                <ng-template pTemplate="header">
                                            <tr>
                                                <th>
                                                    Código
                                                </th>
                                                <th>
                                                    Título
                                                </th>
                                                <th style="width: 30%;" rowspan="2">
                                                    Acciones
                                                </th>
                                            </tr>
                                            <tr>
                                                <th class="ui-fluid">
                                                    <input pInputText type="text" (input)="dt.filter($event.target.value, 'documento.codigo', 'contains')">
                                                </th>
                                                <th class="ui-fluid">
                                                    <input pInputText type="text" (input)="dt.filter($event.target.value, 'documento.titulo', 'contains')">
                                                </th>
                                            </tr>
                                        </ng-template>
                                        <ng-template pTemplate="body" let-rowData  let-documentoRestringido>
                                            <tr>
                                                <td> {{ documentoRestringido.documento.codigo }} </td>
                                                <td> {{ documentoRestringido.documento.titulo }} </td>
                                                <td style="text-align: center;">
                                                    <button *ngIf="permisoEliminarDocumentoRestringido" style="margin-right:10px;" pButton 
                                                        type="button"
                                                        icon="pi pi-trash"
                                                        class="ui-button-danger"
                                                        (click)="onDeleteDocumentoRestringido.emit(documentoRestringido)">
                                                    </button>
                                                </td>
                                            </tr>
                                        </ng-template>
                                </p-table>
                        </div>
                    </div>
            </form>
        </div>
    `,
    styleUrls: ['documentos-restringidos-panel.component.scss']
})
export class DocumentosRestringidosPanelComponent implements OnInit {

    //properties
    @Input()
    documentosPorRelacionar: DocumentoModel[] = [];

    @Input()
    documentosRestringidos: DocumentoRestringidoModel[] = [];

    @Input()
    disabled: boolean;

    //eventos
    @Output()
    onSearchDocumentosByCodigo = new EventEmitter();

    @Output()
    onRelateDocumentosRestringidos = new EventEmitter();

    @Output()
    onDeleteDocumentoRestringido = new EventEmitter();

    //permits

    @Input()
    permisoEliminarDocumentoRestringido;

    @Input()
    permisoRestringirDocumento;

    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            codigo: [''],
            documentos: [ null , Validators.required ]
        });
        if (this.disabled) {
            this.form.disable();
        }
    }

    cleanForm(){
        this.documentosPorRelacionar = [];
        this.form.setValue({
            codigo: '',
            documentos: null
        })
    }

    enableComponent(habilitado: boolean) {
        if(habilitado)
        {
            this.form.enable();
        }else {
            this.form.disable();
            this.cleanForm();
        }
    }

    searchDocumentosByCodigo() {
        this.onSearchDocumentosByCodigo.emit({ codigo: this.form.value.codigo });
    }

    relateDocumentosRestringidos() {
        const documentosPorRelacionar: DocumentoModel[] = this.form.value.documentos.filter(documentoActual=>{
            const documentoBuscado = this.documentosRestringidos.find(documentoRestringido => documentoRestringido.documento.id == documentoActual.id);
            if(!documentoBuscado){
                return documentoActual;
            }
        });
        this.onRelateDocumentosRestringidos.emit(documentosPorRelacionar);
        this.cleanForm();
    }
}