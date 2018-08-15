import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { AccionAnalisisTipoModel } from '../../../shared/models/accionAnalisisTipo.model';
import { AccionCorrectivaAnalisisModel } from '../../../shared/models/accion-correctiva-analisis.model';
import { AccionCorrectivaAnalisisHijoModel } from '../../../shared/models/accion-correctiva-analisis-hijo.model';

const url_Point_Api = "/acciones/accion-analisis";

@Injectable()
export class AccionesCorrectivasAnalisisService { 
    
    constructor(private http: HttpClient){ 
    }

    getTiposAnalisis(): Observable<AccionAnalisisTipoModel[]> {
        return this.http.get<AccionAnalisisTipoModel[]>(`${environment.apiUrl}${url_Point_Api}/get-tipos-analisis`)
        .pipe(
            catchError((error:any) => Observable.throw(error.json()))
        );
    }

    crearAnalisisAccionCorrectiva(data: AccionCorrectivaAnalisisModel): Observable<AccionCorrectivaAnalisisModel> {
        return this.http.post<AccionCorrectivaAnalisisModel>(`${environment.apiUrl}${url_Point_Api}/create-accion-analisis`,data)
        .pipe(
            catchError((error:any) => Observable.throw(error.json()))
        );
    }

    createAnalisisAccionCorrectivaHijos(data: AccionCorrectivaAnalisisHijoModel[]): Observable<AccionCorrectivaAnalisisHijoModel[]> {
        return this.http.post<AccionCorrectivaAnalisisHijoModel[]>(`${environment.apiUrl}${url_Point_Api}/create-accion-analisis-hijos`,data)
        .pipe(
            catchError((error:any) => Observable.throw(error.json()))
        );
    }

    updateAnalisisAccionCorrectivaHijos(idAccionAnalisisHijos: number ,data: AccionCorrectivaAnalisisHijoModel): Observable<AccionCorrectivaAnalisisHijoModel>
    {
        return this.http.post<AccionCorrectivaAnalisisHijoModel>(`${environment.apiUrl}${url_Point_Api}/update-accion-analisis-hijos/${idAccionAnalisisHijos}`,data)
        .pipe(
            catchError((error:any) => Observable.throw(error.json()))
        );
    }
}