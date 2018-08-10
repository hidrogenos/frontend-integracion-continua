import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CalidadModel } from '../../../shared/models/calidad.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class NuestraEmpresaService {
    constructor(private http: HttpClient) {}

    getDetalleCalidad(): Observable<CalidadModel> {
        return this.http
            .get<CalidadModel>(
                `${environment.apiUrl}/calidad/get-detalle-calidad`
            )
            .pipe(catchError((error: any) => throwError(error)));
    }

    updateEmpresaNombre(
        id,
        data: { empresa_nombre: string }
    ): Observable<CalidadModel> {
        return this.http
            .post<CalidadModel>(
                `${environment.apiUrl}/calidad/update-empresa-nombre/${id}`,
                data
            )
            .pipe(catchError((error: any) => throwError(error)));
    }

    updateLogoEmpresa(id: number, data: any): Observable<CalidadModel> {
        return this.http
            .post<CalidadModel>(
                `${environment.apiUrl}/calidad/update-logo-empresa/${id}`,
                data
            )
            .pipe(catchError((error: any) => throwError(error)));
    }

    downloadAdjunto(data: { path: string }) {
        return this.http
            .post(`${environment.apiUrl}/utils/get-adjunto`, data, {
                responseType: 'blob'
            })
            .pipe(catchError((error: any) => throwError(error)));
    }
}
