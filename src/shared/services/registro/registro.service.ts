import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

//environment
import { environment } from '../../../environments/environment';
import { PlanoModel } from '../../models/plano.model';
import { RegistroModel } from '../../models/registro.model';

@Injectable()
export class RegistroService {
    constructor(private http: HttpClient) {}

    getRegistro(id): Observable<RegistroModel>{
        return this.http.get<RegistroModel>(`${environment.apiUrl}/registros/${id}`)
        .pipe(
            map(response => this.transformResponsePlano(response)),
            catchError(error => throwError(error))
        )
    }

    transformRequestPlano(registro: RegistroModel): RegistroModel {
        return {
            ...registro,
            fecha_carga: registro.fecha_carga / 1000,
            fecha_elimina: registro.fecha_elimina / 1000
        };
    }

    transformResponsePlano(registro: RegistroModel): RegistroModel {
        return {
            ...registro,
            fecha_carga: registro.fecha_carga * 1000,
            fecha_elimina: registro.fecha_elimina * 1000
        };
    }
}
