import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

//environment
import { environment } from '../../../environments/environment';
import { DocumentoAdjuntoModel } from '../../models/documento-adjunto.model';

@Injectable()
export class DocumentoAdjuntoService {
    constructor(
        private http: HttpClient
    ) { }

    updateDocumentoAdjunto(adjunto: DocumentoAdjuntoModel) {
        adjunto = this.transformDocumentoAdjuntoRequest(adjunto);
        return this.http.put(`${environment.apiUrl}/documento-adjunto/${adjunto.id}`, adjunto);
    }

    transformDocumentoAdjuntoRequest(adjunto: DocumentoAdjuntoModel) {
        return {
            ...adjunto,
            fecha_carga: adjunto.fecha_carga / 1000
        }
    }

    transformDocumentoAdjuntoResponse(adjunto: DocumentoAdjuntoModel) {
        return {
            ...adjunto,
            fecha_carga: adjunto.fecha_carga * 1000
        }
    }
}
