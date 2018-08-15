import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MapaProcesoHijoModel } from '../../../shared/models/mapa_proceso_hijo.model';

@Component({
    selector: 'create-proceso-dialog',
    styleUrls: ['create-proceso-dialog.component.scss'],
    template: `
        <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
            <p-dialog 
                header="Crear nuevo proceso" 
                [(visible)]="display" 
                [modal]="true" 
                [responsive]="true" 
                [width]="800" 
                [maximizable]="true" 
                (onHide)="onHideCreateProcesos()">
                <div class="ui-g">
                    <div class="ui-g-12 ui-fluid">
                        <div style="margin-bottom: 5px;">
                            <label>Tipo de proceso</label>
                        </div>
                        <p-radioButton   
                            name="tipo-proceso" 
                            label="Proceso princial" 
                            value="1" 
                            formControlName="tipo_proceso"
                            (onClick)="onSelectProcesoPrincipal()">
                        </p-radioButton>
                        <p-radioButton  
                            [style]="{'margin-left': '10px'}" 
                            name="tipo-proceso" 
                            label="Sub proceso" 
                            value="2" 
                            formControlName="tipo_proceso"
                            (onClick)="onSelectSubProceso()">
                        </p-radioButton>
                    </div>
                </div>
                <div class="ui-g" *ngIf="form?.value?.tipo_proceso == 2">
                    <div class="ui-g-12 ui-fluid">
                        <div>
                            <label>Proceso pricipal</label>
                        </div>
                        <p-dropdown 
                            [options]="procesos"  
                            optionLabel="proceso" 
                            formControlName="padre"
                            placeholder="Seleccione..."
                            appendTo="body"
                            filter="true">
                        </p-dropdown>
                    </div>
                </div>
                <div class="ui-g">
                    <div class="ui-g-12 ui-fluid">
                        <div>
                            <label>Proceso</label>
                        </div>
                        <input type="text" pInputText formControlName="proceso" />
                    </div>
                </div>
                <p-footer>
                        <button style="margin-right:10px;" pButton 
                            type="button" 
                            label="Cancelar" 
                            class="ui-button-danger"
                            (click)="display = false">
                        </button>
                        <button style="margin-right:10px;" pButton 
                            type="submit" 
                            label="Actualizar" 
                            class="ui-button-primary"
                            [disabled]="!form.valid">
                        </button>
                </p-footer>
            </p-dialog>
        </form>
    `
})
export class CreateProcesoDialogComponent implements OnInit {
    //atributos
    display: boolean;
    form: FormGroup;

    //properties
    @Input()
    procesos: MapaProcesoHijoModel[];

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            tipo_proceso: [1, Validators.required],
            proceso: [null, Validators.required]
        });
    }

    onHideCreateProcesos() {
        this.form.reset();
    }

    onSelectProcesoPrincipal() {
        this.form = this.fb.group({
            tipo_proceso: [1, Validators.required],
            proceso: [null, Validators.required]
        });
    }

    onSelectSubProceso() {
        this.form = this.fb.group({
            tipo_proceso: [2, Validators.required],
            padre: ['', Validators.required],
            proceso: [null, Validators.required]
        });
    }

    onSubmit() {}
}
