import { Component, ViewChild } from "@angular/core";
import { DataTable } from "primeng/primeng";
import { HasPermisionService, CajaCompensacionService } from "../../../shared/services";
import { EditCajaCompensacionDialogComponent } from "../../components";
import { CajaCompensacionModel } from "../../../shared/models/caja-compensacion.model";


//Store
import { Store } from "@ngrx/store";
import { StoreModel } from "../../../shared/models/store.model";
import * as fromShared from './../../../shared/store';
import { AdmCajaCompensacionSevice } from "../../services";

@Component({
    selector: 'caja-compensacion-component',
    styleUrls: ['caja-compensacion.component.scss'],
    template:`

        <div class="ui-g">
            <div class="ui-g-12">
                <div class="card card-w-title">
                    <h1><i class="fa fa-briefcase" aria-hidden="true"></i> Caja de compensación</h1>
                    <div class="ui-g">
                        <div class="ui-g-12 text-aling-right">
                            <button pButton 
                                *ngIf="hasPermision(1340) | async"
                                (click)="cccdc.show()"
                                type="button" 
                                label="Crear nueva caja de compensación" 
                                class="ui-button-success">
                            </button>
                        </div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-12 ui-fluid">
                            <p-table [value]="cajaCompensacion" [lazy]="true" (onLazyLoad)="loadCajasCompensacionLazy($event)" [paginator]="true" 
                            [rows]="10" [totalRecords]="totalRecords" [loading]="loading" sortField="nombre" #dt>
                                <ng-template pTemplate="header" let-columns>
                                    <tr>
                                        <th pSortableColumn="nombre">
                                            Nombre
                                            <p-sortIcon field="nombre" ></p-sortIcon>
                                        </th>
                                        <th>
                                            Acciones
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>
                                            <input pInputText type="text" (input)="dt.filter($event.target.value, 'nombre', 'contains')">
                                        </th>
                                        <th>
                                        </th>
                                    </tr>
                                </ng-template>
                                <ng-template pTemplate="body" let-cajaCompensacion>
                                    <tr>
                                        <td>{{ cajaCompensacion.nombre }}</td>
                                        <td style="text-align: center;">
                                            <button style="margin-right: 10px;" pButton
                                                (click)="onEditCajaCompensacion(cajaCompensacion)"
                                                type="button" 
                                                icon="pi pi-pencil" class="ui-button-primary">
                                             </button>
                                            <button pButton 
                                                type="button"
                                                icon="pi pi-trash" 
                                                (click)="deleteCajaCompensacion(cajaCompensacion)"
                                                class="ui-button-danger">
                                             </button>
                                        </td>
                                    </tr>
                                </ng-template>
                            </p-table>
                        </div>
                    </div>
                </div>
                <create-caja-compensacion-dialog #cccdc
                    (create)="onCreate($event)">
                </create-caja-compensacion-dialog>
                <edit-caja-conpensacion-dialog #eccdc
                    (edit)="onEdit($event)">
                </edit-caja-conpensacion-dialog>
            </div>
        </div>
    `
})

export class CajaCompensacionComponent{

     //atributos
    cajaCompensacion: CajaCompensacionModel[];
    totalRecords: number;
    loading: boolean = true;

    //properties
    constructor(
        private admCajaCompensacionService: AdmCajaCompensacionSevice,
        private cajaCompensacionService: CajaCompensacionService,
        private hasPermisionService: HasPermisionService,
        private store: Store<StoreModel>,
    ){}

    //viewchield
    @ViewChild('dt') dt: DataTable;
    @ViewChild('eccdc') eccdc: EditCajaCompensacionDialogComponent;

    loadCajasCompensacionLazy(event){
        this.showWaitDialog('Consultando datos, un momento por favor...')
        this.loading = true;
        this.admCajaCompensacionService.getCajasCompensacionLazy(event).subscribe(response => {
            this.cajaCompensacion = response.data;
            this.totalRecords = response.totalRows;
            this.loading = false;
            this.hideWaitDialog();

        })
    }

    deleteCajaCompensacion(event: CajaCompensacionModel) {
        this.showWaitDialog('Eliminando caja de compensación, un momento por favor...')
        this.admCajaCompensacionService
            .onEliminar(event)
            .subscribe((data: CajaCompensacionModel) => {
                this.cajaCompensacion = this.cajaCompensacion.filter(
                    (cajaCompensacion: CajaCompensacionModel) => {
                        return cajaCompensacion.id != event.id;
                    }
                );
                this.hideWaitDialog();
            });
            
    }

    hideWaitDialog() {
        this.store.dispatch(new fromShared.HideWaitDialog());
    }

    hasPermision(id: number){
        return this.hasPermisionService.hasPermision(id);
    }

    onCreate($event) {
        console.log($event)
        this.showWaitDialog('Creando caja de compensación, un momento por favor...')
        this.cajaCompensacionService.createCajaCompensacion($event).subscribe(response => {
            this.cajaCompensacion = [
                ...this.cajaCompensacion,
                 response
                ];
                this.hideWaitDialog();
        });
    }

    onEdit(event: CajaCompensacionModel){ 
        console.log(event.id)
        this.showWaitDialog('Editando caja de compensación, un momento por favor...')
        this.admCajaCompensacionService.editCajaCompensacion(event.id, event).subscribe(response => {
            return this.cajaCompensacion = this.cajaCompensacion.map(element => {
                this.hideWaitDialog();
                return element.id == response.id ? response : element;
            });
        }); 
    }

    showWaitDialog(header: string, body?: string) {
        this.store.dispatch(new fromShared.ShowWaitDialog({ header, body }));
    }

    onEditCajaCompensacion(event: CajaCompensacionModel){
        this.eccdc.show(event);
    }
}
