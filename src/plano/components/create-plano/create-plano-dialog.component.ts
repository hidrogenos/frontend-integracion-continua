

import { Component, Output, EventEmitter, Input, ViewChild } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { EvaluacionProveedorModel } from "../../../shared/models/evaluacion-proveedor.model";
import { PlanoModel } from "../../../shared/models/plano.model";
import { FileUpload } from "primeng/primeng";


@Component({
    selector:'create-plano-dialog-component',
    styleUrls: ['create-plano-dialog.component.scss'],
    template:`

        <form [formGroup]="newPlano" (ngSubmit)="onSubmit()" novalidate>
            <p-dialog 
                header="Nuevo Plano" 
                [(visible)]="display" 
                [modal]="true" 
                [responsive]="true" 
                [width]="800" 
                [maximizable]="true" 
                (onHide)="onHideCreateNewPlano()">
                <div class="ui-g">
                    <div class="ui-g-12 ui-fluid">
                        <div>
                            <label>Descripción</label>
                        </div>
                        <textarea style="width: 100%;" rows="4" pInputTextarea formControlName="descripcion"></textarea>
                    </div>
                </div>
                <div class="ui-g">
                    <div class="ui-g-12">
                        <div>
                            <label>Adjuntos</label>
                        </div>
                        <p-fileUpload #fu
                            customUpload="true"
                            name="demo[]"
                            (uploadHandler)="uploadFiles($event)"
                            [showUploadButton]="false"
                            cancelLabel="Limpiar"
                            chooseLabel="Seleccionar">
                        </p-fileUpload>
                    </div>
                </div>
                <p-footer>
                        <button style="margin-right:10px;" pButton 
                            type="button" 
                            label="Cancelar" 
                            icon="fa fa-close"
                            class="ui-button-danger"
                            (click)="display = false">
                        </button>
                        <button style="margin-right:10px;" pButton 
                            type="submit" 
                            icon="fa fa-check"
                            label="Crear" 
                            class="ui-button-primary"
                            [disabled]="!newPlano.valid">
                        </button>
                </p-footer>
            </p-dialog>
        </form>
    `
}) export class CreatePlanoDialogComponent{
    
     //atributos
     display:boolean;
     newPlano: FormGroup;

     //events
     @Output() create = new EventEmitter<EvaluacionProveedorModel>();
     @Input() plano: PlanoModel;
     @Output() onCreatePlano = new EventEmitter<any>();
     
     //properties
     constructor(
         private fb: FormBuilder,
     ) {}

     @ViewChild('fu') fu: FileUpload;

     
    ngOnInit(){ 
         this.createForm();
    }

    createForm() {
        this.newPlano = this.fb.group({
            descripcion: ['', Validators.required]
        });
    }

    onHideCreateNewPlano() {
        this.newPlano.reset();
        this.fu.clear();
    }

    onSubmit() {
        if (this.newPlano.valid) {
            const plano = {
                descripcion: this.newPlano.value.descripcion,
            };
            const data = {
                plano,
                files: this.fu.files
            };
            this.onCreatePlano.emit(data);
            this.display = false;
        }
    }

    uploadFiles(event) {
        const files: File[] = event.files;
        this.onCreatePlano.emit(files);
    }
 
}


