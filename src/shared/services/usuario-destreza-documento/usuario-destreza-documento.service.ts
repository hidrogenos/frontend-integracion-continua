import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { UsuarioDestrezaDocumentoModel } from '../../models/usuario-destreza-documento.model';

@Injectable()
export class UsuarioDestrezaDocumentoService {
    constructor(private http: HttpClient) {}

    getusuarioDestrezaDocumento(
        id: number
    ): Observable<UsuarioDestrezaDocumentoModel> {
        return this.http
            .get<UsuarioDestrezaDocumentoModel>(
                `${environment.apiUrl}/usuario-destreza-documentos/${id}`
            )
            .pipe(catchError(error => throwError(error)));
    }
}
