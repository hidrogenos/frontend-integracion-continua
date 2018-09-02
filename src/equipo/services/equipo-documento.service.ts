import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { EquipoAdjuntoModel } from '../../shared/models/equipo-adjunto.model';

@Injectable()
export class EquipoDocumentoService {
    constructor(private http: HttpClient) {}

    deleteEquipoDocumento(idDocumento: number) : Observable<EquipoAdjuntoModel> {
        return this.http.delete<EquipoAdjuntoModel>(`${
            environment.apiUrl
        }/equipo-documento/delete-documento/${idDocumento}`)
        .pipe(
            catchError((error:any) => Observable.throw(error.json()))
        );
    }

    downloadEquipoDocumento(data: { path: string }) {
        return this.http
            .post(`${environment.apiUrl}/utils/get-adjunto`, data, {
                responseType: 'blob'
            })
            .pipe(catchError((error: any) => throwError(error)));
    }

    changeImagen(data) {
        console.log("data")
        return this.http
            .post(
                `${environment.apiUrl}/equipo-documento/change-imagen`,data)
    }
}