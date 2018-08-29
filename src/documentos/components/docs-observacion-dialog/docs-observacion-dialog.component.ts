import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'docs-observaciones-dialog',
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
                        <label>Observación:</label>
                    </div>
                    <textarea rows="5" cols="30" [(ngModel)]="descripcion" pInputTextarea></textarea>
                </div>
            </div>
            <p-footer>
                <button type="button" pButton icon="pi pi-times" (click)="onHideDialog()" label="Cancelar" class="ui-button-danger"></button>
                <button type="button" pButton icon="pi pi-save" label="Confirmar" 
                (click)="confirmDialog()" class="ui-button-primary" [disabled]="!descripcion"></button>
            </p-footer>
        </p-dialog>
    </div>
    `
})
export class DocsObservacionDialogComponent implements OnInit {

    display: boolean;
    descripcion: string;

    @Input()
    tipo;

    @Output()
    onConfirmDialog = new EventEmitter<string>();

    constructor(
        private fb: FormBuilder
    ) { }

    ngOnInit() {
    }

    onHideDialog() {
        this.display = false;
        this.descripcion = null;
    }

    confirmDialog() {
        this.onConfirmDialog.emit(this.descripcion);
        this.onHideDialog();
    }
}