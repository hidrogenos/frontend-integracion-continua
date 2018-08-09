import { Component, Output, EventEmitter, ViewChild, Input} from '@angular/core';
import { FileUpload } from 'primeng/primeng';
import { environment } from '../../../environments/environment';

// Models
import { AccionDocumentoModel } from '../../../shared/models/accion-documento.model';

@Component({
    selector: 'create-accion-correctiva-documento',
    styleUrls: ['create-accion-correctiva-documento.component.scss'],
    templateUrl: 'create-accion-correctiva-documento.component.html'
})
export class CreateDocumentoAccionCorrectivaComponent {
    //atributos
    dateFormatAngular = environment.dateFormatAngular;

    //events
    @Output() 
    onCreateDocumentoAccionCorrectiva = new EventEmitter<File[]>();

    @Output()
    onDeleteDocumentoAccionCorrectiva = new EventEmitter<AccionDocumentoModel>();
    
    @Output()
    onDownloadDocumentoAccionCorrectiva = new EventEmitter<AccionDocumentoModel>();

    //properties
    @Input() documentos: AccionDocumentoModel[];

    //viewchild
    @ViewChild('fu') fu: FileUpload;

    constructor() {}

    uploadFiles(event) {
        const files: File[] = event.files;
        this.onCreateDocumentoAccionCorrectiva.emit(files);
    }

    
}
