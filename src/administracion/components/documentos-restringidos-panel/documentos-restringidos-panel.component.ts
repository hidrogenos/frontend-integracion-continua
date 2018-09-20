import { Component, EventEmitter, Output, Input, OnInit } from "@angular/core";
import { DocumentoRestringidoModel } from "../../../shared/models/documento-restringido.model";
import { DocumentoModel } from "../../../shared/models/documento.model";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
    selector: 'documentos-restringidos-panel',
    template: `
        <div>
            <form [formGroup]="form">
                    <div class="ui-g ui-fluid">
                        <div class="ui-g-6">
                            <div>
                                <label>Código documento</label>
                            </div>
                            <input formControlName="codigo" pInputText placeholder="Buscar documento por código" />
                        </div>
                        <div class="ui-g-2">
                            <button type="button" pButton class="ui-button-primary" icon="pi pi-search" [disabled]="disabled" (click)="searchDocumentosByCodigo()"></button>
                        </div>
                    </div>
                    <div class="ui-g ui-fluid">
                        <div class="ui-g-12">
                            <p-pickList [source]="documentosPorRelacionar" [target]="documentosRestringidos" [disabled]="disabled"
                                (onMoveToTarget)="relateDocumentosRestringidos($event)">
                                <ng-template let-documento pTemplate="item">
                                        <span>{{documento.codigo}} | {{documento.titulo}}</span>
                                </ng-template>
                            </p-pickList>
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
    documentosRestringidosFiltered: DocumentoRestringidoModel[];

    @Input()
    documentosRestringidos: DocumentoRestringidoModel[] = [];

    @Input()
    disabled: boolean;

    @Output()
    onSearchDocumentosByCodigo = new EventEmitter();

    @Output()
    onRelateDocumentosRestringidos = new EventEmitter();

    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            codigo: ['']
        });
        if (this.disabled) {
            this.form.disable();
        }
    }

    enableComponent() {
        this.form.enable();
    }

    searchDocumentosByCodigo() {
        this.onSearchDocumentosByCodigo.emit({ codigo: this.form.value.codigo });
    }

    relateDocumentosRestringidos(event) {
        const documentosPorRelacionar: DocumentoModel[] = event.items;
        this.onRelateDocumentosRestringidos.emit(documentosPorRelacionar);
    }
}