import { Component, OnInit, Input, Output, EventEmitter,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuditoriaExternaModel } from '../../../shared/models/auditoria-externa.model';
import { environment } from "../../../environments/environment";
import { DetalleAuditoriaExternaComponent } from '../../containers';

@Component({
    selector: 'conclusion-auditoria-finalizada',
    template: `
    <div>
    <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
           
       
    <div class="ui-g">
                <div class="ui-g-12 ui-fluid">
                    <div>
                        <label>Fortalezas y/o debilidades</label>
                    </div>
                    <textarea disabled="form" formControlName="conclusion" [rows]="5" [cols]="30" pInputTextarea autoResize="autoResize" style="width: 100%"></textarea>
                </div>
            </div>
            <div class="ui-g">
                <div class="ui-g-12 ui-fluid">
                    <div>
                        <label>Fortalezas</label>
                    </div>

                    <textarea disabled="form" formControlName="fortaleza" [rows]="5" [cols]="30" pInputTextarea autoResize="autoResize" style="width: 100%">
                    </textarea>
                    </div>
            </div>
    </form>
</div>
    `
})
export class ConclusionAuditoriaFinalizadaComponent {

   
      //formulario
      display: boolean;
      form: FormGroup;
      //nombreModulo: string = environment.nombres_modulos_visuales.acciones_preventivas;
  
      //atributos
      dateFormatNormal: string = environment.dateFormatPrimeNg;
      fechaMinimaCalendario = new Date();
  
      @Output()
      onCreateProgramacion: EventEmitter<AuditoriaExternaModel> = new EventEmitter();
  
      @Input()
      auditoria: AuditoriaExternaModel;

      //listas modelos
    
      constructor(private fb: FormBuilder) {
          this.display = false;
      }
       
      ngOnInit() {
          this.createForm();
      }
  
      createForm() {
          this.form = this.fb.group({    
              conclusion: [this.auditoria.conclusion, Validators.required],
              fortaleza: [this.auditoria.fortaleza, Validators.required],
          });
          console.log("HIII",this.auditoria);

      }
  
    onSubmit() {
          if (this.form.valid) {
              const programacionReunion: AuditoriaExternaModel = {
                  conclusion: this.form.value.conclusion,
                  fortaleza: this.form.value.fortaleza
              };
              this.onCreateProgramacion.emit(programacionReunion);
          }
      }
  
      onHideCreateAccionPreventiva() {
          this.createForm();
      }
}