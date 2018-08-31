import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { EquipoAdjuntoModel} from '../../models/equipo-adjunto.model';

@Injectable()
export class EquipoAdjuntoService {
    constructor(
        private http: HttpClient,
    ) {}

    transformEquipoAdjuntoRequest(equipo: EquipoAdjuntoModel) {
        return {
            ...equipo,
            fecha_carga: equipo.fecha_carga / 1000,       
        };
    }

    transformEquipoAdjuntoResponse(equipo: EquipoAdjuntoModel) {
        return {
            ...equipo,
            fecha_carga: equipo.fecha_carga * 1000,       

        };
    }
}