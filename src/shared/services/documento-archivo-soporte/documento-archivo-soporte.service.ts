import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

//environment
import { environment } from '../../../environments/environment';
import { DocumentoArchivoSoporteModel } from '../../models/documento-archivo-soporte.model';

@Injectable()
export class DocumentoArchivoSoporteService {
    constructor(
        private http: HttpClient
    ) { }

    getArchivoSoporte(id): Observable<DocumentoArchivoSoporteModel>{
        return this.http.get<DocumentoArchivoSoporteModel>(`${environment.apiUrl}/documento-archivo-soporte/${id}`)
        .pipe(
            map(response => this.transformDocumentoArchivoSoporteResponse(response)),
            catchError(error => throwError(error))
        )
    }

    transformDocumentoArchivoSoporteRequest(archivo: DocumentoArchivoSoporteModel) {
        return {
            ...archivo,
            fecha_carga: archivo.fecha_carga / 1000
        }
    }

    transformDocumentoArchivoSoporteResponse(archivo: DocumentoArchivoSoporteModel) {
        let er = {
            ...archivo,
            fecha_carga: archivo.fecha_carga * 1000
        };
        return er;
    }
}
