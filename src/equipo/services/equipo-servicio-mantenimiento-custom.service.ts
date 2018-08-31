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
export class EquipoServicioMantenimientoCustomService {
    constructor(        
        private http: HttpClient,
        private equipoService: EquipoService,
        private equipoServicioMantenimiento: EquipoServicioMantenimientoService
    ) {}

    getFechas(id): Observable<EquipoModel> {
        return this.http
            .get<EquipoModel>(
                `${environment.apiUrl}/equipo-servicio-mantenimiento/get-fechas/${id}`,
                
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

    createServicioEquipo(data: EquipoServicioMantenimientoModel): Observable<EquipoServicioMantenimientoModel> {
        let aux = this.equipoServicioMantenimiento.transformEquipoServicioRequest(data);
        return this.http
            .post<EquipoServicioMantenimientoModel>(
                `${environment.apiUrl}/equipo-servicio-mantenimiento/create-equipo-servicio-mantenimiento`,
                aux
            ).pipe(
                catchError(error => Observable.throw(error.json()))
            )
    }
}