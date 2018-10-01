import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { EquipoServicioMantenimientoModel } from '../../../shared/models/equipoServicioMantenimiento.model';
import { TipoServicioModel } from '../../../shared/models/tipoServicio.model';
import { ProveedorModel } from '../../../shared/models/proveedor.model';

@Component({
    selector: 'Edit-servicios-mantenimientos-equipo',
    template: `
    <form [formGroup]="formEditServicio" (ngSubmit)="onSubmit()" novalidate>
        <p-dialog 
            header="Editar servicio o mantenimiento" 
            [(visible)]="display" 
            [width]="800"
            [modal]="true">
            <h2>Datos básicos</h2>
            <div class="ui-g">
                        <div class="ui-g-6 ui-fluid">
                          <div>
                                <label>Tipo servicio:</label>
                            </div>
                            <p-dropdown 
                                [options]="tipos_servicio" 
                                formControlName="tipo_de_servicio" 
                                optionLabel="nombre" 
                                placeholder="Seleccione tipo de servicio"
                                appendTo="body"
                                [autoWidth]="false">
                            </p-dropdown>
                        </div>
                        <div class="ui-g-6 ui-fluid">
                            <div>
                                <label>Proveedor:</label>
                            </div>
                            <p-dropdown 
                                [options]="proveedores" 
                                formControlName="proveedor" 
                                optionLabel="nombre" 
                                placeholder="Seleccione proveedor"
                                appendTo="body"
                                [autoWidth]="false">
                            </p-dropdown>
                        </div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-6 ui-fluid">
                            <div>
                                <label>Fecha de servicio:</label>
                            </div>
                                <p-calendar appendTo="body" showIcon="true" formControlName="fecha_servicio"></p-calendar>
                        </div>
                        <div class="ui-g-6 ui-fluid">
                            <div>
                                <label>Fecha de prox. servicio:</label>
                            </div>
                                <p-calendar appendTo="body" showIcon="true" formControlName="fecha_proximo_servicio"></p-calendar>
                        </div>                 
                    </div>
                     <div class="ui-g">
                        <div class="ui-g-12">
                            <label>Descripción:</label>
                        </div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-12 ui-fluid">
                            <textarea [rows]="5" [cols]="105" pInputTextarea formControlName="descripcion"></textarea>
                        </div>
                    </div>
                    <p-footer>
                        <button style="margin-right:10px;" pButton 
                            icon="fa fa-close"
                            type="button" 
                            label="Cancelar" 
                            class="ui-button-danger"
                            (click)="display = false">
                        </button>
                        <button style="margin-right:10px;" pButton 
                            icon="fa fa-check"
                            type="submit" 
                            label="Actualizar" 
                            class="ui-button-primary"
                            [disabled]="!formEditServicio.valid">
                        </button>
                </p-footer>
        </p-dialog>
    </form>
    `
})
export class EditServiciosMantenimientosEquipoComponent {
    
    formEditServicio: FormGroup;
    display: boolean;

    @Output() onEditServicioMantenimientoEquipo = new EventEmitter<any>();
    @Input()  proveedores: ProveedorModel[];
    @Input()  tipos_servicio: TipoServicioModel[];

    ngOnInit(){
        this.createForm()
    }

    constructor(private fb: FormBuilder) {}

    createForm() {
        this.formEditServicio = this.fb.group({
            id: [''],
            fecha_servicio: ['', Validators.required],
            fecha_proximo_servicio: ['', Validators.required],
            descripcion: ['', Validators.required],
            proveedor: [''],
            tipo_de_servicio: ['', Validators.required],
        })
    }
   
    loadFormData(equipo: EquipoServicioMantenimientoModel) {
        console.log(equipo)
        this.formEditServicio.setValue({
            id: equipo.id,
            fecha_servicio: new Date(equipo.fecha_servicio),
            fecha_proximo_servicio: new Date(equipo.fecha_proximo_servicio),
            descripcion: equipo.descripcion,
            proveedor: this.proveedores.find(item => item.id == equipo.id_proveedor),
            tipo_de_servicio: this.tipos_servicio.find(item => item.id == equipo.id_tipo_servicio),
        });
        
    }

    onSubmit() {
        this.display = false;
        const equipo: EquipoServicioMantenimientoModel =
            {
                id: this.formEditServicio.value.id,
                fecha_servicio: this.formEditServicio.value.fecha_servicio.valueOf(),
                fecha_proximo_servicio: this.formEditServicio.value.fecha_proximo_servicio.valueOf(),
                descripcion: this.formEditServicio.value.descripcion,
                id_proveedor: this.formEditServicio.value.proveedor.id,
                id_tipo_servicio : this.formEditServicio.value.tipo_de_servicio.id,
            }
        this.onEditServicioMantenimientoEquipo.emit(equipo);
    }

    show() {
        this.display = true;
    }

}