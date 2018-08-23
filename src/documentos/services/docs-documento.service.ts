import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { DocumentoAdjuntoModel } from '../../shared/models/documento-adjunto.model';
import { DocumentoAdjuntoService } from '../../shared/services/documento-adjunto/documento-adjunto.service';
import { map } from 'rxjs/operators';

@Injectable()
export class DocsDocumentoService {
    constructor(
        private http: HttpClient,
        private documentoAdjuntoService: DocumentoAdjuntoService
    ) { }

    getDocumentosByIdTipo(filtros, idTipoDocumento: number): any {
        return this.http.post(`${environment.apiUrl}/documentos/get-documentos-by-id-tipo/${idTipoDocumento}`, filtros);
    }

    getUsuariosQuery(queryObject) {
        return this.http.post(`${environment.apiUrl}/documentos/get-user-query`, queryObject);
    }

    getProcesosQuery(queryString) {
        return this.http.post(`${environment.apiUrl}/documentos/get-procesos-query`, { query: queryString });
    }

    createDocumento(idTipoDocumento, documento) {
        return this.http.post(`${environment.apiUrl}/documentos/create-documento/${idTipoDocumento}`, documento);
    }

    updateDocumento(documento) {
        return this.http.post(`${environment.apiUrl}/documentos/update-documento/${documento.id}`, documento);
    }

    updateDocumentoTexto(id: number, documento: string) {
        return this.http.post(`${environment.apiUrl}/documentos/update-documento-texto/${id}`, { documento: documento });
    }

    getDocumentoById(idDocumento: number): any {
        return this.http.get(`${environment.apiUrl}/documentos/get-documento-by-id/${idDocumento}`);
    }

    getProcesosNoAsociados(idDocumento: number): any {
        return this.http.get(`${environment.apiUrl}/documentos/get-procesos-no-asociados/${idDocumento}`);
    }

    uploadAdjuntoByDocumento(idDocumento: number, data): Observable<DocumentoAdjuntoModel[]> {
        return this.http.post<DocumentoAdjuntoModel[]>(`${environment.apiUrl}/documentos/upload-adjuntos-by-documento/${idDocumento}`, data)
            .pipe(
                map(adjuntos => {
                    return adjuntos.map(adjunto => this.documentoAdjuntoService.transformDocumentoAdjuntoResponse(adjunto))
                })
            );
    }
}