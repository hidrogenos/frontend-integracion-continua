import { Component, ViewChild, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { StoreModel } from "../../../shared/models/store.model";
import { AdmDepartamentoService } from "../../services/adm-departamento/adm-departamento.service";
import { AdmCiudadService } from '../../services/adm-ciudad/adm-ciudad.service';
import { CiudadService, HasPermisionService } from "../../../shared/services";
import { DepartamentoService } from '../../../shared/services/departamento/departamento.service';
import { DepartamentoModel } from "../../../shared/models/departamento.model";
import { CiudadModel } from "../../../shared/models/ciudad.model";
import { DataTable } from "primeng/primeng";

import * as fromShared from './../../../shared/store';
import { forkJoin } from "rxjs";
import { EditCiudadDialogComponent } from "../../components/edit-ciudad-dialog/edit-ciudad-dialog.component";


@Component({
    selector: 'ciudad-component',
    styleUrls: ['ciudad.component.scss'],
    template: `

        <div class="ui-g">
            <div class="ui-g-12">
                <div class="card card-w-title">
                    <h1><i class="fa fa-map-signs" aria-hidden="true"></i> Ciudad</h1>
                    <div class="ui-g">
                        <div class="ui-g-12 text-aling-right">
                            <button pButton 
                                *ngIf="hasPermision(1370) | async"
                                (click)="ccdc.show()"
                                type="button" 
                                label="Crear nueva ciudad" 
                                class="ui-button-success">
                            </button>
                        </div>
                    </div>
                    <div class="ui-g">
                        <div class="ui-g-12 ui-fluid">
                            <p-table [value]="ciudades" [lazy]="true" (onLazyLoad)="loadCiudadesLazy($event)" [paginator]="true" 
                            [rows]="10" [totalRecords]="totalRecords" [loading]="loading" sortField="nombre" #dt>
                                <ng-template pTemplate="header" let-columns>
                                    <tr>
                                        <th pSortableColumn="nombre">
                                            Nombre
                                            <p-sortIcon field="nombre" ></p-sortIcon>
                                        </th>
                                        <th pSortableColumn="id_departamento">
                                            Departamento
                                            <p-sortIcon field="id_departamento" ></p-sortIcon>
                                        </th>
                                        <th rowspan="2">
                                            Acciones
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>
                                            <input pInputText type="text" (input)="dt.filter($event.target.value, 'nombre', 'contains')">
                                        </th>
                                        <th>
                                            <input pInputText type="text" (input)="dt.filter($event.target.value, 'id_departamento  ', 'contains')">
                                        </th>
                                    </tr>
                                </ng-template>
                                <ng-template pTemplate="body" let-ciudad>
                                    <tr>
                                        <td>{{ ciudad.nombre }}</td>
                                        <td>{{ ciudad?.departamento.nombre }}</td>
                                        <td style="text-align: center;">
                                            <button style="margin-right: 10px;" pButton
                                                *ngIf="hasPermision(1372) | async"
                                                (click)="onEditCiudad(ciudad)"
                                                type="button" 
                                                icon="pi pi-pencil" class="ui-button-primary">
                                             </button>
                                            <button pButton 
                                                *ngIf="hasPermision(1371) | async"
                                                type="button"
                                                icon="pi pi-trash" 
                                                (click)="deleteCiudad(ciudad)"
                                                class="ui-button-danger">
                                             </button>
                                        </td>
                                    </tr>
                                </ng-template>
                            </p-table>
                        </div>
                    </div>
                </div>
                <create-ciudad-dialog #ccdc 
                    [departamentos]="departamentos"
                    (create)="onCreate($event)">
                </create-ciudad-dialog>
                <edit-ciudad-dialog #ecdc
                    *ngIf="departamentos"
                    [departamentos]="departamentos"
                    (edit)="onEdit($event)">
                </edit-ciudad-dialog>
            </div>
        </div>
    `
})

export class CiudadComponent implements OnInit{

    //atributos
    departamentos: DepartamentoModel[]; 
    ciudades: CiudadModel[];
    totalRecords: number;
    loading: boolean;

    //properties
    constructor(
        private store: Store<StoreModel>,
        private admCiudadService: AdmCiudadService,
        private admDepartamentoService: AdmDepartamentoService,
        private ciudadService: CiudadService,
        private hasPermisionService: HasPermisionService
    ){}

    @ViewChild('dt') dt: DataTable;
    @ViewChild('ecdc') ecdc: EditCiudadDialogComponent;

    ngOnInit(){
        this.getInitialData();
    }

    getInitialData(){
        forkJoin([this.getDepartamentos()]).subscribe(
            ([departamentos]) => {
                this.departamentos = departamentos;
            }
        );
    }

    getDepartamentos(){
        return this.admDepartamentoService.getDepartamentos();
    }

    getDepartamentoByIdCiudad(id: number){
        const departamento: DepartamentoModel = this.departamentos.find(departamentoAct => departamentoAct.id == id);
        return departamento;
    }

    hasPermision(id: number){
        return this.hasPermisionService.hasPermision(id);
    }

    onCreate(event){
        this.showWaitDialog('Creando ciudad, un momento por favor...');
        this.ciudadService.createCiudad(event).subscribe(response => {
            this.ciudades = [
                ...this.ciudades,
                response
            ];
            this.totalRecords ++;
            this.hideWaitDialog();
        })
    }

    loadCiudadesLazy(event){
        this.showWaitDialog('Consultando datos, un momento por favor...');
        this.admCiudadService.getCiudadesLazy(event).subscribe(response => {
            this.ciudades = response.data;
            this.totalRecords = response.totalRows;
            this.loading = false;
            this.hideWaitDialog();
        })

    }

    deleteCiudad(event: CiudadModel){
        this.showWaitDialog('Eliminando ciudad, un momento por favor...');
        this.admCiudadService.onEliminar(event).subscribe((data: CiudadModel) => {
            this.ciudades = this.ciudades.filter((ciudad: CiudadModel) => {
                return ciudad.id != event.id
            }
        );
            this.totalRecords --;
            this.hideWaitDialog();
        })
    }

    onEdit(event: CiudadModel){
        this.showWaitDialog('Editando ciudad, un momento por favor...');
        this.admCiudadService.updateCiudad(event.id, event).subscribe(response => {
            
            this.ciudades = this.ciudades.map(element => {
                return element.id == response.id ? response : element;
            })
            
            this.hideWaitDialog();
        })
    }

    hideWaitDialog(){
        this.store.dispatch(new fromShared.HideWaitDialog());
    }

    
    showWaitDialog(header: string, body?: string){
        this.store.dispatch(new fromShared.ShowWaitDialog({ header, body}));
    }

    onEditCiudad(event: CiudadModel){
        this.ecdc.show(event);
    }
}