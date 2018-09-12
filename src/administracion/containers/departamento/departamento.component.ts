import { Component, ViewChild, OnInit } from "@angular/core";
import { DataTable } from "primeng/primeng";
import { EditDepartamentoDialogComponent } from "../../components";
import { DepartamentoModel } from "../../../shared/models/departamento.model";
import { HasPermisionService, DepartamentoService, PaisService } from "../../../shared/services";
import { AdmDepartamentoService, AdmPaisService } from "../../services";
import { PaisModel } from "../../../shared/models/pais.model";
import { forkJoin } from "rxjs";

//store
import * as fromShared from './../../../shared/store';
import { StoreModel } from "../../../shared/models/store.model";
import { Store } from "@ngrx/store";

@Component({

    selector: 'departamento-component',
    styleUrls: ['departamento.component.scss'],
    template: `
        <div class="ui-g">
            <div class="ui-g-12">
                <div class="card card-w-title">
                    <h1><i class="fa fa-map" aria-hidden="true"></i> Departamentos</h1>
                    <div class="ui-g">
                        <div class="ui-g-12 text-aling-right">
                            <button pButton 
                                (click)="cddc.show()"
                                *ngIf="hasPermision(1360) | async"
                                type="button" 
                                label="Crear nuevo departamento" 
                                class="ui-button-success">
                            </button>
                        </div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-12 ui-fluid">
                            <p-table [value]="departamento" [lazy]="true" (onLazyLoad)="loadDepartamentosLazy($event)" [paginator]="true" 
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
                                <ng-template pTemplate="body" let-departamento>
                                    <tr>
                                        <td>{{ departamento.nombre }}</td>
                                        <td style="text-align: center;">
                                            <button style="margin-right: 10px;" pButton
                                                *ngIf="hasPermision(1362) | async"
                                                (click)="onEditDepartamento(departamento)"
                                                type="button" 
                                                icon="pi pi-pencil" class="ui-button-primary">
                                             </button>
                                            <button pButton 
                                                *ngIf="hasPermision(1361) | async"
                                                type="button"
                                                icon="pi pi-trash" 
                                                (click)="deleteDepartamento(departamento)"
                                                class="ui-button-danger">
                                             </button>
                                        </td>
                                    </tr>
                                </ng-template>
                            </p-table>
                        </div>
                    </div>
                </div>
                <create-departamento-dialog #cddc 
                    [paises]="paises"
                    (create)="onCreate($event)">
                </create-departamento-dialog>
                <edit-departamento-dialog #eddc
                    *ngIf="paises"
                    [paises]="paises"
                    (edit)="onEdit($event)">
                </edit-departamento-dialog>
            </div>
        </div>
    `

})

export class DepartamentoComponent implements OnInit{

    //atributos
    departamento: DepartamentoModel[];
    paises: PaisModel[];
    totalRecords: number;
    loading: boolean = true;

    //properties
    constructor(
        private hasPermisionService: HasPermisionService,
        private store: Store<StoreModel>,
        private admDepartamentoService: AdmDepartamentoService,
        private admPaisService: AdmPaisService,
        private departamentoService: DepartamentoService
    ){}

    //Viewchild
    @ViewChild('dt') dt: DataTable;
    @ViewChild('eddc') eddc: EditDepartamentoDialogComponent;


    ngOnInit(){
        this.getinitialData()
    }

    deleteDepartamento(event: DepartamentoModel){
        this.showWaitDialog('Eliminando departamento, un momento por favor...')
        this.admDepartamentoService.onEliminar(event).subscribe((data: DepartamentoModel) =>{
            this.departamento = this.departamento.filter(
                (departamento: DepartamentoModel) => {
                    return departamento.id != event.id
                }
            );
            this.hideWaitDialog();
        })
    }

    getinitialData() {
        forkJoin([this.getPaises()]).subscribe(
            ([paises]) => {
                this.paises = paises;
            }
        );
    }

    getPaises(){
        return this.admPaisService.getPaises();
    }
    
    hideWaitDialog(){
        this.store.dispatch(new fromShared.HideWaitDialog());
    }

    hasPermision(id: number){
        return this.hasPermisionService.hasPermision(id);
    }

    loadDepartamentosLazy(event){
        this.showWaitDialog('Consultando datos, un momento por favor...');
        this.loading = true;
        this.admDepartamentoService.getDepartamentosLazy(event).subscribe(response => {
            this.departamento = response.data;
            this.totalRecords = response.totalRows;
            this.loading = false;
            this.hideWaitDialog();
        })
    }

    onCreate(event){
        console.log(event);
        this.showWaitDialog('Creando departamento, un momento por favor...');
        this.departamentoService.createDepartamento(event).subscribe(response => {
            this.departamento = [
                ...this.departamento,
                response
            ];
            this.hideWaitDialog();
        })
    }

    onEdit(event: DepartamentoModel){
        console.log(event)
        this.showWaitDialog('Editando departamento, un momento por favor...');
        this.admDepartamentoService.updateDepartamento(event.id, event).subscribe(response => {
            return this.departamento = this.departamento.map(element => {
                this.hideWaitDialog();
                return element.id == response.id ? response : element;
            });
        });
    }

    onEditDepartamento(departamento: DepartamentoModel){
        this.eddc.show(departamento);
    }

    showWaitDialog(header: string, body?: string){
        this.store.dispatch(new fromShared.ShowWaitDialog({ header, body}));
    }
}