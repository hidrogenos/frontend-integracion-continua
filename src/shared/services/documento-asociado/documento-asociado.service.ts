import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

//environment
import { environment } from '../../../environments/environment';
import { DocumentoAsociadoModel } from '../../models/documento-asociado.model';

@Injectable()
export class DocumentoAsociadoService {
    constructor(
        private http: HttpClient
    ) { }

    createDocumentoAsociado(proceso: DocumentoAsociadoModel): Observable<DocumentoAsociadoModel> {
        return this.http
            .post<DocumentoAsociadoModel>(
                `${environment.apiUrl}/documento-asociado`, proceso
            );
    }

    deleteDocumentoAsociado(id: number): Observable<DocumentoAsociadoModel> {
        return this.http
            .delete<DocumentoAsociadoModel>(
                `${environment.apiUrl}/documento-asociado/${id}`
            );
    }
}
