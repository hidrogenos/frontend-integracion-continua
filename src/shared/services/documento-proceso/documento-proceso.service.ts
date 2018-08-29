import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

//environment
import { environment } from '../../../environments/environment';
import { DocumentoProcesoModel } from '../../models/documento-proceso.model';

@Injectable()
export class DocumentoProcesoService {
    constructor(
        private http: HttpClient
    ) { }

    createDocumentoProceso(proceso: DocumentoProcesoModel): Observable<DocumentoProcesoModel> {
        return this.http
            .post<DocumentoProcesoModel>(
                `${environment.apiUrl}/documento-proceso`, proceso
            );
    }

    deleteDocumentoProceso(id: number): Observable<DocumentoProcesoModel> {
        return this.http
            .delete<DocumentoProcesoModel>(
                `${environment.apiUrl}/documento-proceso/${id}`
            );
    }
}
