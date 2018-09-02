import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CapacitacionCapacitadorExternoModel } from '../../../../shared/models/capacitacion-capacitador-externo.model';

@Component({
    selector: 'capacitadores-externos-component',
    template: `

    <div class="ui-g">
    <div class="ui-g-12">
        <div class="card card-w-title">
            <h1><i class="fa fa-user" aria-hidden="true"></i> Capacitadores externos</h1>
        <div class="ui-g">
            <div class="ui-g-12 text-aling-right">
                </div>
                <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
                <div class="ui-g ui-fluid">
                    <div class="ui-g-4">
                   
                        <div>
                            <label>Capacitador:</label>
                        </div>
                            <input type="text" pInputText formControlName="nombre_capacitador" />
                    </div>
                    <div class="ui-g-4">
                            <div>
                                <label>Identificacion:</label>
                             </div>
                            <input type="number" pInputText formControlName="identificacion_capacitador" />
                    </div>
                    <div class="ui-g-4">
                    <button pButton *ngIf="permisoCreateCE" type="submit"  [disabled]="!form.valid"  icon="pi pi-plus"></button>
                </div>
                </div>
                <p-table [value]="capacitadoresExternos" [paginator]="true" [rows]="10">
                                <ng-template pTemplate="header" let-columns>
                                    <tr>
                                        <th>
                                         Capacitador
                                        </th>
                                        <th>
                                         Identificación
                                        </th>
                                        <th>
                                        Calificacion
                                        </th>
                                        <th>
                                        Acciones
                                        </th>
                                    </tr>
                                </ng-template>
                                <ng-template pTemplate="body" let-capacitadoresExternos>
                                    <tr>
                                        <td>{{capacitadoresExternos?.nombre_capacitador}}</td>
                                        <td>{{capacitadoresExternos?.identificacion_capacitador}}</td>
                                        <td>{{capacitadoresExternos?.calificacion}}</td>
                                        <td style="text-align: center;">
                                        <button pButton type="button" *ngIf="permisoEditCE" icon="pi pi-pencil" (click)="showEdit(capacitadoresExternos)" ></button>
                                         <button style="margin-left: 10px"*ngIf="permisoDeleteCE" pButton type="button" icon="pi pi-trash" (click)="onDelete(capacitadoresExternos)" class="ui-button-danger"></button>
                                        </td>
                                    </tr>
                                </ng-template>
                            </p-table>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    `
})
export class CapacitacionCapacitadoresExternosComponent implements OnInit {
    constructor(private fb: FormBuilder) {}
    //atributos
    form: FormGroup;

    //properties
    @Output()
    createCE = new EventEmitter<CapacitacionCapacitadorExternoModel>();

    @Output()
    editCE = new EventEmitter<CapacitacionCapacitadorExternoModel>();

    @Output()
    deleteCE = new EventEmitter<CapacitacionCapacitadorExternoModel>();

    @Input()
    capacitadoresExternos: CapacitacionCapacitadorExternoModel;

    @Input()
    permisoCreateCE: boolean;

    @Input()
    permisoEditCE: boolean;

    @Input()
    permisoDeleteCE: boolean;

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            id: [''],
            nombre_capacitador: ['', Validators.required],
            identificacion_capacitador: ['', Validators.required],
            fecha: [new Date()]
        });
    }

    onSubmit() {
        const NewCapacitador: CapacitacionCapacitadorExternoModel = {
            nombre_capacitador: this.form.value.nombre_capacitador,
            identificacion_capacitador: this.form.value
                .identificacion_capacitador,
            fecha: (this.form.value.fecha as Date).valueOf()
        };
        this.createCE.emit(NewCapacitador);
    }
    showEdit(capacitadorExterno: CapacitacionCapacitadorExternoModel) {
        this.editCE.emit(capacitadorExterno);
    }

    onDelete(capacitadorExterno: CapacitacionCapacitadorExternoModel) {
        this.deleteCE.emit(capacitadorExterno);
    }
}
