import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, map } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { throwError } from 'rxjs';
import { DocumentoService } from '../../shared/services';

@Injectable()
export class BeBandejaEntradaService {
    constructor(
        private http: HttpClient,
        private documentoService: DocumentoService
    ) { }

    getDocumentosVigentesAsoc(filtros) {
        return this.http
            .post(`${environment.apiUrl}/bandeja-entrada/be-documentos-vigentes-asoc`, filtros)
            .pipe(
                map((response: any) => {
                    return {
                        ...response,
                        documentos: response.documentos
                            .map(documento => this.documentoService.transformDocumentoResponse(documento))
                    }
                }),
                catchError(error => throwError(error.json())));
    }

}