import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { environment } from '../../../environments/environment';
import { FileUpload } from 'primeng/primeng';

@Component({
    selector: 'docs-puesta-marcha-dialog',
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
                        <label>Fecha inicio:</label>
                    </div>
                    <p-calendar showIcon="true" formControlName="fecha_inicio" [dateFormat]="dateFormatCalendar"></p-calendar>
                </div>
                <div class="ui-g-6 ui-fluid">
                    <div>
                        <label>Fecha fin:</label>
                    </div>
                    <p-calendar showIcon="true" formControlName="fecha_fin" [dateFormat]="dateFormatCalendar"></p-calendar>
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
            <div class="ui-g">
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
            <div class="ui-g" *ngIf="adjuntos && adjuntos.length > 0">
                <div class="ui-g-12">
                    <p-table [value]="adjuntos">
                        <ng-template pTemplate="caption">
                            Adjuntar documentación
                        </ng-template>
                        <ng-template pTemplate="header">
                            <tr>
                                <th>Nombre</th>
                                <th>Fecha de carga</th>
                                <th style="width: 15%;">Acciones</th>
                            </tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-adjunto>
                            <tr>
                                <td>{{adjunto.titulo}}</td>
                                <td>{{adjunto.fecha_carga | date: formatDateAngular}}</td>
                                <td style="text-align: center;">
                                    <button pButton type="button" icon="fa fa-trash" 
                                    class="ui-button-danger"
                                    (click)="deleteDocumentoAdjunto(adjunto)"></button>
                                </td>
                            </tr>
                        </ng-template>
                    </p-table>
                </div>
            </div>
            <p-footer>
                <button type="button" pButton icon="pi pi-times" (click)="onHideDialog()" (click)="form.reset()" label="Cancelar" class="ui-button-danger"></button>
                <button type="button" pButton icon="pi pi-save" label="Vigente" 
                (click)="confirmDialog()" class="ui-button-primary" [disabled]="form.invalid"></button>
            </p-footer>
        </p-dialog>
    </form>
    </div>
    `
})
export class DocsPuestaMarchaDialogComponent implements OnInit {

    display: boolean;
    form: FormGroup;
    dateFormatCalendar: string = environment.dateFormatPrimeNg;
    @ViewChild('fu') fu: FileUpload;

    @Input()
    tipo;

    @Input()
    adjuntos: any[];

    @Output()
    onConfirmDialog = new EventEmitter<any>();

    @Output()
    onAdjuntarDocumento = new EventEmitter<File[]>();

    @Output()
    onDeleteAdjunto = new EventEmitter<any>();

    constructor(
        private fb: FormBuilder
    ) {
        let auxFehcaFin = new Date();
        auxFehcaFin.setUTCFullYear(auxFehcaFin.getFullYear() + 5);
        this.form = this.fb.group({
            fecha_inicio: [new Date(), Validators.required],
            fecha_fin: [auxFehcaFin, Validators.required],
            observacion: [null, Validators.required],
        })
    }

    ngOnInit() {
    }

    uploadFiles(event) {
        const files: File[] = event.files;
        this.fu.clear();
        this.onAdjuntarDocumento.emit(files);
    }

    deleteDocumentoAdjunto(adjunto) {
        adjunto.activo = false;
        this.onDeleteAdjunto.emit(adjunto);
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