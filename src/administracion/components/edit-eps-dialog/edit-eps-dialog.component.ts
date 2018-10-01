import { Component, Output, EventEmitter, Input, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { EpsModel } from "../../../shared/models/eps.model";

@Component({
    selector: 'edit-eps-dialog',
    template:`
            <form [formGroup]="editEps" (ngSubmit)="onSubmit()" novalidate>
            <p-dialog 
                header="Editar eps" 
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
                    <button type="submit" pButton icon="fa fa-check"  label="Actualizar" [disabled]="!editEps.valid"></button>
                    <button type="button" pButton icon="fa fa-close" (click)="display=false" (click)="!editEps.reset()" label="Cancelar" class="danger-btn"></button>
                </p-footer>
            </p-dialog>
        </form>
    `
})

export class EditEpsDialogComponent implements OnInit{

    //atributos
    display:boolean;
    editEps: FormGroup;
    id: number;


    //events
    @Output() edit = new EventEmitter<EpsModel>();

    //properties
    constructor(
        private fb: FormBuilder,
    ) {}
    
    ngOnInit(){ 
        this.createForm();
    }

    createForm() {

        this.editEps = this.fb.group({
            id: [''],
            nombre: ['', Validators.required],
        });
    }
    
    onSubmit() {
        this.display = false;
        const eps:  EpsModel= {
            id: this.editEps.value.id,
            nombre: this.editEps.value.nombre,
        };
        this.edit.emit(eps);
    }

    loadForm(eps: EpsModel){
        this.editEps.setValue({
            id: eps.id,
            nombre: eps.nombre
        })
    }

    show(eps: EpsModel){
        this.id = eps.id;
        this.display= true;
        this.loadForm(eps);
    }
}