import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

//environment
import { environment } from '../../../environments/environment';
import { UsuarioModel } from '../../models/usuario.model';
import { UsuarioDocumentoService } from '../usuario-documento/usuario-documento.service';

const url_Point_Api = "/usuarios";

@Injectable()
export class UsuarioService {
    constructor(
        private http: HttpClient,
        private usuarioDocumentoService: UsuarioDocumentoService
    ) {}

    getUsuarios(): Observable<UsuarioModel[]>{
        return this.http.get<UsuarioModel[]>(
            `${
                environment.apiUrl
            }${url_Point_Api}`)
        .pipe(
            catchError((error: any) => Observable.throw(error.json()))
        );
    }

    transformRequestUsuario(usuario: UsuarioModel): UsuarioModel {
        return {
            ...usuario,
            fecha_ingreso: usuario.fecha_ingreso / 1000
        };
    }

    transformResponseUsuario(usuario: UsuarioModel): UsuarioModel {
        return {
            ...usuario,
            fecha_ingreso: usuario.fecha_ingreso * 1000,
            documentos: usuario.documentos.map(documento =>
                this.usuarioDocumentoService.transformResponse(documento)
            )
        };
    }
}
