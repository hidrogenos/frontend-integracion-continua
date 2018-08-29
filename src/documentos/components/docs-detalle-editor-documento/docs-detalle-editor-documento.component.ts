import { Component, Output, EventEmitter, Input, AfterViewChecked, ViewChild } from '@angular/core';
import { Editor } from 'primeng/editor';

@Component({
    selector: 'docs-detalle-editor-documento',
    template: `
    <div>
        <div class="ui-g">
            <h2>Documento</h2>
        </div>
        <div class="ui-g">
            <div class="ui-g-12">
                <p-editor [(ngModel)]="text" [style]="{'height':'220px'}" [readonly]="!puedeEditar"></p-editor>
            </div>
            <div class="ui-g-12 text-aling-right" *ngIf="puedeEditar">
                <button pButton type="button" label="Editar documento" (click)="guardarDocumento()"
                [disabled]="!text"></button>
            </div>
        </div>
    </div>
    `
})
export class DocsDetalleEditorDocumentoComponent {

    @Input()
    text: string;

    @Input()
    puedeEditar: boolean;

    @Output()
    onGuardarDocumento = new EventEmitter<string>();

    constructor() { }

    guardarDocumento() {
        this.onGuardarDocumento.emit(this.text);
    }
}