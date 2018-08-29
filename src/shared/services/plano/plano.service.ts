import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

//environment
import { environment } from '../../../environments/environment';
import { PlanoModel } from '../../models/plano.model';

@Injectable()
export class PlanoService {
    constructor(private http: HttpClient) {}

    getPlano(id): Observable<PlanoModel>{
        return this.http.get<PlanoModel>(`${environment.apiUrl}/planos/${id}`)
        .pipe(
            map(response => this.transformResponsePlano(response)),
            catchError(error => throwError(error))
        )
    }

    transformRequestPlano(plano: PlanoModel): PlanoModel {
        return {
            ...plano,
            fecha_carga: plano.fecha_carga / 1000,
            fecha_elimina: plano.fecha_elimina / 1000
        };
    }

    transformResponsePlano(plano: PlanoModel): PlanoModel {
        return {
            ...plano,
            fecha_carga: plano.fecha_carga * 1000,
            fecha_elimina: plano.fecha_elimina * 1000
        };
    }
}
