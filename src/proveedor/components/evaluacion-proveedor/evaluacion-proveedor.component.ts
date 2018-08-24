import { Component,ViewChild,OnInit} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EvaluacionService, ProveedorListaService } from '../../services';
import { EvaluacionProveedorModel } from '../../../shared/models/evaluacion-proveedor.model';
import { forkJoin } from 'rxjs';
import { ProveedorModel } from '../../../shared/models/proveedor.model';
import { EditEvaluacionProveedorDialogComponent  } from '../../components/edit-evaluacion-proveedor-dialog/edit-evaluacion-proveedor-dialog.component';
import { CreateEvaluacionProveedorDialogComponent } from '../../components/create-evaluacion-proveedor-dialog/create-evaluacion-proveedor-dialog.component'
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import * as fromShared from './../../../shared/store';
import { DataTable } from 'primeng/primeng';
import { EvaluacionProveedorService } from '../../../shared/services';
import * as fromRoot from './../../../app/store';
import { take } from 'rxjs/operators';
import { environment } from '../../../environments/environment'; 

@Component({
    selector: 'evaluacion-proveedor-component',
    template: `
    <div class="ui-g">
    <div class="ui-g-12">
        <div class="card card-w-title">
            <h1><i class="fa fa-users" aria-hidden="true"></i> Evaluaciones</h1>
            <div class="ui-g">
                <div class="ui-g-12 text-aling-right">
                    <button pButton type="button" (click)="createEvaluacion.show()" label="Crear nueva Evaluación" class="ui-button-success"></button>
                </div>
            </div>
            <div class="ui-g" *ngIf="proveedor">
                <div class="ui-g-12 ui-fluid">
                    <p-table [value]="evaluaciones" [lazy]="true" (onLazyLoad)="loadEvaluacionesLazy($event)" [paginator]="true" 
                        [rows]="10" [totalRecords]="totalRecords" [loading]="loading" sortField="factura_servicio" #dt>
                        <ng-template pTemplate="header" let-columns>
                            <tr>
                                <th pSortableColumn="factura_servicio">
                                    Factura/Servicio
                                    <p-sortIcon field="factura_servicio" ></p-sortIcon>
                                </th>
                                <th pSortableColumn="calificacion">
                                    Calificación
                                    <p-sortIcon field="calificacion" ></p-sortIcon>
                                </th>
                                <th pSortableColumn="fecha_calificacion">
                                    Fecha Calificación
                                    <p-sortIcon field="fecha_calificacion"></p-sortIcon>
                                </th>
                                <th pSortableColumn="observaciones">
                                    Observaciones 
                                    <p-sortIcon field="observaciones" ></p-sortIcon>
                                </th>
                                <th>
                                    Acciones
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <input pInputText type="text" (input)="dt.filter($event.target.value, 'factura_servicio', 'contains')">
                                </th>
                                <th>
                                    <input pInputText type="text" (input)="dt.filter($event.target.value, 'calificacion', 'contains')">
                                </th>
                                <th>
                                    <input pInputText type="text" (input)="dt.filter($event.target.value, 'fecha_calificacion', 'contains')">
                                </th>
                                <th>
                                    <input pInputText type="text" (input)="dt.filter($event.target.value, 'observaciones', 'contains')">
                                </th>
                                <th>
                                </th>
                            </tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-evaluaciones>
                            <tr>
                                <td>{{ evaluaciones.factura_servicio }}</td>
                                <td>{{ evaluaciones.calificacion }}</td>
                                <td>{{ evaluaciones.fecha_calificacion | date : dateFormat }}</td>
                                <td>{{ evaluaciones.observaciones }}</td>
                                <td style="text-align: center;">
                                    <button style="margin-right: 10px;" pButton type="button" icon="pi pi-pencil" (click)="onEditEvaluacion(evaluaciones)" class="ui-button-primary"></button>
                                    <button pButton type="button" icon="pi pi-trash" (click)="deleteEvaluacion(evaluaciones)" class="ui-button-danger"></button>
                                </td>
                            </tr>
                        </ng-template>
                    </p-table>
                </div>
            </div>
        </div>
    </div>
    <create-evaluacion-dialog #createEvaluacion
         (create)="onCreate($event)">
    </create-evaluacion-dialog>
    <edit-evaluacion-proveedor #editEvaluacion
         (edit)="onEdit($event)">
         </edit-evaluacion-proveedor>
</div>    `
})
export class EvaluacionProveedorComponent implements OnInit{

    evaluacionesFrom: FormGroup;
    evaluaciones: EvaluacionProveedorModel[];
    loading: boolean = true;
    totalRecords: number;
    proveedor: ProveedorModel;

    @ViewChild('createEvaluacion')
    createEvaluacion: CreateEvaluacionProveedorDialogComponent;
    @ViewChild('dt')
    dt: DataTable;
    @ViewChild('editEvaluacion')
    editEvaluacion: EditEvaluacionProveedorDialogComponent;
    dateFormat: string;

    constructor(
        private fb: FormBuilder,
        private evaluacionService: EvaluacionService,
        private evaluacionProveedorService: EvaluacionProveedorService,
        private store: Store<StoreModel>,
        private proveedorListService: ProveedorListaService

    ){ }

    ngOnInit(){
        this.dateFormat = environment.dateFormatAngular;
        this.store.select(fromRoot.getRouterState).pipe(
            take(1),
        ).subscribe(route=>{
        this.loadInitData(route.state.params.id);
        });
    }

    deleteEvaluacion(event: EvaluacionProveedorModel) {
        this.showWaitDialog('Eliminando proveedor, un momento por favor...')
        this.evaluacionService
            .onEliminar(event)
            .subscribe((data: EvaluacionProveedorModel) => {
                this.evaluaciones = this.evaluaciones.filter(
                    (proveedor: EvaluacionProveedorModel) => {
                        return proveedor.id != event.id;
                    }
                );
                this.hideWaitDialog();
            });
    }

    getProveedor(id) {
        return this.proveedorListService.getProveedor(id);
    }
   
    loadInitData(id: number) {
        this.showWaitDialog(
            'Consultando datos requeridos, un momento por favor...'
        );
        forkJoin([this.getProveedor(id)]).subscribe(([proveedor]) => {
            this.proveedor = proveedor;
            this.hideWaitDialog();
           }
        );
    }

    loadEvaluacionesLazy(event) {
        this.loading = true;
        this.evaluacionService
            .getEvaluacionesLazy(event,this.proveedor.id)
            .subscribe(response => {
                this.evaluaciones = response.data;
                this.totalRecords = response.totalRows;
                this.loading = false;
            });
    }

    onCreate($event) {
       this.showWaitDialog('Creando proveedor, un momento por favor...')
       $event.id_proveedor = this.proveedor.id;
        this.evaluacionProveedorService.createEvaluacion($event).subscribe(response => {
            this.evaluaciones = [
                ...this.evaluaciones,
                 response
                ];
        });
        this.hideWaitDialog();
    }

    onEdit(event: EvaluacionProveedorModel){ 
        this.showWaitDialog('Editando evaluación, un momento por favor...')
        this.evaluacionService.updateEvaluacion(event.id, event).subscribe(response => {
            return this.evaluaciones = this.evaluaciones.map(element => {
                return element.id == response.id ? response : element;
            });
        });  
        this.hideWaitDialog();
    }

    showWaitDialog(header: string, body?: string) {
        this.store.dispatch(new fromShared.ShowWaitDialog({ header, body }));
    }

    hideWaitDialog() {
        this.store.dispatch(new fromShared.HideWaitDialog());
    }

    onEditEvaluacion(event: EvaluacionProveedorModel){
        this.editEvaluacion.show(event);
    }
}
