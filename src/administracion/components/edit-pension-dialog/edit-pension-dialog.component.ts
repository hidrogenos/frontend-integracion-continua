import { Component, Output, EventEmitter, Input, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { PensionModel } from "../../../shared/models/pension.model";

@Component({
    selector: 'edit-pension-dialog',
    template:`
            <form [formGroup]="editPension" (ngSubmit)="onSubmit()" novalidate>
            <p-dialog 
                header="Editar pensión" 
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
                    <button type="submit" pButton icon="fa fa-check"  label="Actualizar" [disabled]="!editPension.valid"></button>
                    <button type="button" pButton icon="fa fa-close" (click)="display=false" (click)="!editPension.reset()" label="Cancelar" class="danger-btn"></button>
                </p-footer>
            </p-dialog>
        </form>
    `
})

export class EditPensionDialogComponent implements OnInit{

    //atributos
    display:boolean;
    editPension: FormGroup;
    id: number;

    //events
    @Output() edit = new EventEmitter<PensionModel>();

    //properties
    constructor(
        private fb: FormBuilder,
    ) {}
    
    ngOnInit(){ 
        this.createForm();
    }

    createForm() {

        this.editPension = this.fb.group({
            id: [''],
            nombre: ['', Validators.required],
        });
    }
    
    onSubmit() {
        this.display = false;
        const pension:  PensionModel= {
            id: this.editPension.value.id,
            nombre: this.editPension.value.nombre,

        };
        this.edit.emit(pension);
    }

    loadForm(pension: PensionModel){
        this.editPension.setValue({
            id: pension.id,
            nombre: pension.nombre
        })
    }

    show(pension: PensionModel){
        this.id = pension.id;
        this.display= true;
        this.loadForm(pension);
    }


}