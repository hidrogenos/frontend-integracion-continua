import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PlanoModel } from '../../../shared/models/plano.model';
//environment
import { environment } from '../../../environments/environment';
import { RegistroModel } from '../../../shared/models/registro.model';

@Injectable()
export class RegistrosService {
    constructor(private http: HttpClient) {}

    deleteRegistro(id: number): Observable<RegistroModel> {
        return this.http
            .get<PlanoModel>(`${environment.apiUrl}/registros/delete-registro/${id}`)
            .pipe(catchError((error: any) => throwError(error)));
    }

    downloadRegistro(data: { path: string }) {
        return this.http
            .post(`${environment.apiUrl}/utils/get-adjunto`, data, {
                responseType: 'blob'
            })
            .pipe(catchError((error: any) => throwError(error)));
    }

    getRegistrosLazy(data): Observable<{ totalRows: number; data: any[] }> {
        return this.http
            .post<{ totalRows: number; data: any[] }>(
                `${environment.apiUrl}/registros/get-registros-lazy`,
                data
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    uploadRegistro(idPlano: number, data: any): Observable<RegistroModel[]> {
        return this.http
            .post<RegistroModel[]>(
                `${environment.apiUrl}/registros/upload-registro/${idPlano}`,
                data
            )
            .pipe(catchError((error: any) => throwError(error)));
    }
}
