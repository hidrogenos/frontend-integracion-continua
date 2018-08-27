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
import { AccionCorrectivaAdjuntoModel } from "../../../shared/models/accion-correctiva-adjunto.model";

@Component({
    selector: "create-accion-correctiva-documento",
    styleUrls: ["create-accion-correctiva-documento.component.scss"],
    templateUrl: "create-accion-correctiva-documento.component.html"
})
export class CreateDocumentoAccionCorrectivaComponent {
    //atributos
    dateFormatAngular = environment.dateFormatAngular;
    disabled: boolean;

    //events
    @Output()
    onCreateDocumentoAccionCorrectiva = new EventEmitter<File[]>();

    @Output()
    onDeleteDocumentoAccionCorrectiva = new EventEmitter<
        AccionCorrectivaAdjuntoModel
    >();

    @Output()
    onDownloadDocumentoAccionCorrectiva = new EventEmitter<
        AccionCorrectivaAdjuntoModel
    >();

    //properties
    @Input()
    documentos: AccionCorrectivaAdjuntoModel[];

    //viewchild
    @ViewChild("fu")
    fu: FileUpload;

    constructor() {}

    uploadFiles(event) {
        const files: File[] = event.files;
        this.onCreateDocumentoAccionCorrectiva.emit(files);
    }

    disableComponent() {
        this.disabled = true;
    }
}
