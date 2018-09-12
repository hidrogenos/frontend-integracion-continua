import { Component, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ArlModel } from "../../../shared/models/arl.model";
import { CesantiaModel } from "../../../shared/models/cesantia.model";
import { DepartamentoModel } from "../../../shared/models/departamento.model";
import { PaisModel } from "../../../shared/models/pais.model";

@Component({
    selector: 'create-departamento-dialog',
    template:`
            <form [formGroup]="newDepartamento" (ngSubmit)="onSubmit()" novalidate>
            <p-dialog 
                header="Registrar nuevo departamento" 
                [(visible)]="display" 
                [responsive]="true" 
                [maximizable]="true" 
                [width]="800"
                [modal]="true">
                 <div class="ui-g-6 ui-fluid">
                        <div>
                            <label>Pais:</label>
                        </div>
                        <p-dropdown 
                            [options]="paises" 
                            formControlName="id_pais" 
                            optionLabel="nombre" 
                            placeholder="Seleccione un pais"
                            appendTo="body"
                            [autoWidth]="false"></p-dropdown>
                    </div>
                <div class="ui-g">
                    <div class="ui-g-12 ui-fluid">
                        <div>
                            <label>Departamento:</label>
                        </div>
                        <input type="text" pInputText formControlName="nombre" />
                    </div>
                </div>
                <p-footer>
                    <button type="submit" pButton icon="fa fa-check"  label="Crear" [disabled]="!newDepartamento.valid"></button>
                    <button type="button" pButton icon="fa fa-close" (click)="display=false" (click)="!newDepartamento.reset()" label="Cancelar" class="danger-btn"></button>
                </p-footer>
            </p-dialog>
        </form>
    `
})

export class CreateDepartamentoDialogComponent {

    //atributos
    display:boolean;
    newDepartamento: FormGroup;

    //events
    @Output() create = new EventEmitter<DepartamentoModel>();


    @Input() paises: PaisModel[];
    //properties
    constructor(
        private fb: FormBuilder,
    ) {}
    
    ngOnInit(){ 
        this.createForm();
    }

    createForm() {
        this.newDepartamento = this.fb.group({
        id: [''],
        nombre: ['', Validators.required],
        id_pais: ['',Validators.required],
        });
    }
    
    onSubmit() {
        this.display = false;
        const departamento:  DepartamentoModel= {
            nombre: this.newDepartamento.value.nombre,
            id_pais: this.newDepartamento.value.id_pais.id,
        };
        this.newDepartamento.reset();
        this.create.emit(departamento);
    }
    
    show() {
        this.display = true;
    }
}