import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuditoriaExternaModel } from '../../../shared/models/auditoria-externa.model';
import { environment } from "../../../environments/environment";

@Component({
    selector: 'programar-reunion-dialog',
    template: `
<div>
    <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
        <p-dialog header="Programar reunión auditoria" [(visible)]="display" [modal]="true" [responsive]="true" [width]="300"
            [maximizable]="true" [baseZIndex]="10000"  [contentStyle]="{'overflow':'visible'}">

            <div class="ui-g">
                <div class="ui-g-12">
                    <div>
                        <label>Fecha compromiso</label>
                    </div>
                    <p-calendar  dateFormat="yy/mm/dd"  [locale]="es" yearRange="2017:2022"  [yearNavigator]="true" showIcon="true"  formControlName="fecha_reunion" [dateFormat]="dateFormatNormal"></p-calendar>
                </div>
            </div>
            <p-footer>
                <div class="ui-g">
                    <div class="ui-g-12 text-aling-right">
                        <button type="button" pButton icon="pi pi-times" (click)="display=false" label="Cancelar" class="ui-button-danger"></button>
                        <button type="submit" pButton icon="pi pi-save" label="Programar" class="ui-button-success" style="margin-left: 10px" [disabled]="!form.valid"></button>
                    </div>
                </div>
            </p-footer>
        </p-dialog>
    </form>
</div>
    `
})
export class ProgramarReunionDialogComponent implements OnInit {
        //formulario
        display: boolean;
        form: FormGroup;
        es: any;
        dateFormatNormal: string = environment.dateFormatPrimeNg;
        fechaMinimaCalendario = new Date();
    
        @Output()
        onCreateProgramacion: EventEmitter<AuditoriaExternaModel> = new EventEmitter();
    
        //listas modelos
      
        constructor(private fb: FormBuilder) {
            this.display = false;
        }
    
        ngOnInit() {
            this.createForm();
            this.es = environment.dateProperties.calendarProperties;
        }
    
        createForm() {
            this.form = this.fb.group({              
                fecha_reunion: [null, Validators.required],
            });
        }
    
        onSubmit() {
            if (this.form.valid) {
                const programacionReunion: AuditoriaExternaModel = {
                  
                    fecha_reunion: (this.form.value.fecha_reunion as Date).valueOf()
                };
                this.onCreateProgramacion.emit(programacionReunion);
            }
        }
    
        onHideCreateAccionPreventiva() {
            this.createForm();
        }
    }
    