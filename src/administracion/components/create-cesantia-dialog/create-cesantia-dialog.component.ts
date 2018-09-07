import { Component, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ArlModel } from "../../../shared/models/arl.model";
import { CesantiaModel } from "../../../shared/models/cesantia.model";

@Component({
    selector: 'create-cesantia-dialog',
    template:`
            <form [formGroup]="newCesantia" (ngSubmit)="onSubmit()" novalidate>
            <p-dialog 
                header="Registrar nueva cesantía" 
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
                    <button type="submit" pButton icon="fa fa-check"  label="Crear" [disabled]="!newCesantia.valid"></button>
                    <button type="button" pButton icon="fa fa-close" (click)="display=false" (click)="!newCesantia.reset()" label="Cancelar" class="danger-btn"></button>
                </p-footer>
            </p-dialog>
        </form>
    `
})

export class CreateCesantiaDialogComponent {

    //atributos
    display:boolean;
    newCesantia: FormGroup;

    //events
    @Output() create = new EventEmitter<CesantiaModel>();

    //properties
    constructor(
        private fb: FormBuilder,
    ) {}
    
    ngOnInit(){ 
        this.createForm();
    }

    createForm() {

        this.newCesantia = this.fb.group({
        nombre: ['', Validators.required],
        activo: true
        });
    }
    
    onSubmit() {
        this.display = false;
        const cesantia:  CesantiaModel= {
            nombre: this.newCesantia.value.nombre,
        };
        this.newCesantia.reset();
        this.create.emit(cesantia);
    }
    
    show() {
        this.display = true;
    }
}