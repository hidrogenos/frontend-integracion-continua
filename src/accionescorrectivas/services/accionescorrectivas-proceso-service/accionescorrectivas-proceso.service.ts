import { environment } from '../../../environments/environment';
import { AccionModel } from '../../../shared/models/accion.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AccionImportanciaModel } from '../../../shared/models/accion-importancia.model';
import { AccionProcesoModel } from '../../../shared/models/accion-proceso.model';
import { AccionEstadoModel } from '../../../shared/models/accion-estado.model';

const url_Point_Api = "/acciones/acciones-correctivas-procesos";

@Injectable()
export class AccionesCorrectivasProcesoService{ 
    constructor(private http: HttpClient){

    }

    getProcesosByAccionCorrectiva( id: number): Observable<AccionProcesoModel[]>{
        return this.http.get<AccionProcesoModel[]>(`${
            environment.apiUrl
        }${url_Point_Api}/get-procesos-by-accion-correctiva/${id}`)
        .pipe(
            catchError((error:any) => Observable.throw(error.json()))
        );
    }

    addProcesoToAccionCorrectiva( data: AccionProcesoModel[]): Observable<AccionProcesoModel[]> {
        return this.http.post<AccionProcesoModel[]>(`${
            environment.apiUrl
        }${url_Point_Api}/add-proceso-to-accion-correctiva
        ` ,data)
        .pipe(
            catchError((error:any) => Observable.throw(error.json()))
        );
    }

    deleteProcesoFromAccionCorrectiva(idProceso: number): Observable<AccionProcesoModel>{
        return this.http.delete<AccionProcesoModel>(`${
            environment.apiUrl
        }${url_Point_Api}/delete-proceso-from-accion-correctiva/${idProceso}
        `).pipe(
            catchError((error:any) => Observable.throw(error.json()))
        );
    }
}