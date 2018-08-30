import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { AuditoriaExternaModel } from '../../../shared/models/auditoria-externa.model';
import { UsuarioModel } from '../../../shared/models/usuario.model';
import { AuditoriaExternaService } from '../../../shared/services';
import { ProveedorModel } from '../../../shared/models/proveedor.model';

@Injectable()
export class DetalleAuditoriaExternaService {
    constructor(
        private auditoriaExternaService: AuditoriaExternaService,
        private http: HttpClient
    ) {}

    getAuditoriaExterna(id): Observable<AuditoriaExternaModel> {
        return this.http
            .get<AuditoriaExternaModel>(
                `${
                    environment.apiUrl
                }/auditoria/externa/detalle/get-auditoria/${id}`
            )
            .pipe(
                map(response =>
                    this.auditoriaExternaService.transformResponse(response)
                ),
                catchError(error => throwError(error))
            );
    }

    getInitialInfo(): Observable<{
        auditores: UsuarioModel[];
    }> {
        return this.http
            .get<{ auditores: UsuarioModel[]; proveedores: ProveedorModel[] }>(
                `${
                    environment.apiUrl
                }/auditoria/externa/detalle/get-initial-info`
            )
            .pipe(catchError(error => throwError(error)));
    }

    serachProveedor(data: { query: string }): Observable<ProveedorModel[]> {
        return this.http
            .post<ProveedorModel[]>(
                `${
                    environment.apiUrl
                }/auditoria/externa/detalle/search-proveedor`,
                data
            )
            .pipe(catchError(error => throwError(error)));
    }

    updateDatosBasicos(
        id: number,
        data: AuditoriaExternaModel
    ): Observable<AuditoriaExternaModel> {
        const aux: AuditoriaExternaModel = this.auditoriaExternaService.transformRequest(
            data
        );
        return this.http
            .post<AuditoriaExternaModel>(
                `${
                    environment.apiUrl
                }/auditoria/externa/detalle/update-datos-basicos/${id}`,
                aux
            )
            .pipe(
                map(response =>
                    this.auditoriaExternaService.transformResponse(response)
                ),
                catchError(error => throwError(error))
            );
    }
}
