import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CalidadModel } from '../../../shared/models/calidad.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'titulo',
    styleUrls: ['titulo.component.scss'],
    template: `
        <div class="ui-g">
            <div class="ui-g-12">
                <div class="card card-w-title">
                    <div style="text-align: right; color: #337ab7;">
                        <i 
                            *ngIf="!edit"
                            style="cursor: pointer;" 
                            class="fa fa-w fa-pencil" 
                            aria-hidden="true"
                            (click)="toggleEdit()">
                        </i>
                        <i 
                            *ngIf="edit"
                            style="cursor: pointer;" 
                            class="fa fa-check" 
                            aria-hidden="true"
                            (click)="toggleEdit()">
                        </i>
                    </div>
                    <div>
                    <div class="ui-g">
                        <div *ngIf="!edit" class="ui-g-12" style="text-align: center;">
                            <h1>{{ loadedCalidad.empresa_nombre }}</h1>
                        </div>
                        <div *ngIf="edit" class="ui-g-12" style="text-align: center;">
                            <form [formGroup]="formEmpresaNombre" (ngSubmit)="onSubmitEmpresaNombre()" novalidate>   
                                <div class="ui-g ui-fluid">
                                    <div class="ui-g-6 ui-g-offset-3">
                                        <div>
                                            <label>Nombre de la empresa</label>
                                        </div>
                                        <input type="text"  pInputText formControlName="empresa_nombre" />
                                    </div>
                                    <div class="ui-g-6 ui-g-offset-3 text-aling-right">
                                        <button style="margin-right:10px;" pButton 
                                            type="submit" 
                                            label="Actualizar" 
                                            class="ui-button-primary"
                                            [disabled]="!formEmpresaNombre.valid">
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="ui-g">
                        <div *ngIf="!edit" class="ui-g-12" style="text-align: center;">
                            <img [src]="blobLogo" />
                        </div>
                        <div *ngIf="edit" class="ui-g-12" style="text-align: center;">
                            <div class="ui-g ui-fluid">
                                <div class="ui-g-6 ui-g-offset-3">
                                    <div>
                                        <label>Logo empresa</label>
                                    </div>
                                    <p-fileUpload 
                                        mode="basic" 
                                        name="demo[]"  
                                        accept="image/*"
                                        customUpload="true"
                                        (uploadHandler)="uploadLogo($event)"
                                        chooseLabel="Seleccione">
                                    </p-fileUpload>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    `
})
export class TituloComponent implements OnInit {
    //atributos
    edit: boolean = false;
    formEmpresaNombre: FormGroup;

    //events
    @Output()
    onUpdateEmpresaNombre = new EventEmitter<string>();
    @Output()
    onUpdateEmpresaLogo = new EventEmitter<File>();

    //properties
    @Input()
    blobLogo: any;
    @Input()
    loadedCalidad: CalidadModel;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.createFormNombreEmpresa();
    }

    createFormNombreEmpresa() {
        this.formEmpresaNombre = this.fb.group({
            empresa_nombre: ['', Validators.required]
        });
    }

    onSubmitEmpresaNombre() {
        if (this.formEmpresaNombre.valid) {
            this.onUpdateEmpresaNombre.emit(
                this.formEmpresaNombre.value.empresa_nombre
            );
        }
    }

    toggleEdit() {
        this.edit = !this.edit;
        this.formEmpresaNombre.reset({
            empresa_nombre: this.loadedCalidad.empresa_nombre
        });
    }

    uploadLogo(event) {
        const file = event.files[0];
        this.onUpdateEmpresaLogo.emit(file);
    }
}
