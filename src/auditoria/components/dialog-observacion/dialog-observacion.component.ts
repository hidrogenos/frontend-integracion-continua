import { Component, OnInit, Input, Output, EventEmitter,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuditoriaExternaModel } from '../../../shared/models/auditoria-externa.model';
import { environment } from "../../../environments/environment";
import { ConclusionAuditoriaComponent } from "./../conclusion-auditoria/conclusion.component";

@Component({
    selector: 'dialog-observacion',
    template: `
    <div>
    <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
    <p-dialog header="Observaciones"  [(visible)]="display" [modal]="true" [responsive]="true" [width]="400"
            [maximizable]="true" [baseZIndex]="10000"  [contentStyle]="{'overflow':'visible'}">

            <div class="ui-g">
                <div class="ui-g-12">
                    
                    <div class="ui-g-12 ui-fluid">
                        <div>
                            <label>Observación</label>
                        </div>
                    <textarea [rows]="5" [cols]="30" pInputTextarea autoResize="autoResize" style="width: 100%" formControlName="observacion"></textarea>
                </div>                
            </div>
            </div>
            <p-footer>
                <div class="ui-g">
                    <div class="ui-g-12 text-aling-right">
                        <button type="button" pButton icon="pi pi-times" (click)="display=false" label="Cancelar" class="ui-button-danger"></button>
                        <button type="submit" pButton icon="pi pi-save" label="Pre Finalizar" class="ui-button-success" style="margin-left: 10px" [disabled]="!form.valid"></button>
                    </div>
                </div>
            </p-footer>
        </p-dialog>
  
    </form>
</div>
    `
})
export class DialogObservacionComponent {
      //formulario
      display: boolean = true;
      form: FormGroup;
      //nombreModulo: string = environment.nombres_modulos_visuales.acciones_preventivas;
  
      //atributos
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
      }
  
      createForm() {
          this.form = this.fb.group({    
              observacion: [null, Validators.required],          
          });
      }
  
      onSubmit() {
          if (this.form.valid) {
              const programacionReunion: AuditoriaExternaModel = {
                  observacion: this.form.value.observacion,  
               
              };
              this.onCreateProgramacion.emit(programacionReunion);
          }
      }
  
      onHideCreateAccionPreventiva() {
          this.createForm();
      }
}