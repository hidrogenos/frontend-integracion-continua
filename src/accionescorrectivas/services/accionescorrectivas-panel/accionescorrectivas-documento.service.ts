import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { AccionCorrectivaAdjuntoModel } from '../../../shared/models/accion-correctiva-adjunto.model';

const url_Point_Api = "/acciones/accion-correctiva-documento";

@Injectable()
export class AccionesCorrectivasDocumentoService{ 

    constructor(private http: HttpClient) {
    }

    getDocumentosByAccionCorrectiva( idAccionCorrectiva: number): Observable<AccionCorrectivaAdjuntoModel[]> {
        return this.http.get<AccionCorrectivaAdjuntoModel[]>(`${environment.apiUrl}${url_Point_Api}/get-documentos/${idAccionCorrectiva}`)
        .pipe(
            map((response) => response.map(documento => this.transformAccionCorrectivaDocumento(documento)) ),
            catchError((error:any) => Observable.throw(error.json()))
        );
    }

    downloadAccionCorrectivaDocumento(data: { path: string }){
        return this.http
            .post(`${environment.apiUrl}/utils/get-adjunto`, data, {
                responseType: 'blob'
            })
            .pipe(
                catchError((error: any) => throwError(error))
            );
    }

    uploadDocumentosByAccionCorrectiva( idAccionCorrectiva: number ,data ): Observable<AccionCorrectivaAdjuntoModel[]> {
        return this.http.post<AccionCorrectivaAdjuntoModel[]>(`${environment.apiUrl}${url_Point_Api}/upload-documentos/${idAccionCorrectiva}`,data)
        .pipe(
            catchError((error:any) => Observable.throw(error.json()))
        );
    }

    deleteDocumentoByAccionCorrectiva(idDocumento: number) : Observable<AccionCorrectivaAdjuntoModel> {
        return this.http.delete<AccionCorrectivaAdjuntoModel>(`${
            environment.apiUrl
        }${url_Point_Api}/delete-documento/${idDocumento}`)
        .pipe(
            catchError((error:any) => Observable.throw(error.json()))
        );
    }

    transformAccionCorrectivaDocumento(data: AccionCorrectivaAdjuntoModel){
        const accionCorrectivaDocumento : AccionCorrectivaAdjuntoModel = {
            ...data,
            fecha_carga: data.fecha_carga * 1000
        }

        return accionCorrectivaDocumento;
    }
}