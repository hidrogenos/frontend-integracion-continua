

import { Component, Output, EventEmitter, Input, ViewChild } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { RegistroModel } from "../../shared/models/registro.model";
import { FileUpload } from "primeng/primeng";


@Component({
    selector:'create-registro-dialog-component',
    template:`

        <form [formGroup]="newRegistro" (ngSubmit)="onSubmit()" novalidate>
            <p-dialog 
                header="Nuevo Registro" 
                [(visible)]="display" 
                [modal]="true" 
                [responsive]="true" 
                [width]="800" 
                [maximizable]="true" 
                (onHide)="onHideCreateNewRegistro()">
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
                            [disabled]="!newRegistro.valid">
                        </button>
                </p-footer>
            </p-dialog>
        </form>
    `
}) export class CreateRegistroDialogComponent{
    
     //atributos
     display:boolean;
     newRegistro: FormGroup;

     //events
     @Input() registro: RegistroModel;
     @Output() onCreateRegistro = new EventEmitter<any>();
     
     //properties
     constructor(
         private fb: FormBuilder,
     ) {}

     @ViewChild('fu') fu: FileUpload;

     
    ngOnInit(){ 
         this.createForm();
    }

    createForm() {
        this.newRegistro = this.fb.group({
            descripcion: ['', Validators.required]
        });
    }

    onHideCreateNewRegistro() {
        this.newRegistro.reset();
        this.fu.clear();
    }

    onSubmit() {
        if (this.newRegistro.valid) {
            const registro = {
                descripcion: this.newRegistro.value.descripcion,
            };
            const data = {
                registro,
                files: this.fu.files
            };
            this.onCreateRegistro.emit(data);
            this.display = false;
        }
    }

    uploadFiles(event) {
        const files: File[] = event.files;
        this.onCreateRegistro.emit(files);
    }
 
}


