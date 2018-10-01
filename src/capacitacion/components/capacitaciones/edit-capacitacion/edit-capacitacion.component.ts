import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CapacitacionModel } from "../../../../shared/models/capacitacion.model";
import * as fromShared from "./../../../../shared/store";

import { Store } from "@ngrx/store";
import { StoreModel } from "../../../../shared/models/store.model";
import { MessageService } from "primeng/api";

@Component({
    selector: "edit-capacitacion-component",
    styleUrls: ["edit-capacitacion.component.scss"],
    template: `
    <div class="ui-g">
    <div class="ui-g-12">
        <div class="card card-w-title">
            <h1><i class="fa fa-user" aria-hidden="true"></i> Capacitación: {{ this.capacitaciones?.tema }}</h1>
            <div class="ui-g">
                <div class="ui-g-12">
                <form [formGroup]='form' (ngSubmit)='onSubmit()' novalidate>
                <div class="ui-g">
                    <div class="ui-g-12 ui-fluid">
                        <div>
                            <label> Tema</label>
                        </div>
                        <input type="text" pInputText formControlName="tema"/>
                    </div>
                    <div class="ui-g-12 ui-fluid">
                        <div>
                            <label> Objetivo</label>
                        </div>
                        <input type="text" pInputText formControlName="objetivo"/>
                    </div>
                    <div class="ui-g-6 ui-fluid">
                        <div>
                            <label> Fecha Inicio</label>
                        </div>
                        <p-calendar showIcon="true" formControlName="fecha_inicio" appendTo="body"></p-calendar>
                    </div>
                    <div class="ui-g-6 ui-fluid">
                        <div>
                            <label> Fecha Fin</label>
                        </div>
                        <p-calendar showIcon="true" formControlName="fecha_fin" appendTo="body"></p-calendar>
                    </div>
                    <div class="ui-g-12 ui-fluid">
                        <div>
                            <label> Lugar </label>
                        </div>
                        <input type="text" pInputText formControlName="lugar"/>
                    </div>
                    <div class="ui-g-12 ui-fluid">
                        <div>
                            <label> Observaciones</label>
                        </div>
                        <textarea type="text" [rows]="5" [cols]="30" style="width: 100%;" pInputTextarea formControlName="observaciones"></textarea>
                    </div>
                </div>
                <div class="ui-g">
                <div class="ui-g-12 text-aling-right">
                    <button style="margin-right:10px;" *ngIf="form.disabled && permisoEdicion && !disable" pButton type="button" label="Editar datos" (click)="form.enable()" class="ui-button-success"></button>
                    <button style="margin-right:10px;" *ngIf="form.enabled" pButton type="button" label="Descartar cambios" (click)="loadForm(capacitaciones)" class="ui-button-danger"></button>
                    <button style="margin-right:10px;" *ngIf="form.enabled" pButton type="submit" label="Actualizar"  class="ui-button-primary" (click)="messageEdit()"></button>
                    </div>
                </div>
            </form>
            </div>
            </div>
        </div>
    </div>
</div>
    `
})
export class EditCapacitacionComponent implements OnInit {
    //atributos
    form: FormGroup;
    disable: boolean;

    //properties
    @Input()
    capacitaciones: CapacitacionModel;

    @Output()
    edit = new EventEmitter<CapacitacionModel>();

    @Input()
    permisoEdicion: boolean;

    constructor(
        private fb: FormBuilder, private store: Store<StoreModel>,
        private messageService: MessageService

        ) {}
    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            tema: ["", Validators.required],
            objetivo: ["", Validators.required],
            fecha_inicio: [new Date(), Validators.required],
            fecha_fin: [new Date(), Validators.required],
            lugar: ["", Validators.required],
            observaciones: ["", Validators.required],
            id: [""]
        });
    }

    messageEdit() {
        this.messageService.add({severity:'success', summary:'Actualización exitosa', detail:'Datos básicos actualizados'});
    }

    loadForm(capacitaciones: CapacitacionModel) {
        this.capacitaciones = capacitaciones;
        this.form.setValue({
            tema: this.capacitaciones.tema,
            objetivo: this.capacitaciones.objetivo,
            fecha_inicio: new Date(this.capacitaciones.fecha_inicio),
            fecha_fin: new Date(this.capacitaciones.fecha_fin),
            lugar: this.capacitaciones.lugar,
            observaciones: this.capacitaciones.observaciones,
            id: this.capacitaciones.id
        });
        this.form.disable();
    }

    onSubmit() {
        this.showWaitDialog("Editando capacitación un momento por favor...");
        const newCapacitacion: CapacitacionModel = {
            id: this.form.value.id,
            tema: this.form.value.tema,
            objetivo: this.form.value.objetivo,
            fecha_inicio: (this.form.value.fecha_inicio as Date).valueOf(),
            fecha_fin: (this.form.value.fecha_fin as Date).valueOf(),
            lugar: this.form.value.lugar,
            observaciones: this.form.value.observaciones
        };
        this.edit.emit(newCapacitacion);
        this.form.disable();
        this.hideWaitDialog();
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
