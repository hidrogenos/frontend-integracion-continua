import { Component, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ArlModel } from "../../../shared/models/arl.model";

@Component({
    selector: 'create-arl-dialog',
    template:`
            <form [formGroup]="newArl" (ngSubmit)="onSubmit()" novalidate>
            <p-dialog 
                header="Registrar nueva arl" 
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
                    <button type="submit" pButton icon="fa fa-check"  label="Crear" [disabled]="!newArl.valid"></button>
                    <button type="button" pButton icon="fa fa-close" (click)="display=false" (click)="!newArl.reset()" label="Cancelar" class="danger-btn"></button>
                </p-footer>
            </p-dialog>
        </form>
    `
})

export class CreateArlDialogComponent {

    //atributos
    display:boolean;
    newArl: FormGroup;

    //events
    @Output() create = new EventEmitter<ArlModel>();

    //properties
    constructor(
        private fb: FormBuilder,
    ) {}
    
    ngOnInit(){ 
        this.createForm();
    }

    createForm() {

        this.newArl = this.fb.group({
        nombre: ['', Validators.required],
        activo: true
        });
    }
    
    onSubmit() {
        this.display = false;
        const arl:  ArlModel= {
            nombre: this.newArl.value.nombre,
        };
        this.newArl.reset();
        this.create.emit(arl);
    }
    
    show() {
        this.display = true;
    }
}