import { Component, ViewChild } from "@angular/core";
import { PaisModel } from "../../../shared/models/pais.model";
import { AdmPaisService } from "../../services";
import { PaisService, HasPermisionService } from "../../../shared/services";
import { StoreModel } from "../../../shared/models/store.model";
import { Store } from "@ngrx/store";
import { DataTable, Message, ConfirmationService } from "primeng/primeng";
import * as fromShared from './../../../shared/store';
import { EditPaisDialogComponent } from "../../components/edit-pais-dialog/edit-pais-dialog.component"

@Component({
    selector: 'pais-component',
    styleUrls: ['pais.component.scss'],
    template: `
       <div class="ui-g">
            <div class="ui-g-12">
                <div class="card card-w-title">
                    <h1><i class="fa fa-globe" aria-hidden="true"></i> País</h1>
                    <div class="ui-g">
                        <div class="ui-g-12 text-aling-right">
                            <button pButton 
                                *ngIf="hasPermision(1350) | async"
                                (click)="cpdc.show()"
                                type="button" 
                                label="Crear nuevo país" 
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
                                                *ngIf="hasPermision(1352) | async"
                                                (click)="onEditPais(pais)"
                                                type="button" 
                                                icon="pi pi-pencil" class="ui-button-primary">
                                             </button>
                                            <button pButton 
                                                *ngIf="hasPermision(1351) | async"
                                                type="button"
                                                icon="pi pi-trash" 
                                                (click)="confirm(pais)"
                                                class="ui-button-danger">
                                             </button>
                                        </td>
                                    </tr>
                                </ng-template>
                            </p-table>
                        </div>
                    </div>
                </div>
                <create-pais-dialog #cpdc
                     (create)="onCreate($event)">
                </create-pais-dialog>
                <edit-pais-dialog #epdc
                     (edit)="onEdit($event)">
                </edit-pais-dialog>
            </div>
        </div>
        <p-confirmDialog header="Borrar país" icon="pi pi-exclamation-triangle" width="425"></p-confirmDialog>

    `

})

export class PaisComponent {

    //atributos
    pais: PaisModel[];
    totalRecords: number;
    loading: boolean = true;
    msgs: Message[] = [];


    //properties
    constructor(
        private admPaisService: AdmPaisService,
        private paisService: PaisService,
        private hasPermisionService: HasPermisionService,
        private store: Store<StoreModel>,
        private confirmationService: ConfirmationService
    ){}

    @ViewChild('dt') dt: DataTable;
    @ViewChild('epdc') epdc: EditPaisDialogComponent;


    confirm(event: PaisModel) {
        this.confirmationService.confirm({
            message: 'al momento de borrar el país se borrara el departamento y la ciudad asociada, desea continuar?',
            accept: () => {
                this.deletePais(event);
            }
        });
    }

    deletePais(event: PaisModel){
        this.showWaitDialog('Eliminando país, un momento por favor...')
        this.admPaisService.onEliminar(event).subscribe((data: PaisModel) =>{
            this.pais = this.pais.filter(
                (pais: PaisModel) => {
                    return pais.id != event.id
                }
            );
            this.hideWaitDialog();
        })
    }
    
    hideWaitDialog(){
        this.store.dispatch(new fromShared.HideWaitDialog());
    }

    hasPermision(id: number){
        return this.hasPermisionService.hasPermision(id);
    }

    loadPaisesLazy(event){
        this.showWaitDialog('Consultando datos, un momento por favor...');
        this.loading = true;
        this.admPaisService.getPaisLazy(event).subscribe(response => {
            this.pais = response.data;
            this.totalRecords = response.totalRows;
            this.loading = false;
            this.hideWaitDialog();
        })
    }

    onCreate(event){
        console.log(event);
        this.showWaitDialog('Creando país, un momento por favor...');
        this.paisService.createPais(event).subscribe(response => {
            this.pais = [
                ...this.pais,
                response
            ];
            this.hideWaitDialog();
        })
    }

    onEdit(event: PaisModel){
        this.showWaitDialog('Editando país, un momento por favor...');
        this.admPaisService.updatePais(event.id, event).subscribe(response => {
            return this.pais = this.pais.map(element => {
                this.hideWaitDialog();
                return element.id == response.id ? response : element;
            });
        });
    }

    onEditPais(pais: PaisModel){
        this.epdc.show(pais);
    }

    showWaitDialog(header: string, body?: string){
        this.store.dispatch(new fromShared.ShowWaitDialog({ header, body}));
    }


}