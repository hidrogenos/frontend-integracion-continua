import {
    Component,
    Output,
    EventEmitter,
    ViewChild,
    Input
} from "@angular/core";
import { FileUpload } from "primeng/primeng";
import { environment } from "../../../environments/environment";

// Models
import { AccionPreventivaAdjuntoModel } from "../../../shared/models/accion-preventiva-adjunto.model";

@Component({
    selector: "create-accion-preventiva-documento",
    styleUrls: ["create-accion-preventiva-documento.component.scss"],
    templateUrl: "create-accion-preventiva-documento.component.html"
})
export class CreateDocumentoAccionPreventivaComponent {
    //atributos
    dateFormatAngular = environment.dateFormatAngular;
    disabled: boolean;

    //events
    @Output()
    onCreateDocumentoAccionPreventiva = new EventEmitter<File[]>();

    @Output()
    onDeleteDocumentoAccionPreventiva = new EventEmitter<
        AccionPreventivaAdjuntoModel
    >();

    @Output()
    onDownloadDocumentoAccionPreventiva = new EventEmitter<
        AccionPreventivaAdjuntoModel
    >();

    @Output()
    onConsultarAccionPreventivaAdjunto = new EventEmitter<
        AccionPreventivaAdjuntoModel
    >();

    //properties
    @Input()
    documentos: AccionPreventivaAdjuntoModel[];

    //viewchild
    @ViewChild("fu")
    fu: FileUpload;

    constructor() {}

    uploadFiles(event) {
        const files: File[] = event.files;
        this.onCreateDocumentoAccionPreventiva.emit(files);
    }

    disableComponent() {
        this.disabled = true;
    }
}
