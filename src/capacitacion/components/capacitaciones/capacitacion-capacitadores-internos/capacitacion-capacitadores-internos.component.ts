import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioModel } from '../../../../shared/models/usuario.model';
import { CapacitacionCapacitadorInternoModel } from '../../../../shared/models/capacitacion-capacitador-interno.model';

@Component({
    selector: 'capacitadores-internos-component',
    template: `

    <div class="ui-g">
    <div class="ui-g-12">
        <div class="card card-w-title">
            <h1><i class="fa fa-user" aria-hidden="true"></i> Capacitadores internos</h1>
        <div class="ui-g">
            <div class="ui-g-12 text-aling-right">
                </div>
                <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
                <div class="ui-g ui-fluid">
                    <div class="ui-g-4">
                   
                        <div>
                            <label>Capacitador:</label>
                        </div>
                        <p-multiSelect 
                        [options]="capacitadorInterno"
                        appendTo="body"
                        [panelStyle]="{minWidth:'12em'}"
                        formControlName="capacitadores_internos"
                        optionLabel="nombre"
                        defaultLabel="Seleccione múltiples...">
                    </p-multiSelect>
                    </div>
                    
                    <div class="ui-g-4">
                    <button pButton *ngIf="permisoCreateCI" type="submit"  [disabled]="!form.valid"  icon="pi pi-plus"></button>
                </div>
                </div>
                <p-table [value]="loadedInterno" [paginator]="true" [rows]="10">
                                <ng-template pTemplate="header" let-columns>
                                    <tr>
                                        <th>
                                            Capacitadores
                                        </th>
                                        <th>
                                        Calificacion
                                        </th>
                                        <th>
                                        Acciones
                                        </th>
                                    </tr>
                                </ng-template>
                                <ng-template pTemplate="body" let-asistenteActual>
                                    <tr>
                                        <td>{{asistenteActual?.usuario.nombre}} </td>
                                        <td>{{asistenteActual?.calificacion}}</td>
                                        <td style="text-align: center;">
                                        <button pButton *ngIf="permisoEditCI" type="button" icon="pi pi-pencil" (click)="showEdit(asistenteActual)" ></button>
                                        <button pButton *ngIf="permisoDeleteCI" style="margin-left: 10px" type="button" icon="pi pi-trash" (click)="onDelete(asistenteActual)" class="ui-button-danger"></button>
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
export class CapacitacioncapacitadoresInternosComponent implements OnInit {
    constructor(private fb: FormBuilder) {}
    //atributos
    form: FormGroup;

    //properties
    @Output()
    createCI = new EventEmitter<CapacitacionCapacitadorInternoModel[]>();

    @Output()
    editCI = new EventEmitter<CapacitacionCapacitadorInternoModel>();

    @Output()
    deleteCI = new EventEmitter<number>();

    @Input()
    capacitadorInterno: UsuarioModel[];

    @Input()
    loadedInterno: CapacitacionCapacitadorInternoModel[];

    @Input()
    permisoCreateCI: boolean;

    @Input()
    permisoEditCI: boolean;

    @Input()
    permisoDeleteCI: boolean;

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            capacitadores_internos: [null, Validators.required]
        });
    }

    onSubmit() {
        const capacitadores_internos: CapacitacionCapacitadorInternoModel[] = this
            .form.value.capacitadores_internos;
        this.createCI.emit(capacitadores_internos);
    }
    showEdit(asistenteInterno: CapacitacionCapacitadorInternoModel) {
        this.editCI.emit(asistenteInterno);
    }

    onDelete(asistenteInterno: CapacitacionCapacitadorInternoModel) {
        this.deleteCI.emit(asistenteInterno.id);
    }

    filtrarUsuariosInternos(
        capacitadoresLoaded: CapacitacionCapacitadorInternoModel[]
    ): UsuarioModel[] {
        this.form.setValue({ capacitadores_internos: [] });

        if (this.capacitadorInterno) {
            this.capacitadorInterno = [
                ...this.capacitadorInterno.filter(element => {
                    const usuarioBuscado = capacitadoresLoaded.find(
                        ele2 => ele2.usuario.id == element.id
                    );
                    if (!usuarioBuscado) {
                        return element;
                    }
                })
            ];
            return this.capacitadorInterno;
        }
    }
}
