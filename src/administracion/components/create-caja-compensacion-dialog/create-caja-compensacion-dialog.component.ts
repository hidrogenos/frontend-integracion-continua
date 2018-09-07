import { Component, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { CajaCompensacionModel } from "../../../shared/models/caja-compensacion.model";

@Component({
    selector: 'create-caja-compensacion-dialog',
    template:`
            <form [formGroup]="newCajaCompensacion" (ngSubmit)="onSubmit()" novalidate>
            <p-dialog 
                header="Registrar nueva caja de compensación" 
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
                    <button type="submit" pButton icon="fa fa-check"  label="Crear" [disabled]="!newCajaCompensacion.valid"></button>
                    <button type="button" pButton icon="fa fa-close" (click)="display=false" (click)="!newCajaCompensacion.reset()" label="Cancelar" class="danger-btn"></button>
                </p-footer>
            </p-dialog>
        </form>
    `
})

export class CreateCajaCompensacionDialogComponent {

    //atributos
    display:boolean;
    newCajaCompensacion: FormGroup;


    //events
    @Output() create = new EventEmitter<CajaCompensacionModel>();

    //properties
    constructor(
        private fb: FormBuilder
    ){}


    ngOnInit(){ 
        this.createForm();
    }

    createForm(){
        this.newCajaCompensacion = this.fb.group({
            nombre: ['', Validators.required],
            activo: true
        });
    }

    onSubmit(){
        this.display = false;
        const cajaCompensacion: CajaCompensacionModel ={
            nombre: this.newCajaCompensacion.value.nombre,
        };
        this.newCajaCompensacion.reset();
        this.create.emit(cajaCompensacion);
    }
    

    show(){
        this.display = true;
    }
}