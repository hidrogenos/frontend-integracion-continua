import { Component, Output, EventEmitter, Input, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { CesantiaModel } from "../../../shared/models/cesantia.model";

@Component({
    selector: 'edit-cesantia-dialog',
    template:`
            <form [formGroup]="editCesantia" (ngSubmit)="onSubmit()" novalidate>
            <p-dialog 
                header="Editar cesantía" 
                [(visible)]="display" 
                [responsive]="true" 
                [maximizable]="true" 
                [width]="800"
                [modal]="true">
                <div class="ui-g">
                    <div class="ui-g-12 ui-fluid">
                        <div>
                            <label>Nombre:</label>
                        </div>
                        <input type="text" pInputText formControlName="nombre" />
                    </div>
                </div>
                <p-footer>
                    <button type="submit" pButton icon="fa fa-check"  label="Actualizar" [disabled]="!editCesantia.valid"></button>
                    <button type="button" pButton icon="fa fa-close" (click)="display=false" (click)="!editCesantia.reset()" label="Cancelar" class="danger-btn"></button>
                </p-footer>
            </p-dialog>
        </form>
    `
})

export class EditCesantiaDialogComponent implements OnInit{

    //atributos
    display:boolean;
    editCesantia: FormGroup;
    id: number;

    //events
    @Output() edit = new EventEmitter<CesantiaModel>();

    //properties
    constructor(
        private fb: FormBuilder,
    ) {}
    
    ngOnInit(){ 
        this.createForm();
    }

    createForm() {

        this.editCesantia = this.fb.group({
            id: [''],
            nombre: ['', Validators.required],
        });
    }
    
    onSubmit() {
        this.display = false;
        const cesantia:  CesantiaModel= {
            id: this.editCesantia.value.id,
            nombre: this.editCesantia.value.nombre,

        };
        this.edit.emit(cesantia);
    }

    loadForm(cesantia: CesantiaModel){
        this.editCesantia.setValue({
            id: cesantia.id,
            nombre: cesantia.nombre
        })
    }

    show(cesantia: CesantiaModel){
        this.id = cesantia.id;
        this.display= true;
        this.loadForm(cesantia);
    }


}