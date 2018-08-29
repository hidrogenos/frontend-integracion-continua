import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

//environment
import { environment } from '../../../environments/environment';
import { DocumentoEstadoModel } from '../../models/documento-estado.model';

@Injectable()
export class DocumentoEstadoService {
    constructor(
        private http: HttpClient
    ) { }

    getDocumentoEstados(): Observable<DocumentoEstadoModel[]> {
        return this.http
            .get<DocumentoEstadoModel[]>(
                `${environment.apiUrl}/documento-estado`
            );
    }
}
