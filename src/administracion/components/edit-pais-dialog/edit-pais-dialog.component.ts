import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PaisModel } from "../../../shared/models/pais.model";

@Component({

    selector:'edit-pais-dialog',
    template: `
     <form [formGroup]="editPais" (ngSubmit)="onSubmit()" novalidate>
            <p-dialog 
                header="Editar país" 
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
                    <button type="submit" pButton icon="fa fa-check"  label="Actualizar" [disabled]="!editPais.valid"></button>
                    <button type="button" pButton icon="fa fa-close" (click)="display=false" (click)="!editPais.reset()" label="Cancelar" class="danger-btn"></button>
                </p-footer>
            </p-dialog>
        </form>
    `
})

export class EditPaisDialogComponent implements OnInit{

    //atributos
    editPais: FormGroup;
    display: boolean;
    id: number;

    //events
    @Output() edit = new EventEmitter<PaisModel>();

    //properties
    constructor(private fb: FormBuilder){}

    ngOnInit(){
        this.createForm();
    }

    createForm(){
        this.editPais = this.fb.group({
            id: [''],
            nombre: ['',Validators.required],
        })
    }

    loadForm(pais: PaisModel){
        this.editPais.setValue({
            id: pais.id,
            nombre: pais.nombre
        })
    }

    onSubmit(){
        this.display = false;
        const pais: PaisModel = {
            id: this.editPais.value.id,
            nombre: this.editPais.value.nombre
        }
        this.edit.emit(pais);
    }

    show(pais: PaisModel){
        this.id = pais.id;
        this.display = true;
        this.loadForm(pais);
    }

}