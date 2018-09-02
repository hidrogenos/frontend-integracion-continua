import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EquipoModel } from '../../shared/models/equipo.model'
import { environment } from '../../environments/environment';
import { EquipoService } from '../../shared/services/equipo/equipo.service';
import { ProveedorModel } from '../../shared/models/proveedor.model';
import { EquipoAdjuntoModel } from '../../shared/models/equipo-adjunto.model';
import { EquipoServicioMantenimientoModel } from '../../shared/models/equipoServicioMantenimiento.model';
import { EquipoServicioMantenimientoService } from '../../shared/services';


@Injectable()
export class EquipoCustomService {
    constructor(
        private http: HttpClient,
        private equipoService: EquipoService,
        private equipoServicioService: EquipoServicioMantenimientoService
    ) { }

    getEquipoDetalle(id): Observable<EquipoModel> {
        return this.http
            .get<EquipoModel>(
                `${environment.apiUrl}/equipo/get-detalle-equipo/${id}`
            )
            .pipe(
                map(response => {
                    return this.equipoService.transformEquipoResponse(
                        response
                    );
                }),
                catchError(error => Observable.throw(error.json()))
            );
    }

    getEquipoServicioDetalle(id): Observable<EquipoModel> {
        return this.http
            .get<EquipoModel>(
                `${environment.apiUrl}/equipo/get-detalle-equipo-servicio/${id}`
            )
            .pipe(
              
                catchError(error => Observable.throw(error.json()))
            );
    }

    getEquiposLazy(data): Observable<{ totalRows: number; equipos: any[] }> {      
        return this.http
            .post<{ totalRows: number; equipos: any[] }>(
                `${environment.apiUrl}/equipo/get-equipos-lazy`,
                data
            )
            .pipe(
                map(equipos => {
                    equipos.equipos = equipos.equipos.map(equipo => this.equipoService.transformEquipoResponse(equipo));
                    return equipos;
                }),
                catchError((error: any) => Observable.throw(error.json())));
    }
    
    getEquiposServicioMantenimientoLazy(data, idEquipo): Observable<{ totalRows: number; equipos: any[] }> {
        return this.http
            .post<{ totalRows: number; equipos: any[] }>(
                `${environment.apiUrl}/equipo/get-equipos-servicio-lazy/${idEquipo}`,
                data
            )
            .pipe(
                map(equipos => {
                    equipos.equipos = equipos.equipos.map(equipo => this.equipoServicioService.transformEquipoServicioResponse(equipo));
                    return equipos;
                }),
                catchError((error: any) => Observable.throw(error.json())));
    }
    
    updateEquipo(id: number, data: EquipoModel): Observable<EquipoModel> {
        let aux = this.equipoService.transformEquipoRequest(data);
        return this.http
            .post<EquipoModel>(
                `${
                environment.apiUrl
                }/equipo/update-equipo/${id}`,
                aux
            )
            .pipe(catchError((error: any) => throwError(error)));
    }

    getEliminarEquipo(event: EquipoModel): Observable<EquipoModel> {
        console.log(event);
        return this.http.delete<EquipoModel>(
            `${environment.apiUrl}/equipo/delete-equipo/${event.id}`
        );
    }

    getEliminarEquipoServicio(event: EquipoServicioMantenimientoModel): Observable<EquipoModel> {
        console.log(event);
        return this.http.delete<EquipoModel>(
            `${environment.apiUrl}/equipo/delete-equipo-servicio/${event.id}`
        );
    }

    uploadDocumentosEquipo( idEquipo: number ,data ): Observable<EquipoAdjuntoModel[]> {
        return this.http.post<EquipoAdjuntoModel[]>(`${environment.apiUrl}/equipo/upload-documentos/${idEquipo}`,data)
        .pipe(
            catchError((error:any) => Observable.throw(error.json()))
        );
    }
}