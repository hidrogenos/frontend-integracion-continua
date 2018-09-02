import { Component, Output, EventEmitter,Input, ViewChild, ElementRef} from '@angular/core';
import { environment } from '../../../environments/environment';
import { EquipoAdjuntoModel } from '../../../shared/models/equipo-adjunto.model';
import { FileUpload } from 'primeng/primeng';

@Component({
    selector: 'create-documento-equipo',
    styleUrls: ['create-documento-equipo.component.scss'],
    template: `
    <div class="ui-g">
    <div class="ui-g-12 text-aling-right">
        <p-fileUpload #fu
            customUpload="true"
            name="demo[]"
            (uploadHandler)="uploadFiles($event)"
            multiple="multiple"
            cancelLabel="Limpiar"
            chooseLabel="Seleccionar"
            uploadLabel="Adjuntar"
            *ngIf="canEditPermisionsSeleccionarDocumentoEquipo">
        </p-fileUpload>
    </div>
</div>
<div class="ui-g">
    <div class="ui-g-12">
        <p-table [value]="documentosEquipo">
            <ng-template pTemplate="header">
                <tr>
                    <th>Nombre</th>
                    <th>Fecha de carga</th>
                    <th>Imagen</th>
                    <th>Acciones</th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-documento>
                <tr>
                    <td>{{ documento.titulo }}</td>
                    <td style="text-align: center;">{{ documento.fecha_carga | date: dateFormatAngular }}</td>
                    <td  style="text-align: center;width:10;%"  > 
                        <p-checkbox *ngIf="canEditPermisionsMostrarImagenEquipo" [(ngModel)]="documento.activo_check" binary="false" (onChange)="cambiarValor(documento)" ></p-checkbox>
                    </td>
                    <td style="text-align: center;">
                        <button style="margin-right:10px;" pButton 
                            type="button" 
                            icon="fa fa-download" 
                            (click)="onDownloadEquipoDocumento.emit(documento)"
                            *ngIf="canEditPermisionsDescargarDocumentoEquipo"
                            class="ui-button-success">
                        </button>
                        <button style="margin-right:10px;" pButton 
                            type="button" 
                            icon="fa fa-trash" 
                            class="ui-button-danger"
                            *ngIf="canEditPermisionsEliminarDocumentoEquipo"
                            (click)="onDeleteEquipoDocumento.emit(documento)">
                        </button>
                    </td>
                </tr>
            </ng-template>
        </p-table>
    </div>
</div>
    `
})
export class CreateDocumentoEquipoComponent {

     //atributos
     dateFormatAngular = environment.dateFormatAngular;

    //events
    @Output() onCreateEquipoDocumento = new EventEmitter<File[]>();
    @Output() onDeleteEquipoDocumento = new EventEmitter<EquipoAdjuntoModel>();
    @Output() onDownloadEquipoDocumento = new EventEmitter<EquipoAdjuntoModel>();
    @Output() onCambiarValor = new EventEmitter<any>();

    @Input() canEditPermisionsSeleccionarDocumentoEquipo: boolean;
    @Input() canEditPermisionsDescargarDocumentoEquipo: boolean;
    @Input() canEditPermisionsEliminarDocumentoEquipo: boolean;
    @Input() canEditPermisionsMostrarImagenEquipo: boolean;


    //properties
    @Input() documentosEquipo: EquipoAdjuntoModel[];

    //viewchild
    @ViewChild('fu') fu: FileUpload;
    @ViewChild('imagenEquipo') imagenEquipo: ElementRef;

    constructor() {}

    cambiarValor(equipoImagen: EquipoAdjuntoModel){
        this.onCambiarValor.emit(equipoImagen);
    }

    uploadFiles(event) {
        const files: File[] = event.files;
        this.onCreateEquipoDocumento.emit(files);
    }
}