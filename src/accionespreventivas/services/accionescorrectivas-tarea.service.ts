import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { environment } from "../../environments/environment.prod";
import { AccionPreventivaTareaModel } from "../../shared/models/accion-preventiva-tarea.model";
import { AccionPreventivaTareaTipoModel } from "../../shared/models/accion-preventiva-tarea-tipo.model";
import { AccionPreventivaTareaService } from "../../shared/services/accionpreventiva-tarea/accionpreventiva-tarea.service";

const url_Point_Api = "/acciones/accion-preventiva-tarea";

@Injectable()
export class AccionesPreventivasTareaService {
    constructor(
        private http: HttpClient,
        private accionPreventivaTareaService: AccionPreventivaTareaService
    ) {}

    getAccionPreventivaTareaTipos(): Observable<
        AccionPreventivaTareaTipoModel[]
    > {
        return this.http
            .get<AccionPreventivaTareaTipoModel[]>(
                `${
                    environment.apiUrl
                }${url_Point_Api}/get-accion-preventiva-tarea-tipos`
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    createAccionPreventivaTarea(
        data: AccionPreventivaTareaModel
    ): Observable<AccionPreventivaTareaModel> {
        return this.http
            .post<AccionPreventivaTareaModel>(
                `${
                    environment.apiUrl
                }${url_Point_Api}/create-accion-preventiva-tarea
        `,
                data
            )
            .pipe(
                map(response =>
                    this.accionPreventivaTareaService.transformResponse(
                        response
                    )
                ),
                catchError((error: any) => Observable.throw(error.json()))
            );
    }

    updateAccionPreventivaTarea(
        id: number,
        data: AccionPreventivaTareaModel
    ): Observable<AccionPreventivaTareaModel> {
        return this.http
            .post<AccionPreventivaTareaModel>(
                `${
                    environment.apiUrl
                }${url_Point_Api}/update-accion-preventiva-tarea/${id}
        `,
                data
            )
            .pipe(
                map(response =>
                    this.accionPreventivaTareaService.transformResponse(
                        response
                    )
                ),
                catchError((error: any) => Observable.throw(error.json()))
            );
    }

    deleteAccionPreventivaTarea(
        id: number
    ): Observable<AccionPreventivaTareaModel> {
        return this.http
            .delete<AccionPreventivaTareaModel>(
                `${
                    environment.apiUrl
                }${url_Point_Api}/delete-accion-preventiva-tarea/${id}
        `
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    realizarAccionPreventivaTarea(
        data: AccionPreventivaTareaModel
    ): Observable<AccionPreventivaTareaModel> {
        return this.http
            .post<AccionPreventivaTareaModel>(
                `${environment.apiUrl}${url_Point_Api}/realizar-tarea/${
                    data.id
                }`,
                data
            )
            .pipe(
                map(response =>
                    this.accionPreventivaTareaService.transformResponse(
                        response
                    )
                ),
                catchError((error: any) => Observable.throw(error.json()))
            );
    }
}
