import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

//environment
import { UsuarioDocumentoModel } from '../../models/usuario-documento.model';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UsuarioDocumentoService {
    constructor(private http: HttpClient) {}

    transformResponse(data: UsuarioDocumentoModel): UsuarioDocumentoModel {
        return {
            ...data,
            fecha_carga: data.fecha_carga * 1000
        };
    }
}
