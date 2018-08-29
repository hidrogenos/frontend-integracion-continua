import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

//environment
import { environment } from '../../../environments/environment';
import { DocumentoDivulgacionRegistroModel } from '../../models/documento-divulgacion-registro.model';

@Injectable()
export class DocumentoDivulgacionRegistroService {
    constructor(
        private http: HttpClient
    ) { }

    getDocumentoDivulgacionRegistro(id: number): Observable<DocumentoDivulgacionRegistroModel> {
        return this.http.get<DocumentoDivulgacionRegistroModel>
            (`${environment.apiUrl}/documento-divulgacion-registro/${id}`);
    }

    updateDocumentoDivulgacionRegistro(adjunto: DocumentoDivulgacionRegistroModel) {
        adjunto = this.transformDocumentoDivulgacionRegistroRequest(adjunto);
        return this.http.put(`${environment.apiUrl}/documento-divulgacion-registro/${adjunto.id}`, adjunto);
    }

    transformDocumentoDivulgacionRegistroRequest(adjunto: DocumentoDivulgacionRegistroModel) {
        return {
            ...adjunto,
            fecha_carga: adjunto.fecha_carga / 1000
        }
    }

    transformDocumentoDivulgacionRegistroResponse(adjunto: DocumentoDivulgacionRegistroModel) {
        let er = {
            ...adjunto,
            fecha_carga: adjunto.fecha_carga * 1000
        };
        return er;
    }
}
