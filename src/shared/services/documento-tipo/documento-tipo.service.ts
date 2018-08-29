import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

//environment
import { environment } from '../../../environments/environment';
import { DocumentoTipoModel } from '../../models/documento-tipo.model';

@Injectable()
export class DocumentoTipoService {
    constructor(
        private http: HttpClient
    ) { }   

    getDocumentoTipos(): Observable<DocumentoTipoModel[]> {
        return this.http
            .get<DocumentoTipoModel[]>(
                `${environment.apiUrl}/documento-tipo`
            );
    }
}
