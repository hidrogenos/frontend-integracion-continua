import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PaisModel } from "../../../shared/models/pais.model";
import { Observable, throwError } from "rxjs";
import { environment } from "../../../environments/environment";
import { catchError } from "rxjs/operators";

@Injectable()
export class AdmPaisService{

    constructor(
        private http: HttpClient
    ){}

    getPaises(): Observable<PaisModel[]> {
        return this.http
            .get<PaisModel[]>(
                `${environment.apiUrl}/administracion/pais/get-paises
                `
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    getPaisLazy(data): Observable<{ totalRows: number; data: any[] }> {
        return this.http
            .post<{ totalRows: number; data: any[] }>(
                `${environment.apiUrl}/administracion/pais/get-paises-lazy`,
                data
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    onEliminar(event: PaisModel): Observable<PaisModel>{
        return this.http.delete<PaisModel>(`${environment.apiUrl}/administracion/pais/delete-pais/${event.id}`)
    }

    updatePais(id: number, data: PaisModel): Observable<PaisModel>{
        return this.http.post<PaisModel>(`${environment.apiUrl}/administracion/pais/update-pais/${id}`,data).pipe(
            catchError((error: any) => throwError(error))
        )

    }
}