import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { environment } from "../../../environments/environment";
import { catchError } from "rxjs/operators";
import { CiudadModel } from "../../../shared/models/ciudad.model";

@Injectable()

export class AdmCiudadService{

    constructor(
        private http: HttpClient
    ){}

    getCiudadesLazy(data): Observable<{ totalRows: number; data: any[] }> {
        return this.http
            .post<{ totalRows: number; data: any[] }>(
                `${environment.apiUrl}/administracion/ciudad/get-ciudades-lazy`,
                data
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    onEliminar(event: CiudadModel): Observable<CiudadModel>{
        return this.http.delete<CiudadModel>(`${environment.apiUrl}/administracion/ciudad/delete-ciudad/${event.id}`)
    }

    updateCiudad(id: number,data: CiudadModel): Observable<CiudadModel>{
        return this.http.post<CiudadModel>(`${environment.apiUrl}/administracion/ciudad/update-ciudad/${id}`,data).pipe(
            catchError((error: any) => throwError(error))
        )
    }


}