import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//MODEL
import { EquipoModel } from '../../../shared/models/equipo.model';
import { ProveedorModel } from '../../../shared/models/proveedor.model';

@Component({
    selector: 'datos-basicos-equipo',
    template: `
    <form [formGroup]="formEquipoDetalle" (ngSubmit)="onSubmit()" novalidate>
        <div class="ui-g">
            <div class="ui-g-12">
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
                            <input type="text" pInputText formControlName="referencia"/>
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
                                [options]="proveedor" 
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
                                [options]="proveedor" 
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
                                <p-calendar showIcon="true" formControlName="fecha_compra"></p-calendar>
                        </div>
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Fecha de calificación:</label>
                            </div>
                                <p-calendar  showIcon="true" formControlName="fecha_calificacion"></p-calendar>
                        </div>
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Fecha de calibración:</label>
                            </div>
                                <p-calendar   [defaultDate]="null"	showIcon="true" formControlName="fecha_calibracion"></p-calendar>
                        </div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Fecha de metrología:</label>
                            </div>
                                <p-calendar  showIcon="true" formControlName="fecha_metrologia"></p-calendar>
                        </div>
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Mantenimiento preventivo:</label>
                            </div>
                                <p-calendar  showIcon="true" formControlName="fecha_mantenimiento_preventivo"></p-calendar>
                        </div>
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Mantenimiento correctivo:</label>
                            </div>
                                <p-calendar  showIcon="true" formControlName="fecha_mantenimiento_correctivo"></p-calendar>
                        </div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Fecha de prox compra:</label>
                            </div>
                                <p-calendar  [minDate]="formEquipoDetalle.value.fecha_compra" appendTo="body" showIcon="true" formControlName="fecha_proxima_compra"></p-calendar>
                        </div>
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Fecha de prox calificación:</label>
                            </div>
                                <p-calendar [minDate]="formEquipoDetalle.value.fecha_calificacion" appendTo="body" showIcon="true" formControlName="fecha_proxima_calificacion"></p-calendar>
                        </div>
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Fecha de prox calibración:</label>
                            </div>
                                <p-calendar [minDate]="formEquipoDetalle.value.fecha_calibracion" appendTo="body" [defaultDate]="null"	showIcon="true" formControlName="fecha_proxima_calibracion"></p-calendar>
                        </div>
                    </div>
                     <div class="ui-g">
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Fecha de prox metrología:</label>
                            </div>
                                <p-calendar  [minDate]="formEquipoDetalle.value.fecha_metrologia"  appendTo="body" showIcon="true" formControlName="fecha_proxima_metrologia"></p-calendar>
                        </div>
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Prox mantenimiento preventivo:</label>
                            </div>
                                <p-calendar [minDate]="formEquipoDetalle.value.fecha_mantenimiento_preventivo" appendTo="body" showIcon="true" formControlName="fecha_proximo_mantenimiento_preventivo"></p-calendar>
                        </div>
                        <div class="ui-g-4 ui-fluid">
                            <div>
                                <label>Prox mantenimiento correctivo:</label>
                            </div>
                                <p-calendar [minDate]="formEquipoDetalle.value.fecha_mantenimiento_correctivo" appendTo="body" showIcon="true" formControlName="fecha_proximo_mantenimiento_correctivo"></p-calendar>
                        </div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-12">
                            <label>Observaciones:</label>
                        </div>
                    </div>
                <div class="ui-g">
                    <div class="ui-g-12 ui-fluid">
                        <textarea [rows]="5" [cols]="95" pInputTextarea formControlName="observaciones"></textarea>
                    </div>
                </div>
            </div>
        </div>
        <div class="ui-g">
            <div class="ui-g-12 text-aling-right">
                <button style="margin-right:10px;"  *ngIf="formEquipoDetalle.disabled && canEditPermisionsEditarDatosBasicosEquipo" pButton type="button" label="Editar datos" (click)="formEquipoDetalle.enable()" class="ui-button-success"></button>
                <button style="margin-right:10px;"  *ngIf="formEquipoDetalle.enabled" pButton type="button" label="Descartar cambios" (click)="loadFormData(equipo)" class="ui-button-danger"></button>
                <button style="margin-right:10px;" *ngIf="formEquipoDetalle.enabled" pButton type="submit" label="Actualizar"  class="ui-button-primary"></button>
            </div>
        </div>
    </form>
    `
})
export class DatosBasicosEquiposComponent implements OnInit {

    //atributos
    formEquipoDetalle: FormGroup;
    equipo: EquipoModel;

    //events
    @Input() proveedor: ProveedorModel[];
    @Input() canEditPermisionsEditarDatosBasicosEquipo: boolean;

    //properties
    @Output() onUpdateEquipo = new EventEmitter<EquipoModel>();

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.createForm();
    }

    grupos = [
        { label: 'Grupo A', value: 'A' },
        { label: 'Grupo B', value: 'B' },
        { label: 'Grupo C', value: 'C' },
        { label: 'Grupo D', value: 'D' },
    ];

    createForm() {
        this.formEquipoDetalle = this.fb.group({
            id: [''],
            nombre: ['', Validators.required],
            grupo: [''],
            referencia: ['', Validators.required],
            area: ['', Validators.required],
            serial: ['', Validators.required],
            marca: ['', Validators.required],
            software: ['', Validators.required],
            observaciones: ['', Validators.required],
            fecha_compra: [new Date(), Validators.required],
            fecha_calibracion: [new Date(), Validators.required],
            fecha_calificacion: [new Date(), Validators.required],
            fecha_metrologia: [new Date(), Validators.required],
            fecha_mantenimiento_preventivo: [new Date(), Validators.required],
            fecha_mantenimiento_correctivo: [new Date(), Validators.required],
            fecha_proxima_compra: [new Date(),''],
            fecha_proxima_calibracion: [new Date(),''],
            fecha_proxima_calificacion: [new Date(),''],
            fecha_proxima_metrologia: [new Date(),''],
            fecha_proximo_mantenimiento_preventivo: [new Date(),''],
            fecha_proximo_mantenimiento_correctivo: [new Date(),''],
            id_proveedor1: ['', Validators.required],
            id_proveedor2: ['', Validators.required],
        })
    }

    loadFormData(equipo: EquipoModel) {
        this.equipo = equipo;
        this.formEquipoDetalle.setValue({
            id: this.equipo.id,
            nombre: this.equipo.nombre,
            grupo: this.grupos.find(item => item.value == this.equipo.grupo),
            referencia: this.equipo.referencia,
            area: this.equipo.area,
            serial: this.equipo.serial,
            marca: this.equipo.marca,
            software: this.equipo.software,
            observaciones: this.equipo.observaciones,
            fecha_compra: new Date(this.equipo.fecha_compra),
            fecha_calibracion: new Date(this.equipo.fecha_calibracion),
            fecha_calificacion: new Date(this.equipo.fecha_calificacion),
            fecha_metrologia: new Date(this.equipo.fecha_metrologia),
            fecha_mantenimiento_preventivo: new Date(this.equipo.fecha_mantenimiento_preventivo),
            fecha_mantenimiento_correctivo: new Date(this.equipo.fecha_mantenimiento_correctivo),
            fecha_proxima_compra: new Date(this.equipo.fecha_proxima_compra),
            fecha_proxima_calibracion: new Date(this.equipo.fecha_proxima_calibracion),
            fecha_proxima_calificacion: new Date(this.equipo.fecha_proxima_calificacion),
            fecha_proxima_metrologia: new Date(this.equipo.fecha_mantenimiento_preventivo),
            fecha_proximo_mantenimiento_preventivo: new Date(this.equipo.fecha_proximo_mantenimiento_preventivo),
            fecha_proximo_mantenimiento_correctivo: new Date (this.equipo.fecha_proximo_mantenimiento_correctivo),
            id_proveedor1: this.proveedor.find(item => item.id == equipo.id_proveedor1),
            id_proveedor2: this.proveedor.find(item => item.id == equipo.id_proveedor2),
        });
        setTimeout(() => {
            this.formEquipoDetalle.disable();
        }, 1);
    }

    onSubmit() {
        const newEquipo: EquipoModel =
            {
                id: this.formEquipoDetalle.value.id,
                nombre: this.formEquipoDetalle.value.nombre,
                grupo: this.formEquipoDetalle.value.grupo.value,
                referencia: this.formEquipoDetalle.value.referencia,
                area: this.formEquipoDetalle.value.area,
                serial: this.formEquipoDetalle.value.serial,
                marca: this.formEquipoDetalle.value.marca,
                software: this.formEquipoDetalle.value.software,
                observaciones: this.formEquipoDetalle.value.observaciones,
                fecha_compra: this.formEquipoDetalle.value.fecha_compra.valueOf(),
                fecha_calibracion: this.formEquipoDetalle.value.fecha_calibracion.valueOf(),
                fecha_calificacion: this.formEquipoDetalle.value.fecha_calificacion.valueOf(),
                fecha_metrologia: this.formEquipoDetalle.value.fecha_metrologia.valueOf(),
                fecha_mantenimiento_preventivo: this.formEquipoDetalle.value.fecha_mantenimiento_preventivo.valueOf(),
                fecha_mantenimiento_correctivo: this.formEquipoDetalle.value.fecha_mantenimiento_correctivo.valueOf(),
                fecha_proxima_compra: this.formEquipoDetalle.value.fecha_proxima_compra.valueOf(),
                fecha_proxima_calibracion: this.formEquipoDetalle.value.fecha_proxima_calibracion.valueOf(),
                fecha_proxima_calificacion: this.formEquipoDetalle.value.fecha_proxima_calificacion.valueOf(),
                fecha_proxima_metrologia: this.formEquipoDetalle.value.fecha_proxima_metrologia.valueOf(),
                fecha_proximo_mantenimiento_preventivo: this.formEquipoDetalle.value.fecha_mantenimiento_preventivo.valueOf(),
                fecha_proximo_mantenimiento_correctivo: this.formEquipoDetalle.value.fecha_mantenimiento_correctivo.valueOf(),
                id_proveedor1: this.formEquipoDetalle.value.id_proveedor1.id,
                id_proveedor2: this.formEquipoDetalle.value.id_proveedor2.id,
            }
        this.onUpdateEquipo.emit(newEquipo);
    }

}