import { Component, ViewChild } from "@angular/core";
import { AdmArlService } from "../../services/adm-arl/adm-arl.service";
import { ArlModel } from "../../../shared/models/arl.model";
import { ArlService, HasPermisionService } from "../../../shared/services";
import { DataTable } from "primeng/primeng";
import { EditArlDialogComponent } from "../../components";

//store
import { Store } from "@ngrx/store";
import { StoreModel } from "../../../shared/models/store.model";
import * as fromShared from './../../../shared/store';


@Component({
    selector: 'arl-component',
    styleUrls: ['arl.component.scss'],
    template: `

    <div class="ui-g">
    <div class="ui-g-12">
        <div class="card card-w-title">
            <h1><i class="fa fa-building" aria-hidden="true"></i> Arl</h1>
            <div class="ui-g">
                <div class="ui-g-12 text-aling-right">
                    <button pButton 
                        *ngIf="hasPermision(1310) | async"
                        (click)="cadc.show()"
                        type="button" 
                        label="Crear nueva arl" 
                        class="ui-button-success">
                    </button>
                </div>
            </div>
            <div class="ui-g">
                <div class="ui-g-12 ui-fluid">
                    <p-table [value]="arl" [lazy]="true" (onLazyLoad)="loadArlLazy($event)" [paginator]="true" 
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
                        <ng-template pTemplate="body" let-arl>
                            <tr>
                                <td>{{ arl.nombre }}</td>
                                <td style="text-align: center;">
                                    <button style="margin-right: 10px;" pButton
                                        *ngIf="hasPermision(1312) | async"
                                        (click)="onEditArl(arl)"
                                        type="button" 
                                        icon="pi pi-pencil" class="ui-button-primary">
                                     </button>
                                    <button pButton 
                                        *ngIf="hasPermision(1311) | async"
                                        type="button"
                                        icon="pi pi-trash" 
                                        (click)="deleteArl(arl)"
                                        class="ui-button-danger">
                                     </button>
                                </td>
                            </tr>
                        </ng-template>
                    </p-table>
                </div>
            </div>
        </div>
        <create-arl-dialog #cadc
             (create)="onCreate($event)">
        </create-arl-dialog>
        <edit-arl-dialog #eadc
             (edit)="onEdit($event)">
        </edit-arl-dialog>
    </div>
</div>
    `
})


export class ArlComponent{

    arl: ArlModel[];
    totalRecords: number;
    loading: boolean = true;

    //viewchield
    @ViewChild('dt') dt: DataTable;
    @ViewChild('eadc') eadc: EditArlDialogComponent;

    constructor(
        private admArlService: AdmArlService,
        private store: Store<StoreModel>,
        private arlService: ArlService,
        private hasPermisionService: HasPermisionService
    ){}

    deleteArl(event: ArlModel){
        this.showWaitDialog('Eliminando arl, un momento por favor...')
        this.admArlService.onEliminar(event).subscribe((data: ArlModel) =>{
            this.arl = this.arl.filter((arl: ArlModel) => {
                return arl.id != event.id
            })
            this.hideWaitDialog();
        })
    }

    hideWaitDialog() {
        this.store.dispatch(new fromShared.HideWaitDialog());
    }

    hasPermision(id: number){
        return this.hasPermisionService.hasPermision(id);
    }

    loadArlLazy(event){
        this.showWaitDialog('Consultando datos, un momento por favor...');
        this.loading = true;
        this.admArlService.getArlLazy(event).subscribe(response => {
            this.arl = response.data;
            this.totalRecords = response.totalRows;
            this.loading = false;
            this.hideWaitDialog();
        })
    }
    
    onEdit(event: ArlModel){ 
        console.log(event.id)
        this.showWaitDialog('Editando arl, un momento por favor...')
        this.admArlService.editArl(event.id, event).subscribe(response => {
            return this.arl = this.arl.map(element => {
                this.hideWaitDialog();
                return element.id == response.id ? response : element;
            });
        }); 
    }

    onCreate($event){
        console.log($event)
        this.showWaitDialog('Creando arl, un momento por favor...');
        this.arlService.createArl($event).subscribe(response => {
            this.arl =[
                ...this.arl,
                response
            ];
            this.hideWaitDialog();  
        })
    }

    onEditArl(event: ArlModel){
        this.eadc.show(event);
    }

    showWaitDialog(header: string, body?: string) {
        this.store.dispatch(new fromShared.ShowWaitDialog({ header, body }));
    }

}