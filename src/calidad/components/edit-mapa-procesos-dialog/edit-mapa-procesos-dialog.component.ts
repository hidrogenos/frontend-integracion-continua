import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CalidadMapaProcesoModel } from '../../../shared/models/calidad-mapa-proceso.model';

@Component({
    selector: 'edit-mapa-procesos-dialog',
    styleUrls: ['edit-mapa-procesos-dialog.component.scss'],
    template: `
        <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
            <p-dialog 
                header="Edición entrada y salida" 
                [(visible)]="display" 
                [modal]="true" 
                [responsive]="true" 
                [width]="800" 
                [maximizable]="true" 
                (onHide)="onHideEditMapaProcesos()">
                <div class="ui-g">
                    <div class="ui-g-12 ui-fluid">
                        <div>
                            <label>Entrada</label>
                        </div>
                        <input type="text" pInputText formControlName="entrada" />
                    </div>
                </div>
                <div class="ui-g">
                    <div class="ui-g-12 ui-fluid">
                        <div>
                            <label>Salida</label>
                        </div>
                        <input type="text" pInputText formControlName="salida" />
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
export class EditMapaProcesosDialogComponent implements OnInit {
    //atributos
    display: boolean;
    form: FormGroup;

    //events
    @Output()
    onUpdateMapaProcesos = new EventEmitter<{
        entrada: string;
        salida: string;
    }>();

    //properties
    @Input()
    mapa: CalidadMapaProcesoModel;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            entrada: ['', Validators.required],
            salida: ['', Validators.required]
        });
    }

    onHideEditMapaProcesos() {
        this.form.reset();
    }

    onSubmit() {
        if (this.form.valid) {
            const data = this.form.value;
            this.onUpdateMapaProcesos.emit(data);
            this.display = false;
        }
    }

    showDialog() {
        this.display = true;
        this.form = this.fb.group({
            entrada: [this.mapa.entrada, Validators.required],
            salida: [this.mapa.salida, Validators.required]
        });
    }
}
