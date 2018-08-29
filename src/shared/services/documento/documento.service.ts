import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

//environment
import { environment } from '../../../environments/environment';
import { DocumentoModel } from '../../models/documento.model';
import { DocumentoAdjuntoService } from '../documento-adjunto/documento-adjunto.service';
import { DocumentoDivulgacionRegistroService } from '../documento-divulgacion-registro/documento-divulgacion-registro.service';

@Injectable()
export class DocumentoService {
    constructor(
        private http: HttpClient,
        private documentoAdjuntoService: DocumentoAdjuntoService,
        private documentoDivulgacionService: DocumentoDivulgacionRegistroService,
    ) { }

    transformDocumentoRequest(documento: DocumentoModel) {
        if (documento.adjuntos) {
            documento.adjuntos = documento.adjuntos.map(
                adjunto => this.documentoAdjuntoService.transformDocumentoAdjuntoRequest(adjunto)
            )
        }
        return {
            ...documento
        }
    }

    transformDocumentoResponse(documento: DocumentoModel) {
        if (documento.adjuntos) {
            documento.adjuntos = documento.adjuntos.map(
                adjunto => this.documentoAdjuntoService.transformDocumentoAdjuntoResponse(adjunto)
            )
        }
        if (documento.divulgacion_registros) {
            documento.divulgacion_registros = documento.divulgacion_registros.map(
                adjunto => this.documentoDivulgacionService.transformDocumentoDivulgacionRegistroResponse(adjunto)
            )
        }
        return {
            ...documento
        }
    }
}
