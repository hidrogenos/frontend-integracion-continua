import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CapacitacionAsistenteInternoModel } from "../../../../shared/models/capacitacion-asistente-interno.model";
import { UsuarioModel } from "../../../../shared/models/usuario.model";
import * as fromShared from "./../../../../shared/store";
import { Store } from "@ngrx/store";
import { StoreModel } from "../../../../shared/models/store.model";

@Component({
    selector: "asistentes-internos-component",
    template: `

    <div class="ui-g">
    <div class="ui-g-12">
        <div class="card card-w-title">
            <h1><i class="fa fa-user" aria-hidden="true"></i> Asistentes internos</h1>
        <div class="ui-g">
            <div class="ui-g-12 text-aling-right">
                </div>
                <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
                <div class="ui-g ui-fluid">
                    <div class="ui-g-4">
                   
                        <div>
                            <label>Asistente:</label>
                        </div>
                        <p-multiSelect 
                            [options]="asistenteInterno"
                            appendTo="body"
                            [panelStyle]="{minWidth:'12em'}"
                            formControlName="asistentes_internos"
                            optionLabel="nombre"
                            defaultLabel="Seleccione múltiples...">
                         </p-multiSelect>
                    </div>
                    
                    <div class="ui-g-4">
                    <button pButton *ngIf="!disable" type="submit"  [disabled]="!form.valid"  icon="pi pi-plus"></button>
                </div>
                </div>
                <p-table [value]="loadedInterno" [paginator]="true" [rows]="10">
                                <ng-template pTemplate="header" let-columns>
                                    <tr>
                                        <th>
                                            Asistente
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
                                        <button pButton *ngIf="!disable" type="button" icon="pi pi-pencil" (click)="showEdit(asistenteActual)" ></button>
                                            <button pButton *ngIf="!disable" style="margin-left: 10px" type="button" icon="pi pi-trash" (click)="onDelete(asistenteActual)" class="ui-button-danger"></button>
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
export class CapacitacionAsistentesInternosComponent implements OnInit {
    constructor(private fb: FormBuilder, private store: Store<StoreModel>) {}
    //atributos
    form: FormGroup;
    disable: boolean;

    //properties
    @Output()
    createAI = new EventEmitter<CapacitacionAsistenteInternoModel[]>();

    @Output()
    editAI = new EventEmitter<CapacitacionAsistenteInternoModel>();

    @Output()
    deleteAI = new EventEmitter<number>();

    @Input()
    asistenteInterno: UsuarioModel[];

    @Input()
    loadedInterno: CapacitacionAsistenteInternoModel[];

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            asistentes_internos: [null, Validators.required]
        });
    }

    onSubmit() {
        this.showWaitDialog("Creando un asistente, un momento por favor...");

        const asistentesInternos: CapacitacionAsistenteInternoModel[] = this
            .form.value.asistentes_internos;
        this.createAI.emit(asistentesInternos);
        this.hideWaitDialog();
    }
    showEdit(asistenteInterno: CapacitacionAsistenteInternoModel) {
        this.editAI.emit(asistenteInterno);
    }

    onDelete(asistenteInterno: CapacitacionAsistenteInternoModel) {
        this.deleteAI.emit(asistenteInterno.id);
    }

    filtrarUsuariosInternos(
        asistentesLoaded: CapacitacionAsistenteInternoModel[]
    ): UsuarioModel[] {
        this.form.setValue({ asistentes_internos: [] });

        if (this.asistenteInterno) {
            this.asistenteInterno = [
                ...this.asistenteInterno.filter(element => {
                    const usuarioBuscado = asistentesLoaded.find(
                        ele2 => ele2.usuario.id == element.id
                    );
                    if (!usuarioBuscado) {
                        return element;
                    }
                })
            ];
            return this.asistenteInterno;
        }
    }
    disableComponent() {
        this.form.disable();
        this.disable = true;
    }

    showWaitDialog(header: string, body?: string) {
        this.store.dispatch(new fromShared.ShowWaitDialog({ header, body }));
    }

    hideWaitDialog() {
        this.store.dispatch(new fromShared.HideWaitDialog());
    }
}
