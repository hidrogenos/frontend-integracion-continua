import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

//environment
import { environment } from '../../../environments/environment';
import { PlanoModel } from '../../models/plano.model';
import { RegistroModel } from '../../models/registro.model';
import { DocumentoExternoModel } from '../../models/documento-externo.model';

@Injectable()
export class DocumentoExternoService {
    constructor(private http: HttpClient) {}

    getRegistro(id): Observable<DocumentoExternoModel>{
        return this.http.get<DocumentoExternoModel>(`${environment.apiUrl}/documentos-externos/${id}`)
        .pipe(
            map(response => this.transformResponsePlano(response)),
            catchError(error => throwError(error))
        )
    }

    transformRequestPlano(documentoExterno: DocumentoExternoModel): DocumentoExternoModel {
        return {
            ...documentoExterno,
            fecha_carga: documentoExterno.fecha_carga / 1000,
            fecha_elimina: documentoExterno.fecha_elimina / 1000
        };
    }

    transformResponsePlano(documentoExterno: DocumentoExternoModel): DocumentoExternoModel {
        return {
            ...documentoExterno,
            fecha_carga: documentoExterno.fecha_carga * 1000,
            fecha_elimina: documentoExterno.fecha_elimina * 1000
        };
    }
}
