import { environment } from "../../../environments/environment";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { AccionProcesoModel } from "../../../shared/models/accion-proceso.model";
import { MapaProcesoHijoModel } from "../../../shared/models/mapa_proceso_hijo.model";

const url_Point_Api = "/acciones/accion-correctiva-proceso";

@Injectable()
export class AccionesCorrectivasProcesoService {
    constructor(private http: HttpClient) {}

    getJefesProcesos(): Observable<MapaProcesoHijoModel[]> {
        return this.http
            .get<MapaProcesoHijoModel[]>(
                `${environment.apiUrl}${url_Point_Api}/get-jefes-procesos`
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    getProcesosByAccionCorrectiva(
        id: number
    ): Observable<AccionProcesoModel[]> {
        return this.http
            .get<AccionProcesoModel[]>(
                `${
                    environment.apiUrl
                }${url_Point_Api}/get-procesos-by-accion-correctiva/${id}`
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    addProcesoToAccionCorrectiva(
        data: AccionProcesoModel[]
    ): Observable<AccionProcesoModel[]> {
        return this.http
            .post<AccionProcesoModel[]>(
                `${
                    environment.apiUrl
                }${url_Point_Api}/add-proceso-to-accion-correctiva
        `,
                data
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    deleteProcesoFromAccionCorrectiva(
        idProceso: number
    ): Observable<AccionProcesoModel> {
        return this.http
            .delete<AccionProcesoModel>(
                `${
                    environment.apiUrl
                }${url_Point_Api}/delete-proceso-from-accion-correctiva/${idProceso}
        `
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }
}
