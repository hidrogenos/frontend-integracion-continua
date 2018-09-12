import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { environment } from "../../../environments/environment";
import { catchError } from "rxjs/operators";
import { DepartamentoModel } from "../../../shared/models/departamento.model";

@Injectable()
export class AdmDepartamentoService{

    constructor(
        private http: HttpClient
    ){}

    getDepartamentos(): Observable<DepartamentoModel[]> {
        return this.http
            .get<DepartamentoModel[]>(
                `${environment.apiUrl}/administracion/departamento/get-departamentos
                `
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    getDepartamentosLazy(data): Observable<{ totalRows: number; data: any[] }> {
        return this.http
            .post<{ totalRows: number; data: any[] }>(
                `${environment.apiUrl}/administracion/departamento/get-departamentos-lazy`,
                data
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    onEliminar(event: DepartamentoModel): Observable<DepartamentoModel>{
        return this.http.delete<DepartamentoModel>(`${environment.apiUrl}/administracion/departamento/delete-departamento/${event.id}`)
    }

    updateDepartamento(id: number, data: DepartamentoModel): Observable<DepartamentoModel>{
        return this.http.post<DepartamentoModel>(`${environment.apiUrl}/administracion/departamento/update-departamento/${id}`,data).pipe(
            catchError((error: any) => throwError(error))
        )
    }
   
}