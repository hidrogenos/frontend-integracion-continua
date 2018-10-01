import { Component, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { DepartamentoModel } from "../../../shared/models/departamento.model";
import { PaisModel } from "../../../shared/models/pais.model";

@Component({
    selector: 'edit-departamento-dialog',
    template:`
            <form [formGroup]="editDepartamento" (ngSubmit)="onSubmit()" novalidate>
            <p-dialog 
                header="Editar departamento" 
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
                    <button type="submit" pButton icon="fa fa-check"  label="Actualizar" [disabled]="!editDepartamento.valid"></button>
                    <button type="button" pButton icon="fa fa-close" (click)="display=false" (click)="!editDepartamento.reset()" label="Cancelar" class="danger-btn"></button>
                </p-footer>
            </p-dialog>
        </form>
    `
})

export class EditDepartamentoDialogComponent {

    //atributos
    display:boolean;
    editDepartamento: FormGroup;
    id: number;
    departamento: DepartamentoModel;

    //events
    @Output() edit = new EventEmitter<DepartamentoModel>();


    @Input() paises: PaisModel[];

    //properties
    constructor(
        private fb: FormBuilder,
    ) {}
    
    ngOnInit(){ 
        this.createForm();
    }

    createForm() {
        this.editDepartamento = this.fb.group({
        id: [''],
        nombre: ['', Validators.required],
        id_pais: ['',Validators.required],
        });
    }
    
    onSubmit() {
        this.display = false;
        const departamento:  DepartamentoModel= {
            id: this.editDepartamento.value.id,
            nombre: this.editDepartamento.value.nombre,
            id_pais: this.editDepartamento.value.id_pais.id,
        };
        this.edit.emit(departamento);
    }
    
    loadForm(departamento: DepartamentoModel){
        this.departamento = departamento;
        this.editDepartamento.setValue({
            id: departamento.id,
            nombre: departamento.nombre,
            id_pais: this.paises.find(element => element.id == this.departamento.id_pais),

        })
    }

    show(departamento: DepartamentoModel){
        this.id = departamento.id;
        this.display = true;
        this.loadForm(departamento);
    }
}