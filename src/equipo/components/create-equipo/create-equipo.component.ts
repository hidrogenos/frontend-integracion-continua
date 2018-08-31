import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { EquipoModel } from '../../../shared/models/equipo.model';
import { ProveedorModel } from '../../../shared/models/proveedor.model';

@Component({
    selector: 'create-equipo',
    template: `
        <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
            <p-dialog 
                header="Registrar nuevo equipo" 
                [(visible)]="display" 
                [width]="800"
                [modal]="true">
                <h2>Datos básicos</h2>
                    <div class="ui-g">
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Nombre:</label>
                            </div>
                                <input type="text" pInputText formControlName="nombre" />
                            </div>
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Grupo:</label>
                            </div>
                            <p-dropdown 
                                [options]="grupos" 
                                formControlName="grupo" 
                                optionLabel="label" 
                                placeholder="Seleccione un grupo"
                                appendTo="body"
                                [autoWidth]="false">
                            </p-dropdown>
                        </div>
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Referencia:</label>
                            </div>
                                <input type="text" pInputText formControlName="referencia" />
                        </div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Marca:</label>
                            </div>
                                <input type="text" pInputText formControlName="marca" />
                        </div>
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Serial:</label>
                            </div>
                                <input type="text" pInputText formControlName="serial" />
                        </div>
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Área:</label>
                            </div>
                                <input type="text" pInputText formControlName="area" />
                        </div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Software:</label>
                            </div>
                                <input type="text" pInputText formControlName="software" />
                        </div>
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Proveedor 1:</label>
                            </div>
                            <p-dropdown 
                                [options]="proveedores" 
                                formControlName="id_proveedor1" 
                                optionLabel="nombre" 
                                placeholder="Seleccione un proveedor"
                                appendTo="body"
                                [autoWidth]="false">
                            </p-dropdown>
                        </div>
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Proveedor 2:</label>
                            </div>
                            <p-dropdown 
                                [options]="proveedores" 
                                formControlName="id_proveedor2" 
                                optionLabel="nombre" 
                                placeholder="Seleccione un proveedor"
                                appendTo="body"
                                [autoWidth]="false">
                            </p-dropdown>
                        </div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Fecha de compra:</label>
                            </div>
                                <p-calendar appendTo="body" showIcon="true" formControlName="fecha_compra"></p-calendar>
                        </div>
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Fecha de calificación:</label>
                            </div>
                                <p-calendar appendTo="body" showIcon="true" formControlName="fecha_calificacion"></p-calendar>
                        </div>
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Fecha de calibración:</label>
                            </div>
                                <p-calendar  appendTo="body" [defaultDate]="null"	showIcon="true" formControlName="fecha_calibracion"></p-calendar>
                        </div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Fecha de metrología:</label>
                            </div>
                                <p-calendar appendTo="body" showIcon="true" formControlName="fecha_metrologia"></p-calendar>
                        </div>
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Mantenimiento preventivo:</label>
                            </div>
                                <p-calendar  appendTo="body" showIcon="true" formControlName="fecha_mantenimiento_preventivo"></p-calendar>
                        </div>
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Mantenimiento correctivo:</label>
                            </div>
                                <p-calendar appendTo="body" showIcon="true" formControlName="fecha_mantenimiento_correctivo"></p-calendar>
                        </div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Fecha de prox compra:</label>
                            </div>
                                <p-calendar [minDate]="form.value.fecha_compra"  appendTo="body" [minDate]="fecha_compra" showIcon="true" formControlName="fecha_proxima_compra"></p-calendar>
                        </div>
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Fecha de prox calificación:</label>
                            </div>
                                <p-calendar [minDate]="form.value.fecha_calificacion" appendTo="body" showIcon="true" formControlName="fecha_proxima_calificacion"></p-calendar>
                        </div>
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Fecha de prox calibración:</label>
                            </div>
                                <p-calendar  [minDate]="form.value.fecha_calibracion" appendTo="body" [defaultDate]="null"	showIcon="true" formControlName="fecha_proxima_calibracion"></p-calendar>
                        </div>
                    </div>
                     <div class="ui-g">
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Fecha de prox metrología:</label>
                            </div>
                                <p-calendar [minDate]="form.value.fecha_metrologia"  appendTo="body" showIcon="true" formControlName="fecha_proxima_metrologia"></p-calendar>
                        </div>
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Prox mantenimiento preventivo:</label>
                            </div>
                                <p-calendar [minDate]="form.value.fecha_mantenimiento_preventivo" appendTo="body" showIcon="true" formControlName="fecha_proximo_mantenimiento_preventivo"></p-calendar>
                        </div>
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Prox mantenimiento correctivo:</label>
                            </div>
                                <p-calendar [minDate]="form.value.fecha_mantenimiento_correctivo" appendTo="body" showIcon="true" formControlName="fecha_proximo_mantenimiento_correctivo"></p-calendar>
                        </div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-12">
                            <label>Observaciones:</label>
                        </div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-12 ui-fluid">
                            <textarea [rows]="5" [cols]="105" pInputTextarea formControlName="observaciones"></textarea>
                        </div>
                    </div>
                    <p-footer>
                        <button type="submit" pButton icon="fa fa-check"  label="Guardar" [disabled]="form.invalid"></button>
                        <button type="button" pButton icon="fa fa-close" (click)="display=false" label="Cancelar" class="ui-button-danger"></button>
                    </p-footer>
                </p-dialog>
        </form>

    `
})
export class CreateEquipoComponent implements OnInit {

    //atributos
    display: boolean;
    form: FormGroup;
    formatDate: string;
    equipo;
    //eventos
    @Output() onCreateEquipo = new EventEmitter<EquipoModel>();

    //properties
    @Input()  proveedores: ProveedorModel;
  
    grupos = [
        { label: 'Grupo A', value: 'A' },
        { label: 'Grupo B', value: 'B' },
        { label: 'Grupo C', value: 'C' },
        { label: 'Grupo D', value: 'D' },
    ];

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            nombre: ['', Validators.required],
            grupo: [''],
            referencia: ['', Validators.required],
            area: ['', Validators.required],
            serial: ['', Validators.required],
            marca: ['', Validators.required],
            software: ['', Validators.required],
            observaciones: [''],
            fecha_compra: [''],
            fecha_calibracion: [''],
            fecha_calificacion: [''],
            fecha_metrologia: [''],
            fecha_mantenimiento_preventivo: [''],
            fecha_mantenimiento_correctivo: [''],
            fecha_proxima_compra: [''],
            fecha_proxima_calibracion: [''],
            fecha_proxima_calificacion: [''],
            fecha_proxima_metrologia: [''],
            fecha_proximo_mantenimiento_preventivo: [''],
            fecha_proximo_mantenimiento_correctivo: [''],
            id_proveedor1: ['', Validators.required],
            id_proveedor2: ['', Validators.required],
        })
    }

    onSubmit() {
        this.display = false;
        const newEquipo: EquipoModel =
            {
                nombre: this.form.value.nombre,
                grupo: this.form.value.grupo.value,
                referencia: this.form.value.referencia,
                area: this.form.value.area,
                serial: this.form.value.area,
                marca: this.form.value.area,
                software: this.form.value.area,
                observaciones: this.form.value.area,
                fecha_compra: this.form.value.fecha_compra.valueOf(),
                fecha_calibracion: this.form.value.fecha_calibracion.valueOf(),
                fecha_calificacion: this.form.value.fecha_calificacion.valueOf(),
                fecha_metrologia: this.form.value.fecha_metrologia.valueOf(),
                fecha_mantenimiento_preventivo: this.form.value.fecha_mantenimiento_preventivo.valueOf(),
                fecha_mantenimiento_correctivo: this.form.value.fecha_mantenimiento_correctivo.valueOf(),
                fecha_proxima_compra: this.form.value.fecha_proxima_compra.valueOf(),
                fecha_proxima_calibracion: this.form.value.fecha_proxima_calibracion.valueOf(),
                fecha_proxima_calificacion: this.form.value.fecha_proxima_calificacion.valueOf(),
                fecha_proxima_metrologia: this.form.value.fecha_proxima_metrologia.valueOf(),
                fecha_proximo_mantenimiento_preventivo: this.form.value.fecha_mantenimiento_preventivo.valueOf(),
                fecha_proximo_mantenimiento_correctivo: this.form.value.fecha_mantenimiento_correctivo.valueOf(),
                id_proveedor1: this.form.value.id_proveedor1.id,
                id_proveedor2: this.form.value.id_proveedor2.id,
            }

        this.form.reset({});
        this.onCreateEquipo.emit(newEquipo);
    }

    show() {
        this.display = true;
    }
}