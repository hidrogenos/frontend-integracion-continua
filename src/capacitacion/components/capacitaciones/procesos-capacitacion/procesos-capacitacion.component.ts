import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CapacitacionModel } from "../../../../shared/models/capacitacion.model";
import { MapaProcesoHijoModel } from "../../../../shared/models/mapa_proceso_hijo.model";
import * as fromShared from "./../../../../shared/store";

import { Store } from "@ngrx/store";
import { StoreModel } from "../../../../shared/models/store.model";

@Component({
    selector: "procesos-capacitacion-component",
    styleUrls: ["procesos-capacitacion.component.scss"],
    template: ` 
    
    <div class="ui-g">
    <div class="ui-g-12">
        <div class="card card-w-title">
            <h1><i class="fa fa-user" aria-hidden="true"></i> Procesos</h1>
        <div class="ui-g">
            <div class="ui-g-12 text-aling-right">
                </div>
                <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
                <div class="ui-g ui-fluid">
                    <div class="ui-g-10">
                        <p-dropdown  
                            [options]="procesos" 
                            formControlName="proceso" 
                            optionLabel="proceso" 
                            placeholder="Seleccione un proceso"
                            [autoWidth]="false"
                            appendTo="body">  
                        </p-dropdown>
                    </div>
                    <div class="ui-g-2 text-aling-right">
                    <button pButton type="submit"  [disabled]="!form.valid" *ngIf="permisoAdd && !disable" label="Adjuntar proceso" class="ui-button"></button>
                    </div>
                </div>
                <p-table [value]="procesosAsociados" [paginator]="true" [rows]="10">
                                <ng-template pTemplate="header" let-columns>
                                    <tr>
                                        <th>
                                            Titulo
                                        </th>
                                        <th>
                                        Acciones
                                        </th>
                                    </tr>
                                </ng-template>
                                <ng-template pTemplate="body" let-proceso>
                                    <tr>
                                        <td>{{proceso.proceso}}</td>
                                        
                                        <td style="text-align: center;">
                                            <button pButton type="button" icon="pi pi-trash" *ngIf="permisoDelete && !disable" (click)="onDeleteProceso(proceso)" class="ui-button-danger"></button>
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
export class ProcesosCapacitacionComponent implements OnInit {
    //atributos
    form: FormGroup;
    disable: boolean;

    @Input()
    loadedCapacitaciones: CapacitacionModel;
    @Input()
    procesos: MapaProcesoHijoModel[];
    @Input()
    procesosAsociados: MapaProcesoHijoModel[];

    @Output()
    deleteProceso = new EventEmitter<number>();

    @Output()
    addProceso = new EventEmitter<MapaProcesoHijoModel>();

    @Input()
    permisoAdd: boolean;

    @Input()
    permisoDelete: boolean;

    constructor(private fb: FormBuilder, private store: Store<StoreModel>) {}
    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            proceso: ["", Validators.required]
        });
    }
    onSubmit() {
        this.showWaitDialog("Creando un proceso un momento por favor...");
        this.addProceso.emit(this.form.value.proceso);
        this.hideWaitDialog();
    }

    onDeleteProceso(proceso) {
        this.deleteProceso.emit(proceso.pivot.id);
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
