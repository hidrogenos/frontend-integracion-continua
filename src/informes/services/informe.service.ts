import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';

import { DocumentoService } from '../../shared/services';
import { map } from 'rxjs/operators';

@Injectable()
export class InformeService {

    constructor(
        private http: HttpClient,
        private documentoService: DocumentoService
    ) { }

    getDocumentosListadoMaestro(filtros) {
        return this.http.post(`${environment.apiUrl}/informes/get-documentos-listado-maestro`, filtros).pipe(
            map((response: any) => {
                return {
                    ...response,
                    documentos: response.documentos.map(documento =>
                        this.documentoService.transformDocumentoResponse(documento)
                    )
                }
            })
        )
    }

    exportPDF(filtros) {
        return this.http.post(`${environment.apiUrl}/informes/export-documentos-pdf`, filtros, {
            responseType: 'blob'
        });
    }
}