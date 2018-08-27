import { Component, ViewChild, Output, Input, EventEmitter } from "@angular/core";
import { FacturtaProveedorModel } from "../../../shared/models/factura-proveedor.model";
import { FileUpload, DataTable } from "primeng/primeng";
import { environment } from "../../../environments/environment";

//store
import { StoreModel } from "../../../shared/models/store.model";
import { Store } from '@ngrx/store';
import * as fromShared from './../../../shared/store';

@Component({
    selector:'facturas-proveedor',
    template:`
    <div class="ui-g" *ngIf="perimisoUploadFactura">
        <div class="ui-g-12 text-aling-right">
            <p-fileUpload #fu
                customUpload="true"
                name="demo[]"
                (uploadHandler)="uploadFiles($event)"
                multiple="multiple"
                cancelLabel="Limpiar"
                chooseLabel="Seleccionar"
                uploadLabel="Adjuntar">
            </p-fileUpload>
        </div>
    </div>
    <div class="ui-g">
        <div class="ui-g-12 ui-fluid" >
        <p-table [value]="factura" [lazy]="true" (onLazyLoad)="loadFacturasLazy($event)" [paginator]="true" 
                            [rows]="10" [totalRecords]="totalRecords" sortField="titulo" #dt>
                            <ng-template pTemplate="header" let-columns>
                                <tr>
                                    <th pSortableColumn="titulo">
                                        Nombre
                                        <p-sortIcon field="titulo" ></p-sortIcon>
                                    </th>
                                    <th pSortableColumn="fecha_carga">
                                        Fecha de Carga
                                        <p-sortIcon field="fecha_carga" ></p-sortIcon>
                                    </th>
                                    <th>
                                        Acciones
                                    </th>
                                </tr>
                                <tr>
                                    <th>
                                        <input pInputText type="text" (input)="dt.filter($event.target.value, 'titulo', 'contains')">
                                    </th>
                                    <th>
                                        <input pInputText type="text" (input)="dt.filter($event.target.value, 'fecha_carga', 'contains')">
                                    </th>
                                    <th>
                                    </th>
                                </tr>
                            </ng-template>
                            <ng-template pTemplate="body" let-factura>
                                <tr>
                                    <td>{{ factura.titulo }}</td>
                                    <td>{{ factura.fecha_carga | date: dateFormat }}</td>
                                    <td style="text-align: center;">
                                    <button style="margin-right:10px;" pButton 
                                        *ngIf="permisoViewFactura"
                                        type="button" 
                                        icon="fa fa-eye" 
                                        (click)="onConsultarFacturaProveedor.emit(factura)"
                                        class="ui-button-primary">
                                    </button>
                                    <button style="margin-right:10px;" pButton 
                                        *ngIf="permisoDownloadFactura"
                                        type="button" 
                                        icon="fa fa-download" 
                                        (click)="onDownloadFacturaProveedor.emit(factura)"
                                        class="ui-button-success">
                                    </button>
                                    <button style="margin-right:10px;" pButton
                                        *ngIf="permisoBorrarFactura" 
                                        type="button" 
                                        icon="fa fa-trash" 
                                        class="ui-button-danger"
                                        (click)="onDeleteFacturaProveedor.emit(factura)">
                                    </button>
                                </td>
                                </tr>
                            </ng-template>
        </p-table>
        </div>
    </div>
    
    `
})

export class FacturasProveedorComponent{

    //atributos
    dateFormat = environment.dateFormatAngular;
    totalRecords: number;

    //events
    @Output()onCreateFacturaProveedor = new EventEmitter<File[]>();
    @Output()onConsultarFacturaProveedor = new EventEmitter<File[]>();
    @Output()onDeleteFacturaProveedor = new EventEmitter<FacturtaProveedorModel>();
    @Output()onDownloadFacturaProveedor = new EventEmitter<FacturtaProveedorModel>();
    @Output()lazyFactura = new EventEmitter<any>();

    @Input() factura: FacturtaProveedorModel;
    @Input() perimisoUploadFactura: boolean;
    @Input() permisoViewFactura: boolean;
    @Input() permisoBorrarFactura: boolean;
    @Input() permisoDownloadFactura: boolean;

    //viewchild
    @ViewChild('fu') fu: FileUpload;
    @ViewChild('dt') dt: DataTable;

    //properties
    constructor(private store: Store<StoreModel>) {}

    hideWaitDialog() {
        this.store.dispatch(new fromShared.HideWaitDialog());
    }

    loadFacturasLazy(event) {
        this.lazyFactura.emit(event);
    }

    showWaitDialog(header: string, body?: string) {
        this.store.dispatch(new fromShared.ShowWaitDialog({ header, body }));
    }

    uploadFiles(event) {
        const files: File[] = event.files;
        this.onCreateFacturaProveedor.emit(files);

        console.log(files);
    }
}