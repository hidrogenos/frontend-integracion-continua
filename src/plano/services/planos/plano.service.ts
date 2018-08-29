import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PlanoModel } from '../../../shared/models/plano.model';
//environment
import { environment } from '../../../environments/environment.prod';


@Injectable()
export class DocumentosPlanosService {
    constructor(
        private http: HttpClient,
    ) {}

    deletePlano(id: number): Observable<PlanoModel> {
        return this.http
            .get<PlanoModel>(
                `${
                    environment.apiUrl
                }/planos/delete-plano/${id}`
            )
            .pipe(catchError((error: any) => throwError(error)));
    }

    downloadPlano(data: { path: string }) {
        return this.http
            .post(`${environment.apiUrl}/utils/get-adjunto`, data, {
                responseType: 'blob'
            })
            .pipe(catchError((error: any) => throwError(error)));
    }

    getPlanosLazy(data): Observable<{ totalRows: number; data: any[] }> {
        return this.http
            .post<{ totalRows: number; data: any[] }>(
                `${environment.apiUrl}/planos/get-planos-lazy`,
                data
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }    

    uploadPlano(idPlano: number,data: any): Observable<PlanoModel[]> {
        return this.http
            .post<PlanoModel[]>(
                `${
                    environment.apiUrl
                }/planos/upload-plano/${idPlano}`,
                data
            )
            .pipe(catchError((error: any) => throwError(error)));
    }

}
