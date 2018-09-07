import { Injectable } from "@angular/core";
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { CesantiaModel } from "../../../shared/models/cesantia.model";

@Injectable()

export class AdmCesantiaService{

    constructor(private http: HttpClient){}

    editCesantias(id: number,data: CesantiaModel){
        return this.http
        .post<CesantiaModel>(`${environment.apiUrl}/administracion/cesantias/update-cesantia/${id}`
        ,data).pipe(
            catchError((error: any) => throwError(error))
        );
    }

    getCesantiasLazy(data): Observable<{ totalRows: number; data: any[] }> {
        return this.http
            .post<{ totalRows: number; data: any[] }>(
                `${environment.apiUrl}/administracion/cesantias/get-cesantias-lazy`,
                data
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    onEliminar(event: CesantiaModel): Observable<CesantiaModel> {
        return this.http.delete<CesantiaModel>(
            `${environment.apiUrl}/administracion/cesantias/delete-cesantia/${event.id}`
        );
    }

   
}



