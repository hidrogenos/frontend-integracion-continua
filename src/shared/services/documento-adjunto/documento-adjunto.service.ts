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

    getDocumentoAdjunto(id: number): Observable<DocumentoAdjuntoModel> {
        return this.http.get<DocumentoAdjuntoModel>(`${environment.apiUrl}/documento-adjunto/${id}`);
    }

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
        let er = {
            ...adjunto,
            fecha_carga: adjunto.fecha_carga * 1000
        };
        return er;
    }
}
