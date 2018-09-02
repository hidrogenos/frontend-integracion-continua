import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CapacitacionAsistenteExternoModel } from '../../../../shared/models/capacitacion-asistente-externo.model';

@Component({
    selector: 'asistentes-externos-component',
    styleUrls: ['capacitacion-asistentes-externos.component.scss'],
    template: `

    <div class="ui-g">
    <div class="ui-g-12">
        <div class="card card-w-title">
            <h1><i class="fa fa-user" aria-hidden="true"></i> Asistentes externos</h1>
        <div class="ui-g">
            <div class="ui-g-12 text-aling-right">
                </div>
                <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
                <div class="ui-g ui-fluid">
                    <div class="ui-g-4">
                   
                        <div>
                            <label>Asistente:</label>
                        </div>
                            <input type="text" pInputText formControlName="nombre_asistente" />
                    </div>
                    <div class="ui-g-4">
                            <div>
                                <label>Identificacion:</label>
                             </div>
                            <input type="number" pInputText formControlName="identificacion_asistente" />
                    </div>
                    <div class="ui-g-4">
                    <button pButton *ngIf="permisoCreateAE" type="submit"  [disabled]="!form.valid"  icon="pi pi-plus"></button>
                </div>
                </div>
                <p-table [value]="asistenteExterno" [paginator]="true" [rows]="10">
                                <ng-template pTemplate="header" let-columns>
                                    <tr>
                                        <th>
                                            Asistente
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
                                <ng-template pTemplate="body" let-asistenteExterno>
                                    <tr>
                                        <td>{{asistenteExterno?.nombre_asistente}} </td>
                                        <td>{{asistenteExterno?.identificacion_asistente}} </td>
                                        <td>{{asistenteExterno?.calificacion}}</td>
                                        <td style="text-align: center;">
                                        <button pButton *ngIf="permisoEditAE" type="button" icon="pi pi-pencil" (click)="showEdit(asistenteExterno)" ></button>
                                            <button pButton *ngIf="permisoDeleteAE" style="margin-left: 10px" type="button" icon="pi pi-trash" (click)="onDelete(asistenteExterno)" class="ui-button-danger"></button>
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
export class CapacitacionAsistentesExternosComponent implements OnInit {
    constructor(private fb: FormBuilder) {}
    //atributos
    form: FormGroup;

    //properties
    @Output()
    createAE = new EventEmitter<CapacitacionAsistenteExternoModel>();

    @Output()
    editAE = new EventEmitter<CapacitacionAsistenteExternoModel>();

    @Output()
    deleteAE = new EventEmitter<CapacitacionAsistenteExternoModel>();

    @Input()
    asistenteExterno: CapacitacionAsistenteExternoModel;

    @Input()
    permisoCreateAE: boolean;

    @Input()
    permisoEditAE: boolean;

    @Input()
    permisoDeleteAE: boolean;

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            id: [''],
            nombre_asistente: ['', Validators.required],
            identificacion_asistente: ['', Validators.required],
            fecha: [new Date()]
        });
    }

    onSubmit() {
        const NewAsistente: CapacitacionAsistenteExternoModel = {
            nombre_asistente: this.form.value.nombre_asistente,
            identificacion_asistente: this.form.value.identificacion_asistente,
            fecha: (this.form.value.fecha as Date).valueOf()
        };
        this.createAE.emit(NewAsistente);
    }
    showEdit(asistenteExterno: CapacitacionAsistenteExternoModel) {
        this.editAE.emit(asistenteExterno);
    }

    onDelete(asistenteExterno: CapacitacionAsistenteExternoModel) {
        this.deleteAE.emit(asistenteExterno);
    }
}
