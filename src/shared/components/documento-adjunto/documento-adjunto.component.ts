import {
    Component,
    Input,
    EventEmitter,
    Output,
    ViewChild,
    OnInit,
    AfterContentInit
} from "@angular/core";
import { FileUpload } from "primeng/primeng";

@Component({
    selector: "documento-adjunto",
    templateUrl: "documento-adjunto.component.html"
})
export class DocumentoAdjuntoComponent {
    // atributos entrada
    @Input()
    documentos;

    @Input()
    disabled;

    // eventos
    @Output()
    onCreateDocumento: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    onDownloadDocumento: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    onDeleteDocumento: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    onConsultarTareaAdjunto: EventEmitter<any> = new EventEmitter<any>();

    //viewchild
    @ViewChild("fu")
    fu: FileUpload;

    constructor() {}

    uploadFiles(event) {
        const files: File[] = event.files;
        this.onCreateDocumento.emit(files);
        this.fu.clear();
    }
}
