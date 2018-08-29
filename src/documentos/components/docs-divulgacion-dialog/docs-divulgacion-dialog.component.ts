import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { environment } from '../../../environments/environment';
import { FileUpload } from 'primeng/primeng';

@Component({
    selector: 'docs-divulgacion-dialog',
    template: `
    <div>
    <form [formGroup]="form">
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
                        <label>Fecha de divulgación:</label>
                    </div>
                    <p-calendar showIcon="true" formControlName="fecha_divulgacion" 
                    appendTo="body"
                    [dateFormat]="dateFormatCalendar"></p-calendar>
                </div>
            </div>
            <div class="ui-g">
                <div class="ui-g-12 ui-fluid">
                    <div>
                        <label>Observación:</label>
                    </div>
                    <textarea rows="5" cols="30" formControlName="observacion" pInputTextarea></textarea>
                </div>
            </div>
            <p-footer>
                <button type="button" pButton icon="pi pi-times" (click)="onHideDialog()" label="Cancelar" class="ui-button-danger"></button>
                <button type="button" pButton icon="pi pi-save" label="Confirmar" 
                (click)="confirmDialog()" class="ui-button-primary" [disabled]="form.invalid"></button>
            </p-footer>
        </p-dialog>
    </form>
    </div>
    `
})
export class DocsDivulgacionDialogComponent {

    display: boolean;
    form: FormGroup;
    dateFormatCalendar: string = environment.dateFormatPrimeNg;

    @Input()
    tipo;


    @Output()
    onConfirmDialog = new EventEmitter<any>();

    constructor(
        private fb: FormBuilder
    ) {
        this.form = this.fb.group({
            fecha_divulgacion: [null, Validators.required],
            observacion: [null, Validators.required],
        })
    }

    onHideDialog() {
        this.form.reset();
        this.display = false;
    }

    confirmDialog() {
        this.onConfirmDialog.emit(this.form.value);
        this.onHideDialog();
    }
}