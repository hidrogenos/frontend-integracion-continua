import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { EquipoServicioMantenimientoModel } from '../../../shared/models/equipoServicioMantenimiento.model';
import { TipoServicioModel } from '../../../shared/models/tipoServicio.model';
import { ProveedorModel } from '../../../shared/models/proveedor.model';
import { ServiciosMantenimientosEquipoComponent } from '..';

@Component({
    selector: 'create-servicios-mantenimientos-equipo',
    template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
        <p-dialog 
            header="Registrar nuevo servicio o mantenimiento" 
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
                                <p-calendar  appendTo="body" showIcon="true" formControlName="fecha_servicio"></p-calendar>
                            </div>
                        <div class="ui-g-6 ui-fluid">
                            <div>
                                <label>Fecha de prox. servicio:</label>
                            </div>
                                <p-calendar [minDate]="form.value.fecha_servicio" appendTo="body" showIcon="true" formControlName="fecha_proximo_servicio"></p-calendar>
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
                            type="button" 
                            label="Cancelar" 
                            class="ui-button-danger"
                            (click)="display = false">
                        </button>
                        <button style="margin-right:10px;" pButton 
                            type="submit" 
                            label="Crear" 
                            class="ui-button-primary"
                            [disabled]="!form.valid">
                        </button>
                </p-footer>
        </p-dialog>
    </form>
    `
})
export class CreateServiciosMantenimientosEquipoComponent implements OnInit{
   
    form: FormGroup;
    display: boolean;
    servicio: EquipoServicioMantenimientoModel;
    @Output() onCreateServicioMantenimientoEquipo = new EventEmitter<EquipoServicioMantenimientoModel>();
    @Input()  proveedores: ProveedorModel;
    @Input()  tipos_servicio: TipoServicioModel;

    ngOnInit(){
        this.createForm()
    }

    constructor(private fb: FormBuilder) {}

    createForm() {
        this.form = this.fb.group({
            tipo_de_servicio: ['', Validators.required],
            proveedor: [''],
            fecha_servicio: ['', Validators.required],
            fecha_proximo_servicio: ['', Validators.required],
            descripcion: ['', Validators.required],
        })
    }

    onSubmit() {
        this.display = false;
        const newEquipo: EquipoServicioMantenimientoModel =
            {
                id_tipo_servicio : this.form.value.tipo_de_servicio.id,
                id_proveedor: this.form.value.proveedor.id,
                fecha_servicio: this.form.value.fecha_servicio.getTime(),
                fecha_proximo_servicio: this.form.value.fecha_proximo_servicio.getTime(),
                descripcion: this.form.value.descripcion,
            }

        this.form.reset({});
        this.onCreateServicioMantenimientoEquipo.emit(newEquipo);
    }

    show() {
        this.display = true;
    }
}