import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from "@angular/core";
import { FacturtaProveedorModel } from "../../../shared/models/factura-proveedor.model";
import { FileUpload } from "primeng/primeng";
import { environment } from "../../../environments/environment";

@Component({
    selector:'facturas-proveedor',
    template:`<div class="ui-g">
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
    <div class="ui-g-12">
        <p-table [value]="facturas">
            <ng-template pTemplate="header">
                <tr>
                    <th>Nombre</th>
                    <th>Fecha de carga</th>
                    <th>Acciones</th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-facturas>
                <tr>
                    <td>{{ facturas.titulo }}</td>
                    <td>{{ facturas.fecha_carga | date: dateFormat }}</td>
                    <td style="text-align: center;">
                        <button style="margin-right:10px;" pButton 
                            type="button" 
                            icon="fa fa-download" 
                            (click)="onDownloadFacturaProveedor.emit(facturas)"
                            class="ui-button-success">
                        </button>
                        <button style="margin-right:10px;" pButton 
                            type="button" 
                            icon="fa fa-trash" 
                            class="ui-button-danger"
                            (click)="onDeleteFacturaProveedor.emit(facturas)">
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

 //events
 @Output()onCreateFacturaProveedor = new EventEmitter<File[]>();
 @Output()onDeleteFacturaProveedor = new EventEmitter<FacturtaProveedorModel>();
 @Output()onDownloadFacturaProveedor = new EventEmitter<FacturtaProveedorModel>();

 //properties
 @Input() facturas: FacturtaProveedorModel;

 //viewchild
 @ViewChild('fu') fu: FileUpload;

 constructor() {
     console.log(this.facturas)
 }

 uploadFiles(event) {
     const files: File[] = event.files;
     this.onCreateFacturaProveedor.emit(files);

     console.log(files);
 }
}