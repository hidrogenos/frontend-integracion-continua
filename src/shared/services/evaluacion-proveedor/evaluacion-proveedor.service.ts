import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

//environment
import { environment } from '../../../environments/environment';
import { EvaluacionProveedorModel } from '../../models/evaluacion-proveedor.model';

@Injectable()
export class EvaluacionProveedorService {
    constructor(private http: HttpClient) {}

    getEvaluaciones(): Observable<EvaluacionProveedorModel[]> {
        return this.http
            .get<EvaluacionProveedorModel[]>(`${environment.apiUrl}/evaluaciones-proveedor`)
            .pipe(catchError(error => Observable.throw(error.json())));
    }

    createEvaluacion(evaluacion: EvaluacionProveedorModel): Observable<EvaluacionProveedorModel> {
        this.transformRequestEvaluacion(evaluacion);
        return this.http
            .post<EvaluacionProveedorModel>(`${environment.apiUrl}/evaluaciones-proveedor`, evaluacion)
            .pipe(map( evaluacion => this.transformResponseEvaluacion(evaluacion)),
                catchError(error => Observable.throw(error.json())));
    }
    
    editEvaluacion(evaluacion: EvaluacionProveedorModel):Observable<EvaluacionProveedorModel>{
        console.log(evaluacion.id)
        return this.http.put<EvaluacionProveedorModel>(`${environment.apiUrl}/evaluaciones-proveedor/${evaluacion.id}`,evaluacion)
        .pipe(
        catchError(error => Observable.throw(error.json())));;
    }

    transformRequestEvaluacion(evaluacion: EvaluacionProveedorModel): EvaluacionProveedorModel {
        return {
            ...evaluacion,
            fecha_calificacion: evaluacion.fecha_calificacion / 1000,
        };
    }

    transformResponseEvaluacion(evaluacion: EvaluacionProveedorModel): EvaluacionProveedorModel {
        return {
            ...evaluacion,
            fecha_calificacion: evaluacion.fecha_calificacion * 1000,
        };
    }
}
