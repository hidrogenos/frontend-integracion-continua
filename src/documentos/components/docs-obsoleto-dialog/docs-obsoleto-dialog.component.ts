import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { environment } from '../../../environments/environment';
import { FileUpload, SelectItem } from 'primeng/primeng';
import { DocumentoModel } from '../../../shared/models/documento.model';

@Component({
    selector: 'docs-obsoleto-dialog',
    template: `
    <div>
        <p-dialog 
            header="{{ tipo }}" 
            [(visible)]="display" 
            [modal]="true" 
            [responsive]="true" 
            [width]="800" 
            [maximizable]="true" 
            (onHide)="onHideDialog()">
            <div class="ui-g">
                <div class="ui-g-6 ui-fluid">
                    <div>
                        <label>Seleccione la clase de reemplazo:</label>
                    </div>
                    <p-dropdown [options]="clases" [(ngModel)]="selectedClase"></p-dropdown>
                </div>
            </div>
            <div class="ui-g" *ngIf="selectedClase == 2">
                <div class="ui-g-12 ui-fluid">
                    <div>
                        <label>Seleccione el documento que va a hacer el nuevo reemplazo</label>
                    </div>
                    <p-autoComplete [forceSelection]="true"
                        [(ngModel)]="documentoSelected"
                        [suggestions]="documentosObsoleto" 
                        (completeMethod)="filterDocumento($event)"
                        [minLength]="1" field="titulo" [dropdown]="true">
                            <ng-template let-doc pTemplate="item">
                                {{doc.codigo}} {{doc.titulo}}
                            </ng-template>
                    </p-autoComplete>
                </div>
            </div>
            <div class="ui-g">
                <div class="ui-g-12 ui-fluid">
                    <div>
                        <label>Observación</label>
                    </div>
                    <textarea rows="5" cols="30" [(ngModel)]="observacion" pInputTextarea></textarea>
                </div>
            </div>
            <p-footer>
                <button type="button" pButton icon="pi pi-times" (click)="onHideDialog()" label="Cancelar" class="ui-button-danger"></button>
                <button type="button" pButton icon="pi pi-save" label="Confirmar" 
                (click)="confirmDialog()" class="ui-button-primary" [disabled]="deshabilitarConfirm()"></button>
            </p-footer>
        </p-dialog>
    </div>
    `
})
export class DocsObsoletoDialogComponent {

    display: boolean;
    clases: SelectItem[] = [
        { label: 'Réplica', value: 1 },
        { label: 'Reemplazar por', value: 2 }
    ];
    selectedClase: number = 1;
    documentoSelected: DocumentoModel;
    observacion: string;

    @Input()
    tipo;

    @Input()
    documentosObsoleto: DocumentoModel[];


    @Output()
    onConfirmDialog = new EventEmitter<any>();

    @Output()
    onFilterDocumentosObsoletos = new EventEmitter<any>();

    constructor(
        private fb: FormBuilder
    ) {
    }

    onHideDialog() {
        this.documentoSelected = null;
        this.observacion = null;
        this.display = false;
    }

    confirmDialog() {
        let data = {
            clase: this.selectedClase,
            id_documento_reemplazo: this.documentoSelected ? this.documentoSelected.id : null,
            observacion: this.observacion
        }
        this.onConfirmDialog.emit(data);
        this.onHideDialog();
    }

    filterDocumento(event) {
        this.onFilterDocumentosObsoletos.emit(event.query);
    }

    deshabilitarConfirm() {
        if (!this.observacion || (this.selectedClase == 2 && !this.documentoSelected)) {
            return true;
        } else {
            return false;
        }
    }
}