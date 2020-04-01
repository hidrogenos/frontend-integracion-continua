

import { Component, Output, EventEmitter, Input, ViewChild } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { EvaluacionProveedorModel } from "../../../shared/models/evaluacion-proveedor.model";
import { PlanoModel } from "../../../shared/models/plano.model";
import { FileUpload } from "primeng/primeng";
import { DocumentoExternoModel } from "../../../shared/models/documento-externo.model";


@Component({
    selector:'create-documento-externo-dialog-component',
    template:`

        <form [formGroup]="newDocumentoExterno" (ngSubmit)="onSubmit()" novalidate>
            <p-dialog 
                header="Nuevo Documento Externo" 
                [(visible)]="display" 
                [modal]="true" 
                [responsive]="true" 
                [width]="800" 
                [maximizable]="true" 
                (onHide)="onHideCreateNewDocumentoExterno()">
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
                            [disabled]="!newDocumentoExterno.valid">
                        </button>
                </p-footer>
            </p-dialog>
        </form>
    `
}) export class CreateDocumentoExternoDialogComponent{
    
     //atributos
     display:boolean;
     newDocumentoExterno: FormGroup;

     //events
     @Input() documentoExterno: DocumentoExternoModel;
     @Output() onCreateDocumentoExterno = new EventEmitter<any>();
     
     //properties
     constructor(
         private fb: FormBuilder,
     ) {}

     @ViewChild('fu') fu: FileUpload;

     
    ngOnInit(){ 
         this.createForm();
    }

    createForm() {
        this.newDocumentoExterno = this.fb.group({
            descripcion: ['', Validators.required]
        });
    }

    onHideCreateNewDocumentoExterno() {
        this.newDocumentoExterno.reset();
        this.fu.clear();
    }

    onSubmit() {
        if (this.newDocumentoExterno.valid) {
            const plano = {
                descripcion: this.newDocumentoExterno.value.descripcion,
            };
            const data = {
                plano,
                files: this.fu.files
            };
            this.onCreateDocumentoExterno.emit(data);
            this.display = false;
        }
    }

    uploadFiles(event) {
        const files: File[] = event.files;
        this.onCreateDocumentoExterno.emit(files);
    }
 
}


