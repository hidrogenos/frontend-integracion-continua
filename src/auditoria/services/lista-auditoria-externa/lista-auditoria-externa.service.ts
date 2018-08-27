import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ProveedorModel } from '../../../shared/models/proveedor.model';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { UsuarioModel } from '../../../shared/models/usuario.model';
import { ListaPreguntaModel } from '../../../shared/models/auditoria-lista.model';
import { AuditoriaExternaModel } from '../../../shared/models/auditoria-externa.model';
import { AuditoriaExternaService } from '../../../shared/services';

@Injectable()
export class ListaAuditoriaExternaService {
    constructor(
        private http: HttpClient,
        private auditoriaExternaService: AuditoriaExternaService
    ) {}

    createAuditoriaExterna(data: {
        auditoria: AuditoriaExternaModel;
        idsLista: number[];
    }): Observable<AuditoriaExternaModel> {
        const aux = {
            ...data,
            auditoria: this.auditoriaExternaService.transformRequest(
                data.auditoria
            )
        };
        return this.http
            .post<AuditoriaExternaModel>(
                `${
                    environment.apiUrl
                }/auditoria/externa/lista/create-auditoria-externa`,
                aux
            )
            .pipe(
                map(response =>
                    this.auditoriaExternaService.transformResponse(response)
                ),
                catchError(error => throwError(error))
            );
    }

    getFilteredProveedores(data: {
        query: string;
    }): Observable<ProveedorModel[]> {
        return this.http
            .post<ProveedorModel[]>(
                `${
                    environment.apiUrl
                }/auditoria/externa/lista/get-filtered-proveedores`,
                data
            )
            .pipe(catchError(error => throwError(error)));
    }

    getInitialInfo(): Observable<{
        auditores: UsuarioModel[];
        listas_preguntas: ListaPreguntaModel[];
    }> {
        return this.http
            .get<{
                auditores: UsuarioModel[];
                listas_preguntas: ListaPreguntaModel[];
            }>(`${environment.apiUrl}/auditoria/externa/lista/get-initial-info`)
            .pipe(catchError(error => throwError(error)));
    }

    getLazyAuditorias(data): Observable<{ data: any[]; totalRows: number }> {
        return this.http
            .post<{ data: any[]; totalRows: number }>(
                `${
                    environment.apiUrl
                }/auditoria/externa/lista/get-lazy-auditorias`,
                data
            )
            .pipe(catchError(error => throwError(error)));
    }
}
