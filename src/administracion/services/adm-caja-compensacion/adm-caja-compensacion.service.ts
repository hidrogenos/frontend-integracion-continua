import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CajaCompensacionModel } from "../../../shared/models/caja-compensacion.model";
import { environment } from "../../../environments/environment";
import { catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";

@Injectable()

export class AdmCajaCompensacionSevice{

    constructor(
        private http: HttpClient
    ){}

    editCajaCompensacion(id: number, data: CajaCompensacionModel){
        return this.http.
        post<CajaCompensacionModel>(`${environment.apiUrl}/administracion/caja-compensacion/update-caja-compensacion/${id}`
        ,data).pipe(
            catchError((error: any) => throwError(error) )
        );

    }

    getCajasCompensacionLazy(data): Observable<{ totalRows: number; data: any[] }> {
        return this.http
            .post<{ totalRows: number; data: any[] }>(
                `${environment.apiUrl}/administracion/caja-compensacion/get-cajas-compensacion-lazy`,
                data
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    onEliminar(event: CajaCompensacionModel): Observable<CajaCompensacionModel>{
        return this.http.delete<CajaCompensacionModel>(
            `${environment.apiUrl}/administracion/caja-compensacion/delete-caja-compensacion/${event.id}`
        );

    }

}