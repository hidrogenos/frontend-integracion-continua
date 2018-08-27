import { Component,ViewChild,OnInit, Input} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EvaluacionService, ProveedorListaService } from '../../services';
import { EvaluacionProveedorModel } from '../../../shared/models/evaluacion-proveedor.model';
import { forkJoin } from 'rxjs';
import { ProveedorModel } from '../../../shared/models/proveedor.model';
import { EditEvaluacionProveedorDialogComponent  } from '../../components/edit-evaluacion-proveedor-dialog/edit-evaluacion-proveedor-dialog.component';
import { CreateEvaluacionProveedorDialogComponent } from '../../components/create-evaluacion-proveedor-dialog/create-evaluacion-proveedor-dialog.component'
import { DataTable } from 'primeng/primeng';
import { EvaluacionProveedorService } from '../../../shared/services';
import { take } from 'rxjs/operators';
import { environment } from '../../../environments/environment'; 

//store
import * as fromRoot from './../../../app/store';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import * as fromShared from './../../../shared/store';

@Component({
    selector: 'evaluacion-proveedor-component',
    template: `
    <div class="ui-g">
    <div class="ui-g-12">
        <div class="card card-w-title">
            <h1><i class="fa fa-users" aria-hidden="true"></i> Evaluaciones</h1>
            <div class="ui-g">
                <div class="ui-g-12 text-aling-right">
                    <button pButton type="button" *ngIf="permisoCrearEvaluacion" (click)="createEvaluacion.show()" label="Crear nueva Evaluación" class="ui-button-success"></button>
                </div>
            </div>
            <div class="ui-g" *ngIf="proveedor">
                <div class="ui-g-12 ui-fluid">
                    <p-table [value]="evaluacion" [lazy]="true" (onLazyLoad)="loadEvaluacionesLazy($event)" [paginator]="true" 
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
                        <ng-template pTemplate="body" let-evaluacion>
                            <tr>
                                <td>{{ evaluacion.factura_servicio }}</td>
                                <td>{{ evaluacion.calificacion }}</td>
                                <td>{{ evaluacion.fecha_calificacion | date : dateFormat }}</td>
                                <td>{{ evaluacion.observaciones }}</td>
                                <td style="text-align: center;">
                                    <button style="margin-right: 10px;" *ngIf="permisoEditEvaluacion" pButton type="button" icon="pi pi-pencil" (click)="onEditEvaluacion(evaluacion)" class="ui-button-primary"></button>
                                    <button pButton type="button" *ngIf="permisoBorrarEvaluacion" icon="pi pi-trash" (click)="deleteEvaluacion(evaluacion)" class="ui-button-danger"></button>
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

    //atributos
    evaluacionesFrom: FormGroup;
    evaluacion: EvaluacionProveedorModel[];
    loading: boolean = true;
    totalRecords: number;
    proveedor: ProveedorModel;

    //viewchild
    @ViewChild('createEvaluacion')
    createEvaluacion: CreateEvaluacionProveedorDialogComponent;
    @ViewChild('dt')
    dt: DataTable;
    @ViewChild('editEvaluacion')
    editEvaluacion: EditEvaluacionProveedorDialogComponent;
    dateFormat: string;

    //events
    @Input() permisoCrearEvaluacion: boolean;
    @Input() permisoEditEvaluacion: boolean;
    @Input() permisoBorrarEvaluacion: boolean;
    
    //properties
    constructor(
        private evaluacionService: EvaluacionService,
        private evaluacionProveedorService: EvaluacionProveedorService,
        private proveedorListService: ProveedorListaService,
        private store: Store<StoreModel>
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
                this.evaluacion = this.evaluacion.filter(
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
                this.evaluacion = response.data;
                this.totalRecords = response.totalRows;
                this.loading = false;
            });
    }

    onCreate($event) {
       this.showWaitDialog('Creando evaluación, un momento por favor...')
       $event.id_proveedor = this.proveedor.id;
        this.evaluacionProveedorService.createEvaluacion($event).subscribe(response => {
            this.evaluacion = [
                ...this.evaluacion,
                 response
                ];
                this.hideWaitDialog();
        });
    }

    onEdit(event: EvaluacionProveedorModel){ 
        this.showWaitDialog('Editando evaluación, un momento por favor...')
        this.evaluacionService.updateEvaluacion(event.id, event).subscribe(response => {
            return this.evaluacion = this.evaluacion.map(element => {
                this.hideWaitDialog();
                return element.id == response.id ? response : element;
            });
        }); 
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
