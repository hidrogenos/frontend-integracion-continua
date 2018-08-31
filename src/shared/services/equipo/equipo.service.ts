import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EquipoModel } from '../../../shared/models/equipo.model';
import { environment } from '../../../environments/environment';
import { EquipoAdjuntoService } from '../equipo-adjunto/equipo-adjunto.service';

@Injectable()
export class EquipoService {

    constructor(private http: HttpClient,
        private equipoAdjuntoService: EquipoAdjuntoService) { }

    getEquipos(): Observable<EquipoModel[]> {
        return this.http

            .get<EquipoModel[]>(`${environment.apiUrl}/equipos`)
            .pipe(
                catchError(error => Observable.throw(error.json))
            )
    }

    createEquipo(
        equipo: EquipoModel
    ): Observable<EquipoModel> {
        equipo = this.transformEquipoRequest(equipo);
        return this.http
            .post<EquipoModel>(
                `${environment.apiUrl}/equipos`,
                equipo
            )
            .pipe(
                map(equipoEquipo =>
                    this.transformEquipoResponse(equipo)
                ),
                catchError(error => Observable.throw(error.json)));
    }

    transformEquipoRequest(equipo: EquipoModel) {
        if (equipo.documentos) {
            equipo.documentos = equipo.documentos.map(item => this.equipoAdjuntoService.transformEquipoAdjuntoRequest(item))
        }
        return {
            ...equipo,
            fecha_compra: equipo.fecha_compra / 1000,
            fecha_calibracion: equipo.fecha_calibracion / 1000,
            fecha_calificacion: equipo.fecha_calificacion / 1000,
            fecha_metrologia: equipo.fecha_metrologia / 1000,
            fecha_mantenimiento_preventivo: equipo.fecha_mantenimiento_preventivo / 1000,
            fecha_mantenimiento_correctivo: equipo.fecha_mantenimiento_correctivo / 1000,
            fecha_proxima_compra: equipo.fecha_proxima_compra / 1000,
            fecha_proxima_calibracion: equipo.fecha_proxima_calibracion / 1000,
            fecha_proxima_calificacion: equipo.fecha_proxima_calificacion / 1000,
            fecha_proxima_metrologia: equipo.fecha_proxima_metrologia / 1000,
            fecha_proximo_mantenimiento_preventivo: equipo.fecha_proximo_mantenimiento_preventivo / 1000,
            fecha_proximo_mantenimiento_correctivo: equipo.fecha_proximo_mantenimiento_correctivo / 1000
        };
    }

    transformEquipoResponse(equipo: EquipoModel) {
        if (equipo.documentos) {
            equipo.documentos = equipo.documentos.map(item => this.equipoAdjuntoService.transformEquipoAdjuntoResponse(item))
        }
        return {
            ...equipo,
            fecha_compra: equipo.fecha_compra * 1000,
            fecha_calibracion: equipo.fecha_calibracion * 1000,
            fecha_calificacion: equipo.fecha_calificacion * 1000,
            fecha_metrologia: equipo.fecha_metrologia * 1000,
            fecha_mantenimiento_preventivo: equipo.fecha_mantenimiento_preventivo * 1000,
            fecha_mantenimiento_correctivo: equipo.fecha_mantenimiento_correctivo * 1000,
            fecha_proxima_compra: equipo.fecha_proxima_compra ?  equipo.fecha_proxima_compra * 1000 : null,
            fecha_proxima_calibracion: equipo.fecha_proxima_calibracion ? equipo.fecha_proxima_calibracion * 1000 : null,
            fecha_proxima_calificacion: equipo.fecha_proxima_calificacion ?  equipo.fecha_proxima_calificacion * 1000 : null,
            fecha_proxima_metrologia: equipo.fecha_proxima_metrologia ? equipo.fecha_proxima_metrologia  * 1000 : null,
            fecha_proximo_mantenimiento_preventivo: equipo.fecha_proximo_mantenimiento_preventivo ? equipo.fecha_proximo_mantenimiento_preventivo * 1000 : null,
            fecha_proximo_mantenimiento_correctivo: equipo.fecha_proximo_mantenimiento_correctivo ? equipo.fecha_proximo_mantenimiento_correctivo * 1000 : null
        };
    }
}