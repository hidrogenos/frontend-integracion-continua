import { Component, Output, EventEmitter, Input, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ArlModel } from "../../../shared/models/arl.model";

@Component({
    selector: 'edit-arl-dialog',
    template:`
            <form [formGroup]="editArl" (ngSubmit)="onSubmit()" novalidate>
            <p-dialog 
                header="Editar arl" 
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
                    <button type="submit" pButton icon="fa fa-check"  label="Actualizar" [disabled]="!editArl.valid"></button>
                    <button type="button" pButton icon="fa fa-close" (click)="display=false" (click)="!editArl.reset()" label="Cancelar" class="danger-btn"></button>
                </p-footer>
            </p-dialog>
        </form>
    `
})

export class EditArlDialogComponent implements OnInit{

    //atributos
    display:boolean;
    editArl: FormGroup;
    id: number;

    //events
    @Output() edit = new EventEmitter<ArlModel>();

    //properties
    constructor(
        private fb: FormBuilder,
    ) {}
    
    ngOnInit(){ 
        this.createForm();
    }

    createForm() {

        this.editArl = this.fb.group({
            id: [''],
            nombre: ['', Validators.required],
        });
    }
    
    onSubmit() {
        this.display = false;
        const arl:  ArlModel= {
            id: this.editArl.value.id,
            nombre: this.editArl.value.nombre,

        };
        this.edit.emit(arl);
    }

    loadForm(arl: ArlModel){
        this.editArl.setValue({
            id: arl.id,
            nombre: arl.nombre
        })
    }

    show(arl: ArlModel){
        this.id = arl.id;
        this.display= true;
        this.loadForm(arl);
    }


}