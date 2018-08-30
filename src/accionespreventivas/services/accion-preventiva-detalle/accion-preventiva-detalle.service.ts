import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { AccionPreventivaAdjuntoModel } from "../../../shared/models/accion-preventiva-adjunto.model";
import { environment } from "../../../environments/environment";
import { AccionProcesoModel } from "../../../shared/models/accion-proceso.model";
import { AccionPreventivaTareaAdjuntoModel } from "../../../shared/models/accion-preventiva-tarea-adjunto.model";
import {
    AccionPreventivaTareaAdjuntoService,
    AccionPreventivaTareaService,
    AccionPreventivaService
} from "../../../shared/services";
import { AccionPreventivaTareaTipoModel } from "../../../shared/models/accion-preventiva-tarea-tipo.model";
import { AccionPreventivaTareaModel } from "../../../shared/models/accion-preventiva-tarea.model";
import { AccionPreventivaModel } from "../../../shared/models/accion-preventiva.model";
import { AccionPreventivaAnalisisModel } from "../../../shared/models/accion-preventiva-analisis.model";
import { AccionAnalisisTipoModel } from "../../../shared/models/accion-analisis-tipo.model";
import { AccionPreventivaAnalisisHijo5wsModel } from "../../../shared/models/accion-preventiva-analisis-hijo-5ws";
import { AccionPreventivaAnalisisHijoModel } from "../../../shared/models/accion-preventiva-analisis-hijo.model";
const url_Point_Api = "/acciones/acciones-preventivas/detalle";

@Injectable()
export class AccionPreventivaDetalleService {
    constructor(
        private http: HttpClient,
        private accionPreventivaService: AccionPreventivaService,
        private tareaAdjuntoService: AccionPreventivaTareaAdjuntoService,
        private accionPreventivaTareaService: AccionPreventivaTareaService
    ) {}

    createAccionPreventiva(
        data: AccionPreventivaModel
    ): Observable<AccionPreventivaModel> {
        return this.http
            .post<AccionPreventivaModel>(
                `${
                    environment.apiUrl
                }${url_Point_Api}/create-accion-preventiva`,
                data
            )
            .pipe(
                map(response =>
                    this.accionPreventivaService.transformAccionPreventiva(
                        response
                    )
                ),
                catchError((error: any) => Observable.throw(error.json()))
            );
    }

    updateAccionPreventiva(
        data: AccionPreventivaModel
    ): Observable<AccionPreventivaModel> {
        return this.http
            .post<AccionPreventivaModel>(
                `${
                    environment.apiUrl
                }${url_Point_Api}/update-accion-preventiva/${data.id}`,
                data
            )
            .pipe(
                map(response =>
                    this.accionPreventivaService.transformAccionPreventiva(
                        response
                    )
                ),
                catchError((error: any) => Observable.throw(error.json()))
            );
    }

    deleteAccionPreventiva(
        data: AccionPreventivaModel
    ): Observable<AccionPreventivaModel> {
        return this.http
            .delete<AccionPreventivaModel>(
                `${
                    environment.apiUrl
                }${url_Point_Api}/delete-accion-preventiva/${data.id}`
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    getAccionPreventiva(id: number): Observable<AccionPreventivaModel> {
        return this.http
            .get<AccionPreventivaModel>(
                `${
                    environment.apiUrl
                }${url_Point_Api}/get-accion-preventiva/${id}`
            )
            .pipe(
                map(response =>
                    this.accionPreventivaService.transformAccionPreventiva(
                        response
                    )
                ),
                catchError((error: any) => Observable.throw(error.json()))
            );
    }

    getDocumentosByAccionPreventiva(
        idAccionPreventiva: number
    ): Observable<AccionPreventivaAdjuntoModel[]> {
        return this.http
            .get<AccionPreventivaAdjuntoModel[]>(
                `${
                    environment.apiUrl
                }${url_Point_Api}/get-documentos/${idAccionPreventiva}`
            )
            .pipe(
                map(response =>
                    response.map(documento =>
                        this.transformAccionPreventivaDocumento(documento)
                    )
                ),
                catchError((error: any) => Observable.throw(error.json()))
            );
    }

    downloadAccionPreventivaDocumento(data: { path: string }) {
        return this.http
            .post(`${environment.apiUrl}/utils/get-adjunto`, data, {
                responseType: "blob"
            })
            .pipe(catchError((error: any) => throwError(error)));
    }

    uploadDocumentosByAccionPreventiva(
        idAccionPreventiva: number,
        data
    ): Observable<AccionPreventivaAdjuntoModel[]> {
        return this.http
            .post<AccionPreventivaAdjuntoModel[]>(
                `${
                    environment.apiUrl
                }${url_Point_Api}/upload-documentos/${idAccionPreventiva}`,
                data
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    deleteDocumentoByAccionPreventiva(
        idDocumento: number
    ): Observable<AccionPreventivaAdjuntoModel> {
        return this.http
            .delete<AccionPreventivaAdjuntoModel>(
                `${
                    environment.apiUrl
                }${url_Point_Api}/delete-documento/${idDocumento}`
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

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

    downloadAdjuntoByTarea(data: { path: string }) {
        return this.http
            .post(`${environment.apiUrl}/utils/get-adjunto`, data, {
                responseType: "blob"
            })
            .pipe(catchError((error: any) => throwError(error)));
    }

    uploadAdjuntosByTarea(
        idAccionPreventivaTarea: number,
        data
    ): Observable<AccionPreventivaTareaAdjuntoModel[]> {
        return this.http
            .post<AccionPreventivaTareaAdjuntoModel[]>(
                `${
                    environment.apiUrl
                }${url_Point_Api}/upload-tarea-adjunto/${idAccionPreventivaTarea}`,
                data
            )
            .pipe(
                map(response =>
                    response.map(adjuntoTareaActual =>
                        this.tareaAdjuntoService.transformResponse(
                            adjuntoTareaActual
                        )
                    )
                ),
                catchError((error: any) => throwError(error))
            );
    }

    deleteAdjuntoByTarea(
        data: AccionPreventivaTareaAdjuntoModel
    ): Observable<AccionPreventivaTareaAdjuntoModel> {
        return this.http
            .delete<AccionPreventivaTareaAdjuntoModel>(
                `${environment.apiUrl}${url_Point_Api}/delete-tarea-adjunto/${
                    data.id
                }`
            )
            .pipe(
                map(response =>
                    this.tareaAdjuntoService.transformResponse(response)
                ),
                catchError((error: any) => throwError(error))
            );
    }

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

    getTiposAnalisis(): Observable<AccionAnalisisTipoModel[]> {
        return this.http
            .get<AccionAnalisisTipoModel[]>(
                `${environment.apiUrl}${url_Point_Api}/get-tipos-analisis`
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    crearAnalisisAccionPreventiva(
        data: AccionPreventivaAnalisisModel
    ): Observable<AccionPreventivaAnalisisModel> {
        return this.http
            .post<AccionPreventivaAnalisisModel>(
                `${environment.apiUrl}${url_Point_Api}/create-accion-analisis`,
                data
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    createAnalisisAccionPreventivaHijos(
        data: AccionPreventivaAnalisisHijoModel[]
    ): Observable<AccionPreventivaAnalisisHijoModel[]> {
        return this.http
            .post<AccionPreventivaAnalisisHijoModel[]>(
                `${
                    environment.apiUrl
                }${url_Point_Api}/create-accion-analisis-hijos`,
                data
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    createAnalisisAccionPreventivaHijos5ws(
        data: AccionPreventivaAnalisisHijo5wsModel[]
    ): Observable<AccionPreventivaAnalisisHijo5wsModel[]> {
        return this.http
            .post<AccionPreventivaAnalisisHijo5wsModel[]>(
                `${
                    environment.apiUrl
                }${url_Point_Api}/create-accion-analisis-hijos-5ws`,
                data
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    createOrUpdateAnalisisAccionPreventivaHijos(
        idAccionAnalisisHijos: number,
        data: AccionPreventivaAnalisisHijoModel
    ): Observable<AccionPreventivaAnalisisHijoModel> {
        return this.http
            .post<AccionPreventivaAnalisisHijoModel>(
                `${
                    environment.apiUrl
                }${url_Point_Api}/update-accion-analisis-hijos/${idAccionAnalisisHijos}`,
                data
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    transformAccionPreventivaDocumento(data: AccionPreventivaAdjuntoModel) {
        const accionPreventivaDocumento: AccionPreventivaAdjuntoModel = {
            ...data,
            fecha_carga: data.fecha_carga * 1000
        };

        return accionPreventivaDocumento;
    }
}
