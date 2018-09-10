import {
    Component,
    Output,
    EventEmitter,
    Input,
    ViewChild
} from "@angular/core";
import { CapacitacionAdjuntoModel } from "../../../../shared/models/capacitacion-adjunto.model";
import { FileUpload } from "primeng/primeng";
import { environment } from "../../../../environments/environment";

@Component({
    selector: "documentacion-capacitacion-component",
    styleUrls: ["documentacion-capacitacion.component.scss"],
    template: `

    <div class="ui-g">
        <div class="ui-g-12">
            <h2><b>Documentos adjuntos</b></h2>
        </div>
    </div>
    <div class="ui-g">
        <div class="ui-g-12 text-aling-right" *ngIf="permisoAdd && !disable">
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
            <p-table [value]="documentos">
                <ng-template pTemplate="header">
                    <tr>
                        <th>Nombre</th>
                        <th>Fecha de carga</th>
                        <th>Acciones</th>
                    </tr>
                </ng-template>this.loadedCapacitaciones.procesos.push(proceso);
                <ng-template pTemplate="body" let-documento>
                    <tr>
                        <td>{{ documento.titulo }}</td>
                        <td>{{ documento.fecha_carga  | date: dateFormat }}</td>
                        <td style="text-align: center;">
                            <button *ngIf="permisoVisualize && !disable" style="margin-right:10px;" pButton 
                                type="button" 
                                icon="fa fa-eye" 
                                class="ui-button-primary"
                                (click)="onConsultarDocumento.emit(documento)">
                            </button>
                            <button *ngIf="permisoDowload  && !disable" style="margin-right:10px;" pButton 
                                type="button" 
                                icon="fa fa-download" 
                                (click)="onDownloadDocumento.emit(documento)"
                                class="ui-button-success">
                            </button>
                            <button *ngIf="permisoDelete  && !disable" style="margin-right:10px;" pButton 
                                type="button" 
                                icon="fa fa-trash" 
                                class="ui-button-danger"
                                (click)="onDeleteDocumento.emit(documento)">
                            </button>
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    </div>
    `
})
export class DocumentacionCapacitacionComponent {
    //atributos
    dateFormat = environment.dateFormatAngular;
    disable: boolean;

    //events
    @Output()
    onCreateDocumento = new EventEmitter<File[]>();

    @Output()
    onDeleteDocumento = new EventEmitter<CapacitacionAdjuntoModel>();

    @Output()
    onDownloadDocumento = new EventEmitter<CapacitacionAdjuntoModel>();

    @Output()
    onConsultarDocumento = new EventEmitter<CapacitacionAdjuntoModel>();

    //properties
    @Input()
    documentos: CapacitacionAdjuntoModel;

    @Input()
    permisoAdd: boolean;

    @Input()
    permisoVisualize: boolean;

    @Input()
    permisoDowload: boolean;

    @Input()
    permisoDelete: boolean;

    //viewchild
    @ViewChild("fu")
    fu: FileUpload;

    constructor() {}

    uploadFiles(event) {
        const files: File[] = event.files;
        this.onCreateDocumento.emit(files);
    }
    disableComponent() {
        this.disable = true;
    }
}
