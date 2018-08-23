import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'docs-detalle-editor-documento',
    template: `
    <div>
        <div class="ui-g">
            <h2>Documento</h2>
        </div>
        <div class="ui-g">
            <div class="ui-g-12">
                <p-editor [(ngModel)]="text" [style]="{'height':'220px'}"></p-editor>
            </div>
            <div class="ui-g-12 text-aling-right">
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
    @Output()
    onGuardarDocumento = new EventEmitter<string>();

    constructor() { }

    guardarDocumento() {
        this.onGuardarDocumento.emit(this.text);
    }
}