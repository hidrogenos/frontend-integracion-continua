import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EvaluacionProveedorService } from '../../../shared/services';
import { EvaluacionProveedorModel } from '../../../shared/models/evaluacion-proveedor.model';
//environment
import { environment } from '../../../environments/environment';

@Injectable()
export class EvaluacionService {
    constructor(
        private http: HttpClient,
        private evaluacionProveedorService: EvaluacionProveedorService
    ) {}


    getEvaluaciones(id): Observable<EvaluacionProveedorModel[]> {
        return this.http
            .get<EvaluacionProveedorModel[]>(`${environment.apiUrl}/proveedor/proveedor-evaluacion/get-evaluaciones-proveedor/${id}`)
            .pipe(
                map(evaluaciones => {
                    evaluaciones = evaluaciones.map(evaluacion => 
                        this.evaluacionProveedorService.transformResponseEvaluacion(evaluacion)
                    )
                    return evaluaciones;
                }),
                catchError(error => Observable.throw(error.json())));
    }

    getEvaluacionesLazy(data, id): Observable<{ totalRows: number; data: any[] }> {
        return this.http
            .post<{ totalRows: number; data: any[] }>(
                `${environment.apiUrl}/proveedor/proveedor-evaluacion/get-evaluacion-lazy/${id}`,
                data
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    onEliminar(event: EvaluacionProveedorModel): Observable<EvaluacionProveedorModel> {
        return this.http.delete<EvaluacionProveedorModel>(
            `${environment.apiUrl}/proveedor/proveedor-evaluacion/delete-evaluacion/${event.id}`
        );
    }

    updateEvaluacion(id: number,data: EvaluacionProveedorModel): Observable<EvaluacionProveedorModel> {
        let aux = this.evaluacionProveedorService.transformRequestEvaluacion(data);
        return this.http
            .post<EvaluacionProveedorModel>(
                `${environment.apiUrl}/proveedor/proveedor-evaluacion/update-evaluacion/${id}`,
                aux
            )
            .pipe(map(evaluacion => this.evaluacionProveedorService.transformResponseEvaluacion
            (evaluacion)),
                catchError((error: any) => throwError(error)));
    }
}
