import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PlanoModel } from '../../../shared/models/plano.model';
//environment
import { environment } from '../../../environments/environment';
import { DocumentoExternoModel } from '../../../shared/models/documento-externo.model';

@Injectable()
export class DocumentosExternosService {
    constructor(private http: HttpClient) {}

    deleteDocumentoExterno(id: number): Observable<DocumentoExternoModel> {
        return this.http
            .get<PlanoModel>(`${environment.apiUrl}/documentos-externos/delete-documento-externo/${id}`)
            .pipe(catchError((error: any) => throwError(error)));
    }

    downloadDocumentoExterno(data: { path: string }) {
        return this.http
            .post(`${environment.apiUrl}/utils/get-adjunto`, data, {
                responseType: 'blob'
            })
            .pipe(catchError((error: any) => throwError(error)));
    }

    getDocumentosExternosLazy(data): Observable<{ totalRows: number; data: any[] }> {
        return this.http
            .post<{ totalRows: number; data: any[] }>(
                `${environment.apiUrl}/documentos-externos/get-documentos-externos-lazy`,
                data
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    uploadDocumentoExterno(idPlano: number, data: any): Observable<DocumentoExternoModel[]> {
        return this.http
            .post<PlanoModel[]>(
                `${environment.apiUrl}/documentos-externos/upload-documento-externo/${idPlano}`,
                data
            )
            .pipe(catchError((error: any) => throwError(error)));
    }
}
