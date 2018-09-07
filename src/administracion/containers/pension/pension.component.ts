import { Component, ViewChild } from "@angular/core";
import { DataTable } from "primeng/primeng";
import { HasPermisionService, PensionService } from "../../../shared/services";
import { EditPensionDialogComponent } from "../../components";
import { PensionModel } from "../../../shared/models/pension.model";
import { AdmPensionService } from "../../services";

//Store
import { Store } from "@ngrx/store";
import { StoreModel } from "../../../shared/models/store.model";
import * as fromShared from './../../../shared/store';

@Component({
    selector: 'pension-component',
    styleUrls:['pension.component.scss'],
    template:`
        <div class="ui-g">
            <div class="ui-g-12">
                <div class="card card-w-title">
                    <h1><i class="fa fa-institution" aria-hidden="true"></i> Pensión</h1>
                    <div class="ui-g">
                        <div class="ui-g-12 text-aling-right">
                            <button pButton 
                                *ngIf="hasPermision(1320) | async"
                                (click)="cpdc.show()"
                                type="button" 
                                label="Crear nueva pensión" 
                                class="ui-button-success">
                            </button>
                        </div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-12 ui-fluid">
                            <p-table [value]="pension" [lazy]="true" (onLazyLoad)="loadPensionesLazy($event)" [paginator]="true" 
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
                                <ng-template pTemplate="body" let-pension>
                                    <tr>
                                        <td>{{ pension.nombre }}</td>
                                        <td style="text-align: center;">
                                            <button style="margin-right: 10px;" pButton
                                                *ngIf="hasPermision(1322) | async"
                                                (click)="onEditPension(pension)"
                                                type="button" 
                                                icon="pi pi-pencil" class="ui-button-primary">
                                             </button>
                                            <button pButton 
                                                *ngIf="hasPermision(1321) | async"
                                                type="button"
                                                icon="pi pi-trash" 
                                                (click)="deletePension(pension)"
                                                class="ui-button-danger">
                                             </button>
                                        </td>
                                    </tr>
                                </ng-template>
                            </p-table>
                        </div>
                    </div>
                </div>
                <create-pension-dialog #cpdc
                     (create)="onCreate($event)">
                </create-pension-dialog>
                <edit-pension-dialog #epdc
                     (edit)="onEdit($event)">
                </edit-pension-dialog>
            </div>
        </div>
    
    
    `
})
export class PensionComponent {

    //atributos
    pension: PensionModel[];
    totalRecords: number;
    loading: boolean = true;

    //properties
    constructor(
        private admPensionService: AdmPensionService,
        private pensionService: PensionService,
        private hasPermisionService: HasPermisionService,
        private store: Store<StoreModel>,
    ){}

    //viewchield
    @ViewChild('dt') dt: DataTable;
    @ViewChild('epdc') epdc: EditPensionDialogComponent;

    loadPensionesLazy(event){
        this.showWaitDialog('Consultando datos, un momento por favor...')
        this.loading = true;
        this.admPensionService.getPensionesLazy(event).subscribe(response => {
            this.pension = response.data;
            this.totalRecords = response.totalRows;
            this.loading = false;
            this.hideWaitDialog();

        })
    }

    deletePension(event: PensionModel) {
        this.showWaitDialog('Eliminando pensión, un momento por favor...')
        this.admPensionService
            .onEliminar(event)
            .subscribe((data: PensionModel) => {
                this.pension = this.pension.filter(
                    (pension: PensionModel) => {
                        return pension.id != event.id;
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
        this.showWaitDialog('Creando pensión, un momento por favor...')
        this.pensionService.createPension($event).subscribe(response => {
            this.pension = [
                ...this.pension,
                 response
                ];
                this.hideWaitDialog();
        });
    }

    onEdit(event: PensionModel){ 
        console.log(event.id)
        this.showWaitDialog('Editando pensión, un momento por favor...')
        this.admPensionService.editPension(event.id, event).subscribe(response => {
            return this.pension = this.pension.map(element => {
                this.hideWaitDialog();
                return element.id == response.id ? response : element;
            });
        }); 
    }

    showWaitDialog(header: string, body?: string) {
        this.store.dispatch(new fromShared.ShowWaitDialog({ header, body }));
    }

    onEditPension(event: PensionModel){
        this.epdc.show(event);
    }
}