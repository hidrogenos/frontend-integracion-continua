import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { environment } from '../../../environments/environment';
import { FileUpload, SelectItem } from 'primeng/primeng';
import { DocumentoModel } from '../../../shared/models/documento.model';

@Component({
    selector: 'docs-eliminado-dialog',
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
export class DocsEliminadosDialogComponent {

    display: boolean;
    observacion: string;

    @Input()
    tipo;

    @Input()
    documentoEliminado: DocumentoModel[];

    @Output()
    onConfirmDialog = new EventEmitter<any>();

    constructor(
        private fb: FormBuilder
    ) {}

    onHideDialog() {
        this.observacion = null;
        this.display = false;
    }

    confirmDialog() {
        let data = {
            observacion: this.observacion
        }
        this.onConfirmDialog.emit(data);
        this.onHideDialog();
    }

    deshabilitarConfirm() {
        if (!this.observacion) {
            return true;
        } else {
            return false;
        }
    }
}