import { environment } from "../../../environments/environment";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { AccionCorrectivaTareaModel } from "../../../shared/models/accion-correctiva-tarea.model";
import { AccionCorrectivaTareaService } from "../../../shared/services";
import { AccionCorrectivaTareaTipoModel } from "../../../shared/models/accion-correctiva-tarea-tipo.model";

const url_Point_Api = "/acciones/accion-correctiva-tarea";

@Injectable()
export class AccionesCorrectivasTareaService {
    constructor(
        private http: HttpClient,
        private accionCorrectivaTareaService: AccionCorrectivaTareaService
    ) {}

    getAccionCorrectivaTareaTipos(): Observable<
        AccionCorrectivaTareaTipoModel[]
    > {
        return this.http
            .get<AccionCorrectivaTareaTipoModel[]>(
                `${
                    environment.apiUrl
                }${url_Point_Api}/get-accion-correctiva-tarea-tipos`
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    createAccionCorrectivaTarea(
        data: AccionCorrectivaTareaModel
    ): Observable<AccionCorrectivaTareaModel> {
        return this.http
            .post<AccionCorrectivaTareaModel>(
                `${
                    environment.apiUrl
                }${url_Point_Api}/create-accion-correctiva-tarea
        `,
                data
            )
            .pipe(
                map(response =>
                    this.accionCorrectivaTareaService.transformResponse(
                        response
                    )
                ),
                catchError((error: any) => Observable.throw(error.json()))
            );
    }

    updateAccionCorrectivaTarea(
        id: number,
        data: AccionCorrectivaTareaModel
    ): Observable<AccionCorrectivaTareaModel> {
        return this.http
            .post<AccionCorrectivaTareaModel>(
                `${
                    environment.apiUrl
                }${url_Point_Api}/update-accion-correctiva-tarea/${id}
        `,
                data
            )
            .pipe(
                map(response =>
                    this.accionCorrectivaTareaService.transformResponse(
                        response
                    )
                ),
                catchError((error: any) => Observable.throw(error.json()))
            );
    }

    deleteAccionCorrectivaTarea(
        id: number
    ): Observable<AccionCorrectivaTareaModel> {
        return this.http
            .delete<AccionCorrectivaTareaModel>(
                `${
                    environment.apiUrl
                }${url_Point_Api}/delete-accion-correctiva-tarea/${id}
        `
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    realizarAccionCorrectivaTarea(
        data: AccionCorrectivaTareaModel
    ): Observable<AccionCorrectivaTareaModel> {
        return this.http
            .post<AccionCorrectivaTareaModel>(
                `${environment.apiUrl}${url_Point_Api}/realizar-tarea/${
                    data.id
                }`,
                data
            )
            .pipe(
                map(response =>
                    this.accionCorrectivaTareaService.transformResponse(
                        response
                    )
                ),
                catchError((error: any) => Observable.throw(error.json()))
            );
    }
}
