import { Component, Output, EventEmitter, Input, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { CajaCompensacionModel } from "../../../shared/models/caja-compensacion.model";

@Component({
    selector: 'edit-caja-conpensacion-dialog',
    template:`
            <form [formGroup]="editCajaCompensacion" (ngSubmit)="onSubmit()" novalidate>
            <p-dialog 
                header="Editar caja de conpensación" 
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
                    <button type="submit" pButton icon="fa fa-check"  label="Actualizar" [disabled]="!editCajaCompensacion.valid"></button>
                    <button type="button" pButton icon="fa fa-close" (click)="display=false" (click)="!editCajaCompensacion.reset()" label="Cancelar" class="danger-btn"></button>
                </p-footer>
            </p-dialog>
        </form>
    `
})

export class EditCajaCompensacionDialogComponent implements OnInit{

    //atributos
    display:boolean;
    editCajaCompensacion: FormGroup;
    id: number;

    //events
    @Output() edit = new EventEmitter<CajaCompensacionModel>();

    //properties
    constructor(
        private fb: FormBuilder,
    ) {}
    
    ngOnInit(){ 
        this.createForm();
    }

    createForm() {

        this.editCajaCompensacion = this.fb.group({
            id: [''],
            nombre: ['', Validators.required],
        });
    }
    
    onSubmit() {
        this.display = false;
        const cajaConpensacion:  CajaCompensacionModel= {
            id: this.editCajaCompensacion.value.id,
            nombre: this.editCajaCompensacion.value.nombre,

        };
        this.edit.emit(cajaConpensacion);
    }

    loadForm(cajaConpensacion: CajaCompensacionModel){
        this.editCajaCompensacion.setValue({
            id: cajaConpensacion.id,
            nombre: cajaConpensacion.nombre
        })
    }

    show(cajaConpensacion: CajaCompensacionModel){
        this.id = cajaConpensacion.id;
        this.display= true;
        this.loadForm(cajaConpensacion);
    }


}