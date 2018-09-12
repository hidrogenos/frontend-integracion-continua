import { Component, Output, EventEmitter } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { PaisModel } from "../../../shared/models/pais.model";

@Component({
    selector: 'create-pais-dialog',
    template:`
     <form [formGroup]="newPais" (ngSubmit)="onSubmit()" novalidate>
            <p-dialog 
                header="Registrar nuevo país" 
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
                    <button type="submit" pButton icon="fa fa-check"  label="Crear" [disabled]="!newPais.valid"></button>
                    <button type="button" pButton icon="fa fa-close" (click)="display=false" (click)="!newPais.reset()" label="Cancelar" class="danger-btn"></button>
                </p-footer>
            </p-dialog>
        </form>
          
    `
})

export class CreatePaisDialogComponent {

    //atributos
    display: boolean;
    newPais: FormGroup;

    //event
    @Output() create = new EventEmitter<PaisModel>();

    //properties
    constructor(
        private fb: FormBuilder
    ){}

    ngOnInit(){
        this.createForm();
    }
   
    createForm(){
        this.newPais = this.fb.group({
            nombre: ['', Validators.required],
            activo: true
        });
    }

    onSubmit(){
        this.display = false;
        const pais: PaisModel = {
            nombre: this.newPais.value.nombre,
        };
        this.newPais.reset();
        this.create.emit(pais);
    }

    show(){
        this.display = true;
    }
}