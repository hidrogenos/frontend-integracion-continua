import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuditoriaListaModel } from '../../../shared/models/auditoria-lista.model';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable()
export class AdministradorListasService {
    constructor(private http: HttpClient) {}

    createLista(data: AuditoriaListaModel): Observable<AuditoriaListaModel> {
        return this.http
            .post<AuditoriaListaModel>(
                `${
                    environment.apiUrl
                }/auditoria/administrador-listas/create-lista`,
                data
            )
            .pipe(catchError(error => throwError(error)));
    }

    getLista(id: number): Observable<AuditoriaListaModel> {
        return this.http
            .get<AuditoriaListaModel>(
                `${
                    environment.apiUrl
                }/auditoria/administrador-listas/get-lista/${id}`
            )
            .pipe(catchError(error => throwError(error)));
    }

    getListas(): Observable<AuditoriaListaModel[]> {
        return this.http
            .get<AuditoriaListaModel[]>(
                `${
                    environment.apiUrl
                }/auditoria/administrador-listas/get-listas`
            )
            .pipe(catchError(error => throwError(error)));
    }
}
