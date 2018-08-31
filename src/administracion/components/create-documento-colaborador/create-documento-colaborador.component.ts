import {
    Component,
    Output,
    EventEmitter,
    ViewChild,
    Input
} from "@angular/core";
import { FileUpload } from "primeng/primeng";
import { UsuarioDestrezaDocumentoModel } from "../../../shared/models/usuario-destreza-documento.model";
import { UsuarioDocumentoModel } from "../../../shared/models/usuario-documento.model";
import { environment } from "../../../environments/environment";

@Component({
    selector: "create-documento-colaborador",
    styleUrls: ["create-documento-colaborador.component.scss"],
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
                    </ng-template>
                    <ng-template pTemplate="body" let-documento>
                        <tr>
                            <td>{{ documento.titulo }}</td>
                            <td>{{ documento.fecha_carga | date: dateFormatAngular }}</td>
                            <td style="text-align: center;">
                                <button style="margin-right:10px;" pButton 
                                    type="button" 
                                    icon="fa fa-download" 
                                    (click)="onDownloadUsuarioDocumento.emit(documento)"
                                    class="ui-button-success">
                                </button>
                                <button style="margin-right:10px;" pButton 
                                    type="button" 
                                    icon="fa fa-trash" 
                                    class="ui-button-danger"
                                    (click)="onDeleteUsuarioDocumento.emit(documento)">
                                </button>
                            </td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </div>
    `
})
export class CreateDocumentoColaboradorComponent {
    //atributos
    dateFormatAngular = environment.dateFormatAngular;
    //events
    @Output()
    onCreateDocumentoColaborador = new EventEmitter<File[]>();
    @Output()
    onDeleteUsuarioDocumento = new EventEmitter<UsuarioDocumentoModel>();
    @Output()
    onDownloadUsuarioDocumento = new EventEmitter<UsuarioDocumentoModel>();

    //properties
    @Input()
    documentos: UsuarioDestrezaDocumentoModel;

    //viewchild
    @ViewChild("fu")
    fu: FileUpload;

    constructor() {}

    uploadFiles(event) {
        const files: File[] = event.files;
        this.onCreateDocumentoColaborador.emit(files);

        console.log(files);
    }
}
