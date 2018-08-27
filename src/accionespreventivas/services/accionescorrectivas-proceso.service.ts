import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { AccionProcesoModel } from "../../shared/models/accion-proceso.model";

const url_Point_Api = "/acciones/accion-preventiva-proceso";

@Injectable()
export class AccionesPreventivasProcesoService {
    constructor(private http: HttpClient) {}

    getProcesosByAccionPreventiva(
        id: number
    ): Observable<AccionProcesoModel[]> {
        return this.http
            .get<AccionProcesoModel[]>(
                `${
                    environment.apiUrl
                }${url_Point_Api}/get-procesos-by-accion-preventiva/${id}`
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    addProcesoToAccionPreventiva(
        data: AccionProcesoModel[]
    ): Observable<AccionProcesoModel[]> {
        return this.http
            .post<AccionProcesoModel[]>(
                `${
                    environment.apiUrl
                }${url_Point_Api}/add-proceso-to-accion-preventiva
        `,
                data
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    deleteProcesoFromAccionPreventiva(
        idProceso: number
    ): Observable<AccionProcesoModel> {
        return this.http
            .delete<AccionProcesoModel>(
                `${
                    environment.apiUrl
                }${url_Point_Api}/delete-proceso-from-accion-preventiva/${idProceso}
        `
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }
}
