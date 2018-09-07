import { Component, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { EpsModel } from "../../../shared/models/eps.model";

@Component({
    selector: 'create-eps-dialog',
    template:`
            <form [formGroup]="newEps" (ngSubmit)="onSubmit()" novalidate>
            <p-dialog 
                header="Registrar nueva eps" 
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
                    <button type="submit" pButton icon="fa fa-check"  label="Crear" [disabled]="!newEps.valid"></button>
                    <button type="button" pButton icon="fa fa-close" (click)="display=false" (click)="!newEps.reset()" label="Cancelar" class="danger-btn"></button>
                </p-footer>
            </p-dialog>
        </form>
    `
})

export class CreateEpsDialogComponent {

    //atributos
    display:boolean;
    newEps: FormGroup;

    //events
    @Output() create = new EventEmitter<EpsModel>();

    //properties
    constructor(
        private fb: FormBuilder,
    ) {}
    
    ngOnInit(){ 
        this.createForm();
    }

    createForm() {

        this.newEps = this.fb.group({
        nombre: ['', Validators.required],
        activo: true
        });
    }
    
    onSubmit() {
        this.display = false;
        const eps:  EpsModel= {
            nombre: this.newEps.value.nombre,
        };
        this.newEps.reset();
        this.create.emit(eps);
    }
    
    show() {
        this.display = true;
    }
}