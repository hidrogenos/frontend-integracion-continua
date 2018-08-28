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
        proveedores: ProveedorModel[];
    }> {
        return this.http
            .get<{ auditores: UsuarioModel[]; proveedores: ProveedorModel[] }>(
                `${
                    environment.apiUrl
                }/auditoria/externa/detalle/get-initial-info`
            )
            .pipe(catchError(error => throwError(error)));
    }
}
