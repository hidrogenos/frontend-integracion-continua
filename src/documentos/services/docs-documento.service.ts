import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DocumentoAdjuntoModel } from '../../shared/models/documento-adjunto.model';

import { DocumentoService } from '../../shared/services/documento/documento.service';

import { DocumentoDivulgacionRegistroService, DocumentoAdjuntoService } from '../../shared/services';

export interface DataEstado {
    estado: number,
    data: {
        observacion?: string,
        fecha_inicio?: number,
        fecha_fin?: number
    }
}


@Injectable()
export class DocsDocumentoService {
    constructor(
        private http: HttpClient,
        private documentoService: DocumentoService,
        private documentoAdjuntoService: DocumentoAdjuntoService,
        private documentoDivulgacionRegistroService: DocumentoDivulgacionRegistroService
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
        return this.http.get(`${environment.apiUrl}/documentos/get-documento-by-id/${idDocumento}`)
            .pipe(
                map(documento => this.documentoService.transformDocumentoResponse(documento))
            );
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

    uploadAdjuntoFlujoByDocumento(idDocumento: number, data): Observable<DocumentoAdjuntoModel[]> {
        return this.http.post<DocumentoAdjuntoModel[]>(`${environment.apiUrl}/documentos/upload-adjuntos-flujo-by-documento/${idDocumento}`, data)
            .pipe(
                map(adjuntos => {
                    return adjuntos.map(adjunto =>
                        this.documentoDivulgacionRegistroService.transformDocumentoDivulgacionRegistroResponse(adjunto))
                })
            );
    }

    getDocumentoQueryByTipo(filter: { query: string, id_tipo_documento: number }) {
        return this.http.post(`${environment.apiUrl}/documentos/get-documento-query-by-tipo`, filter);
    }

    updateEstadoDocumento(idDocumento: number, data: DataEstado) {
        return this.http.post(`${environment.apiUrl}/documentos/update-estado-documento/${idDocumento}`, data);
    }

    getDocumentosReemplazoQuery(filter: { query: string, id_documento: number }) {
        return this.http.post(`${environment.apiUrl}/documentos/get-documentos-reemplazo-query`, filter);
    }
}