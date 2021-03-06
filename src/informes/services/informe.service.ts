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

    getInformeListaChequeoPDF() {
        return this.http.get(`${environment.apiUrl}/informes/export-informe-lista-chequeo`, { responseType: 'blob' });
    }

    exportPDF(filtros) {
        return this.http.post(`${environment.apiUrl}/informes/export-documentos-pdf`, filtros, {
            responseType: 'blob'
        });
    }

    
    exportPDFAuditoriaExterna(idAuditoria: number,filtros) {
        return this.http.post(`${environment.apiUrl}/informes/export-informe-auditoria-externa/${idAuditoria}`, filtros,{                
            responseType: 'blob'});
    }

    exportPDF2AuditoriaExterna(idAuditoria: number,filtros) {
        return this.http.post(`${environment.apiUrl}/informes/export-informe-plan-estudio-externa/${idAuditoria}`, filtros,{
            responseType: 'blob'});
    }

}