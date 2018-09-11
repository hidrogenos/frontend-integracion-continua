import { Component, ViewChild } from "@angular/core";
import { PaisModel } from "../../../shared/models/pais.model";
import { AdmPaisService } from "../../services";
import { PaisService } from "../../../shared/services";
import { StoreModel } from "../../../shared/models/store.model";
import { Store } from "@ngrx/store";
import { DataTable } from "primeng/primeng";
import * as fromShared from './../../../shared/store';

@Component({
    selector: 'pais-component',
    styleUrls: ['pais.component.scss'],
    template: `
       <div class="ui-g">
            <div class="ui-g-12">
                <div class="card card-w-title">
                    <h1><i class="fa fa-hearth" aria-hidden="true"></i> Pais</h1>
                    <div class="ui-g">
                        <div class="ui-g-12 text-aling-right">
                            <button pButton
                                type="button" 
                                label="Crear nuevo pais" 
                                class="ui-button-success">
                            </button>
                        </div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-12 ui-fluid">
                            <p-table [value]="pais" [lazy]="true" (onLazyLoad)="loadPaisesLazy($event)" [paginator]="true" 
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
                                <ng-template pTemplate="body" let-pais>
                                    <tr>
                                        <td>{{ pais.nombre }}</td>
                                        <td style="text-align: center;">
                                            <button style="margin-right: 10px;" pButton
                                                (click)="onEditPais(pais)"
                                                type="button" 
                                                icon="pi pi-pencil" class="ui-button-primary">
                                             </button>
                                            <button pButton 
                                                type="button"
                                                icon="pi pi-trash" 
                                                (click)="deletePais(pais)"
                                                class="ui-button-danger">
                                             </button>
                                        </td>
                                    </tr>
                                </ng-template>
                            </p-table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
    
    `

})

export class PaisComponent {

    //atributos
    pais: PaisModel[];
    totalRecords: number;
    loading: boolean = true;

    //properties
    constructor(
        private admPaisService: AdmPaisService,
        private paisService: PaisService,
        private store: Store<StoreModel>
    ) { }

    @ViewChild('dt') dt: DataTable;

    loadPaisesLazy(event) {
        this.showWaitDialog('Consultando datos, un momento por favor...');
        this.loading = true;
        this.admPaisService.getPaisLazy(event).subscribe(response => {
            this.pais = response.data;
            this.totalRecords = response.totalRows;
            this.loading = false;
            this.hideWaitDialog();
        })
    }

    hideWaitDialog() {
        this.store.dispatch(new fromShared.HideWaitDialog());
    }

    showWaitDialog(header: string, body?: string) {
        this.store.dispatch(new fromShared.ShowWaitDialog({ header, body }));
    }
}