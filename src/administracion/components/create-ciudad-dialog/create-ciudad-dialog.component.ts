import { Component, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { PaisModel } from "../../../shared/models/pais.model";
import { CiudadModel } from "../../../shared/models/ciudad.model";

@Component({
    selector: 'create-ciudad-dialog',
    template:`
            <form [formGroup]="newCiudad" (ngSubmit)="onSubmit()" novalidate>
            <p-dialog 
                header="Registrar nueva ciudad" 
                [(visible)]="display" 
                [responsive]="true" 
                [maximizable]="true" 
                [width]="800"
                [modal]="true">
                 <div class="ui-g-6 ui-fluid">
                        <div>
                            <label>Departamento:</label>
                        </div>
                        <p-dropdown 
                            [options]="departamentos" 
                            formControlName="id_departamento" 
                            optionLabel="nombre" 
                            placeholder="Seleccione un departamento..."
                            appendTo="body"
                            [autoWidth]="false"></p-dropdown>
                    </div>
                <div class="ui-g">
                    <div class="ui-g-12 ui-fluid">
                        <div>
                            <label>Ciudad:</label>
                        </div>
                        <input type="text" pInputText formControlName="nombre" />
                    </div>
                </div>
                <p-footer>
                    <button type="submit" pButton icon="fa fa-check"  label="Crear" [disabled]="!newCiudad.valid"></button>
                    <button type="button" pButton icon="fa fa-close" (click)="display=false" (click)="!newCiudad.reset()" label="Cancelar" class="danger-btn"></button>
                </p-footer>
            </p-dialog>
        </form>
    `
})

export class CreateCiudadDialogComponent {

    //atributos
    display:boolean;
    newCiudad: FormGroup;

    //events
    @Output() create = new EventEmitter<CiudadModel>();
    @Input() departamentos: PaisModel[];

    //properties
    constructor(
        private fb: FormBuilder,
    ) {}
    
    ngOnInit(){ 
        this.createForm();
    }

    createForm() {
        this.newCiudad = this.fb.group({
        id: [''],
        nombre: ['', Validators.required],
        id_departamento: ['',Validators.required],
        });
    }
    
    onSubmit() {
        this.display = false;
        const ciudad:  CiudadModel= {
            nombre: this.newCiudad.value.nombre,
            id_departamento: this.newCiudad.value.id_departamento.id,
        };
        this.newCiudad.reset();
        this.create.emit(ciudad);
    }
    
    show() {
        this.display = true;
    }
}