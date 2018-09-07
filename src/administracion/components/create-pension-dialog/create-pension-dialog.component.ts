
import { Component, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { PensionModel } from "../../../shared/models/pension.model";

@Component({
    selector: 'create-pension-dialog',
    template: `
     <form [formGroup]="newPension" (ngSubmit)="onSubmit()" novalidate>
            <p-dialog 
                header="Registrar nueva pensión" 
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
                    <button type="submit" pButton icon="fa fa-check"  label="Crear" [disabled]="!newPension.valid"></button>
                    <button type="button" pButton icon="fa fa-close" (click)="display=false" (click)="!newPension.reset()" label="Cancelar" class="danger-btn"></button>
                </p-footer>
            </p-dialog>
        </form>
    
    `
})

export class CreatePensionDIalogComponent{

    //atributos
    display:boolean;
    newPension: FormGroup;

    //events
    @Output() create = new EventEmitter<PensionModel>();

    //properties
    constructor(
        private fb: FormBuilder,
    ) {}
    
    ngOnInit(){ 
        this.createForm();
    }

    createForm() {

        this.newPension = this.fb.group({
        nombre: ['', Validators.required],
        activo: true
        });
    }
    
    onSubmit() {
        this.display = false;
        const pension:  PensionModel= {
            nombre: this.newPension.value.nombre,
        };
        this.newPension.reset();
        this.create.emit(pension);
    }
    
    show() {
        this.display = true;
    }
}

