import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EquipoServicioMantenimientoModel } from '../../../shared/models/equipoServicioMantenimiento.model';;
import { environment } from '../../../environments/environment';
import { EquipoService } from '../../services/equipo/equipo.service';

@Injectable()
export class EquipoServicioMantenimientoService {
    constructor(
        private http: HttpClient,
        private equipoService: EquipoService
    ) {}

 

    updateEquipoServicio(id: number, data: EquipoServicioMantenimientoModel): Observable<EquipoServicioMantenimientoModel> {
        let aux = this.transformEquipoServicioRequest(data);
        return this.http
            .put<EquipoServicioMantenimientoModel>(
                `${environment.apiUrl}/equipo-servicios/${id}`,
                aux
            )
    }

    transformEquipoServicioRequest(equipo: EquipoServicioMantenimientoModel) {
        return {
            ...equipo,
            fecha_servicio: equipo.fecha_servicio / 1000,
            fecha_proximo_servicio: equipo.fecha_proximo_servicio / 1000,       
           
        };
    }

    transformEquipoServicioResponse(equipo: EquipoServicioMantenimientoModel) {
        return {
            ...equipo,
            fecha_servicio: equipo.fecha_servicio * 1000,
            fecha_proximo_servicio: equipo.fecha_proximo_servicio * 1000,       
        };
    }
}