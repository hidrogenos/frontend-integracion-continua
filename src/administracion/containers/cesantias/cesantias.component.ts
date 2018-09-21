
import { Component, ViewChild } from "@angular/core";
import { AdmEpsService } from "../../services/adm-eps/adm-eps.service";
import { EpsModel } from "../../../shared/models/eps.model";
import { DataTable } from "primeng/primeng";
import { EpsService, HasPermisionService, PensionService, CesantiaService } from "../../../shared/services";
import { EditEpsDialogComponent, EditPensionDialogComponent } from "../../components";

//Store
import { Store } from "@ngrx/store";
import { StoreModel } from "../../../shared/models/store.model";
import * as fromShared from './../../../shared/store';
import { PensionModel } from "../../../shared/models/pension.model";
import { AdmPensionService, AdmCesantiaService } from "../../services";
import { CesantiaModel } from "../../../shared/models/cesantia.model";

@Component({
    selector:'cesantias-component',
    styleUrls: ['cesantias.component.scss'],
    template: `

        <div class="ui-g">
            <div class="ui-g-12">
                <div class="card card-w-title">
                    <h1><i class="fa fa-institution" aria-hidden="true"></i> Cesantías</h1>
                    <div class="ui-g">
                        <div class="ui-g-12 text-aling-right">
                            <button pButton 
                                *ngIf="hasPermision(1330) | async"
                                (click)="ccdc.show()"
                                type="button" 
                                label="Crear nueva cesantía" 
                                class="ui-button-success">
                            </button>
                        </div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-12 ui-fluid">
                            <p-table [value]="cesantia" [lazy]="true" (onLazyLoad)="loadCesantiasLazy($event)" [paginator]="true" 
                            [rows]="10" [totalRecords]="totalRecords" [loading]="loading" sortField="nombre" #dt>
                                <ng-template pTemplate="header" let-columns>
                                    <tr>
                                        <th pSortableColumn="nombre">
                                            Nombre
                                            <p-sortIcon field="nombre" ></p-sortIcon>
                                        </th>
                                        <th rowspan="2">
                                            Acciones
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>
                                            <input pInputText type="text" (input)="dt.filter($event.target.value, 'nombre', 'contains')">
                                        </th>
                                    </tr>
                                </ng-template>
                                <ng-template pTemplate="body" let-cesantia>
                                    <tr>
                                        <td>{{ cesantia.nombre }}</td>
                                        <td style="text-align: center;">
                                            <button style="margin-right: 10px;" pButton
                                                *ngIf="hasPermision(1332) | async"
                                                (click)="onEditCesantia(cesantia)"
                                                type="button" 
                                                icon="pi pi-pencil" class="ui-button-primary">
                                             </button>
                                            <button pButton 
                                                *ngIf="hasPermision(1331) | async"
                                                type="button"
                                                icon="pi pi-trash" 
                                                (click)="deleteCesantia(cesantia)"
                                                class="ui-button-danger">
                                             </button>
                                        </td>
                                    </tr>
                                </ng-template>
                            </p-table>
                        </div>
                    </div>
                </div>
                <create-cesantia-dialog #ccdc
                     (create)="onCreate($event)">
                </create-cesantia-dialog>
                <edit-cesantia-dialog #ecdc
                     (edit)="onEdit($event)">
                </edit-cesantia-dialog>
            </div>
        </div>
    
    `
})

export class CesantiasComponent{

    //atributos
    cesantia: CesantiaModel[];
    totalRecords: number;
    loading: boolean = true;

    //properties
    constructor(
        private hasPermisionService: HasPermisionService,
        private store: Store<StoreModel>,
        private admCesantiaService: AdmCesantiaService,
        private cesantiaService: CesantiaService
    ){}

    //viewchield
    @ViewChild('dt') dt: DataTable;
    @ViewChild('ecdc') ecdc: EditPensionDialogComponent;

    loadCesantiasLazy(event){
        this.showWaitDialog('Consultando datos, un momento por favor...')
        this.loading = true;
        this.admCesantiaService.getCesantiasLazy(event).subscribe(response => {
            this.cesantia = response.data;
            this.totalRecords = response.totalRows;
            this.loading = false;
            this.hideWaitDialog();

        })
    }

    deleteCesantia(event: PensionModel) {
        this.showWaitDialog('Eliminando cesantía, un momento por favor...')
        this.admCesantiaService
            .onEliminar(event)
            .subscribe((data: PensionModel) => {
                this.cesantia = this.cesantia.filter(
                    (cesantia: CesantiaModel) => {
                        return cesantia.id != event.id;
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
        this.showWaitDialog('Creando cesantía, un momento por favor...')
        this.cesantiaService.createCesantia($event).subscribe(response => {
            this.cesantia = [
                ...this.cesantia,
                 response
                ];
                this.hideWaitDialog();
        });
    }

    onEdit(event: PensionModel){ 
        console.log(event.id)
        this.showWaitDialog('Editando cesantía, un momento por favor...')
        this.admCesantiaService.editCesantias(event.id, event).subscribe(response => {
            return this.cesantia = this.cesantia.map(element => {
                this.hideWaitDialog();
                return element.id == response.id ? response : element;
            });
        }); 
    }

    showWaitDialog(header: string, body?: string) {
        this.store.dispatch(new fromShared.ShowWaitDialog({ header, body }));
    }

    onEditCesantia(event: PensionModel){
        this.ecdc.show(event);
    }
}

