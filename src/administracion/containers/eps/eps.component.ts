import { Component, ViewChild } from "@angular/core";
import { AdmEpsService } from "../../services/adm-eps/adm-eps.service";
import { EpsModel } from "../../../shared/models/eps.model";
import { DataTable } from "primeng/primeng";
import { EpsService, HasPermisionService } from "../../../shared/services";
import { EditEpsDialogComponent } from "../../components";

//Store
import { Store } from "@ngrx/store";
import { StoreModel } from "../../../shared/models/store.model";
import * as fromShared from './../../../shared/store';

@Component({
    selector:'eps-component',
    styleUrls:['eps.component.scss'],
    template:`
        <div class="ui-g">
            <div class="ui-g-12">
                <div class="card card-w-title">
                    <h1><i class="fa fa-heartbeat" aria-hidden="true"></i> Eps</h1>
                    <div class="ui-g">
                        <div class="ui-g-12 text-aling-right">
                            <button pButton 
                                (click)="cedc.show()"
                                *ngIf="hasPermision(1300) | async"
                                type="button" 
                                label="Crear nueva eps" 
                                class="ui-button-success">
                            </button>
                        </div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-12 ui-fluid">
                            <p-table [value]="eps" [lazy]="true" (onLazyLoad)="loadEpsLazy($event)" [paginator]="true" 
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
                                <ng-template pTemplate="body" let-eps>
                                    <tr>
                                        <td>{{ eps.nombre }}</td>
                                        <td style="text-align: center;">
                                            <button style="margin-right: 10px;" pButton
                                                *ngIf="hasPermision(1302) | async"
                                                (click)="onEditEps(eps)"
                                                type="button" 
                                                icon="pi pi-pencil" class="ui-button-primary">
                                             </button>
                                            <button pButton 
                                                *ngIf="hasPermision(1301) | async"
                                                type="button"
                                                icon="pi pi-trash" 
                                                (click)="deleteEps(eps)"
                                                class="ui-button-danger">
                                             </button>
                                        </td>
                                    </tr>
                                </ng-template>
                            </p-table>
                        </div>
                    </div>
                </div>
                <create-eps-dialog #cedc
                     (create)="onCreate($event)">
                </create-eps-dialog>
                <edit-eps-dialog #eedc
                     (edit)="onEdit($event)">
                </edit-eps-dialog>
            </div>
        </div>
    
    
    `
})
export class EpsComponent {

    //atributos
    eps: EpsModel[];
    totalRecords: number;
    loading: boolean = true;

    //properties
    constructor(
        private epsAdmService: AdmEpsService,
        private epsService: EpsService,
        private hasPermisionService: HasPermisionService,
        private store: Store<StoreModel>,
    ){}

    //viewchield
    @ViewChild('dt') dt: DataTable;
    @ViewChild('eedc') eedc: EditEpsDialogComponent;

    loadEpsLazy(event){
        this.showWaitDialog('Consultando datos, un momento por favor...')
        this.loading = true;
        this.epsAdmService.getEpsLazy(event).subscribe(response => {
            this.eps = response.data;
            this.totalRecords = response.totalRows;
            this.loading = false;
            this.hideWaitDialog();

        })
    }

    deleteEps(event: EpsModel) {
        this.showWaitDialog('Eliminando eps, un momento por favor...')
        this.epsAdmService
            .onEliminar(event)
            .subscribe((data: EpsModel) => {
                this.eps = this.eps.filter(
                    (eps: EpsModel) => {
                        return eps.id != event.id;
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
        this.showWaitDialog('Creando eps, un momento por favor...')
        this.epsService.createEps($event).subscribe(response => {
            this.eps = [
                ...this.eps,
                 response
                ];
                this.hideWaitDialog();
        });
    }

    onEdit(event: EpsModel){ 
        console.log(event.id)
        this.showWaitDialog('Editando eps, un momento por favor...')
        this.epsAdmService.editEps(event.id, event).subscribe(response => {
            return this.eps = this.eps.map(element => {
                this.hideWaitDialog();
                return element.id == response.id ? response : element;
            });
        }); 
    }

    showWaitDialog(header: string, body?: string) {
        this.store.dispatch(new fromShared.ShowWaitDialog({ header, body }));
    }

    onEditEps(event: EpsModel){
        this.eedc.show(event);
    }
}