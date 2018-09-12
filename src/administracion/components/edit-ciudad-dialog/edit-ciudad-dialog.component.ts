import { Component, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { DepartamentoModel } from "../../../shared/models/departamento.model";
import { CiudadModel } from "../../../shared/models/ciudad.model";

@Component({
    selector: 'edit-ciudad-dialog',
    template:`
            <form [formGroup]="editCiudad" (ngSubmit)="onSubmit()" novalidate>
            <p-dialog 
                header="Editar ciudad" 
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
                            placeholder="Seleccione un departamento"
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
                    <button type="submit" pButton icon="fa fa-check"  label="Actualizar" [disabled]="!editCiudad.valid"></button>
                    <button type="button" pButton icon="fa fa-close" (click)="display=false" (click)="!editCiudad.reset()" label="Cancelar" class="danger-btn"></button>
                </p-footer>
            </p-dialog>
        </form>
    `
})

export class EditCiudadDialogComponent {

    //atributos
    display:boolean;
    editCiudad: FormGroup;
    id: number;
    departamento: DepartamentoModel;

    //events
    @Output() edit = new EventEmitter<CiudadModel>();


    @Input() departamentos: DepartamentoModel[];

    //properties
    constructor(
        private fb: FormBuilder,
    ) {}
    
    ngOnInit(){ 
        this.createForm();
        console.log(this.departamentos)
    }

    createForm() {
        this.editCiudad = this.fb.group({
        id: [''],
        nombre: ['', Validators.required],
        id_departamento: ['',Validators.required],
        });
    }
    
    onSubmit() {
        this.display = false;
        const ciudad:  CiudadModel= {
            id: this.editCiudad.value.id,
            nombre: this.editCiudad.value.nombre,
            id_departamento: this.editCiudad.value.id_departamento.id,
        };
        this.edit.emit(ciudad);
    }
    
    loadForm(ciudad: CiudadModel){
        console.log(ciudad)
        this.editCiudad.setValue({
            id: ciudad.id,
            nombre: ciudad.nombre,
            id_departamento: this.departamentos.find(element => element.id == ciudad.id_departamento),

        })
    }

    show(ciudad: CiudadModel){
        this.id = ciudad.id;
        this.display = true;
        this.loadForm(ciudad);
    }
}