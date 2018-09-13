import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { catchError, map } from "rxjs/operators";

import { environment } from "./../../environments/environment";
import { throwError, Observable } from "rxjs";
import {
    DocumentoService,
    AccionCorrectivaService,
    AccionPreventivaService,
    AccionCorrectivaTareaService,
    AccionPreventivaTareaService,
    AccionCorrectivaTareaAdjuntoService,
    AccionPreventivaTareaAdjuntoService
} from "../../shared/services";
import { AccionCorrectivaModel } from "../../shared/models/accion-correctiva.model";
import { AccionPreventivaModel } from "../../shared/models/accion-preventiva.model";
import { AccionCorrectivaTareaModel } from "../../shared/models/accion-correctiva-tarea.model";
import { AccionPreventivaTareaModel } from "../../shared/models/accion-preventiva-tarea.model";
import { AccionCorrectivaTareaAdjuntoModel } from "../../shared/models/accion-correctiva-tarea-adjunto.model";
import { AccionPreventivaTareaAdjuntoModel } from "../../shared/models/accion-preventiva-tarea-adjunto.model";

@Injectable()
export class BeBandejaEntradaService {
    constructor(
        private http: HttpClient,
        private documentoService: DocumentoService,
        private accionCorrectivaService: AccionCorrectivaService,
        private accionPreventivaService: AccionPreventivaService,
        private accionCorrectivaTareaService: AccionCorrectivaTareaService,
        private accionPreventivaTareaService: AccionPreventivaTareaService,
        private tareaAdjuntoService: AccionCorrectivaTareaAdjuntoService,
        private tareaAdjuntoPreService: AccionPreventivaTareaAdjuntoService
    ) { }

    getDocumentosPorGestionarAsoc(filtros) {
        return this.http
            .post(
                `${
                environment.apiUrl
                }/bandeja-entrada/be-documentos-por-gestionar-asoc`,
                filtros
            )
            .pipe(
                map((response: any) => {
                    return {
                        ...response,
                        documentos: response.documentos.map(documento =>
                            this.documentoService.transformDocumentoResponse(
                                documento
                            )
                        )
                    };
                }),
                catchError(error => throwError(error.json()))
            );
    }

    getDocumentosVigentesAsoc(filtros) {
        return this.http
            .post(
                `${
                environment.apiUrl
                }/bandeja-entrada/be-documentos-vigentes-asoc`,
                filtros
            )
            .pipe(
                map((response: any) => {
                    return {
                        ...response,
                        documentos: response.documentos.map(documento =>
                            this.documentoService.transformDocumentoResponse(
                                documento
                            )
                        )
                    };
                }),
                catchError(error => throwError(error.json()))
            );
    }

    getAccionesCorrectivasAsoc(filtros) {
        return this.http
            .post(
                `${
                environment.apiUrl
                }/bandeja-entrada/be-acciones-correctivas-asoc`,
                filtros
            )
            .pipe(
                map((response: any) => {
                    return {
                        ...response,
                        accionesCorrectivas: response.data.map(acActual =>
                            this.accionCorrectivaService.transformAccionCorrectiva(
                                acActual
                            )
                        )
                    };
                }),
                catchError(error => throwError(error.json()))
            );
    }

    getAccionesPreventivasAsoc(filtros) {
        return this.http
            .post(
                `${
                environment.apiUrl
                }/bandeja-entrada/be-acciones-preventivas-asoc`,
                filtros
            )
            .pipe(
                map((response: any) => {
                    return {
                        ...response,
                        accionesPreventivas: response.data.map(apActual =>
                            this.accionPreventivaService.transformAccionPreventiva(
                                apActual
                            )
                        )
                    };
                }),
                catchError(error => throwError(error.json()))
            );
    }

    getTareasAccionesCorrectivasAsoc(filtros) {
        return this.http
            .post(
                `${
                environment.apiUrl
                }/bandeja-entrada/be-tareas-acciones-correctivas-asoc`,
                filtros
            )
            .pipe(
                map((response: any) => {
                    return {
                        ...response,
                        tareasAccionesCorrectivas: response.data.map(
                            tacActual => {
                                let tacModificada = this.accionCorrectivaTareaService.transformResponse(
                                    tacActual
                                );

                                tacModificada.adjunto = tacModificada.adjunto.map(
                                    tacaActual =>
                                        this.tareaAdjuntoService.transformResponse(
                                            tacaActual
                                        )
                                );

                                return tacModificada;
                            }
                        )
                    };
                }),
                catchError(error => throwError(error.json))
            );
    }

    getTareasAccionesPreventivasAsoc(filtros) {
        return this.http
            .post(
                `${
                environment.apiUrl
                }/bandeja-entrada/be-tareas-acciones-preventivas-asoc`,
                filtros
            )
            .pipe(
                map((response: any) => {
                    return {
                        ...response,
                        tareasAccionesPreventivas: response.data.map(
                            tapActual => {
                                let tapModificada = this.accionCorrectivaTareaService.transformResponse(
                                    tapActual
                                );

                                tapModificada.adjunto = tapModificada.adjunto.map(
                                    tacaActual =>
                                        this.tareaAdjuntoService.transformResponse(
                                            tacaActual
                                        )
                                );

                                return tapModificada;
                            }
                        )
                    };
                }),
                catchError(error => throwError(error.json()))
            );
    }

    downloadAdjuntoByTarea(data: { path: string }) {
        return this.http
            .post(`${environment.apiUrl}/utils/get-adjunto`, data, {
                responseType: "blob"
            })
            .pipe(catchError((error: any) => throwError(error)));
    }

    uploadAdjuntosByTareaAccionCorrectiva(
        idAccionCorrectivaTarea: number,
        data
    ): Observable<AccionCorrectivaTareaAdjuntoModel[]> {
        return this.http
            .post<AccionCorrectivaTareaAdjuntoModel[]>(
                `${
                environment.apiUrl
                }/acciones/accion-correctiva-tarea-adjunto/upload-tarea-adjunto/${idAccionCorrectivaTarea}`,
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
        data: AccionCorrectivaTareaAdjuntoModel
    ): Observable<AccionCorrectivaTareaAdjuntoModel> {
        return this.http
            .delete<AccionCorrectivaTareaAdjuntoModel>(
                `${
                environment.apiUrl
                }/acciones/accion-correctiva-tarea-adjunto/delete-tarea-adjunto/${
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

    realizarAccionCorrectivaTarea(
        data: AccionCorrectivaTareaModel
    ): Observable<AccionCorrectivaTareaModel> {
        return this.http
            .post<AccionCorrectivaTareaModel>(
                `${
                environment.apiUrl
                }/acciones/accion-correctiva-tarea/realizar-tarea/${data.id}`,
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

    downloadAdjuntoByTareaAccionPreventiva(data: { path: string }) {
        return this.http
            .post(`${environment.apiUrl}/utils/get-adjunto`, data, {
                responseType: "blob"
            })
            .pipe(catchError((error: any) => throwError(error)));
    }

    uploadAdjuntosByTareaAccionPreventiva(
        idAccionPreventivaTarea: number,
        data
    ): Observable<AccionPreventivaTareaAdjuntoModel[]> {
        return this.http
            .post<AccionPreventivaTareaAdjuntoModel[]>(
                `${
                environment.apiUrl
                }/acciones/acciones-preventivas/detalle/upload-tarea-adjunto/${idAccionPreventivaTarea}`,
                data
            )
            .pipe(
                map(response =>
                    response.map(adjuntoTareaActual =>
                        this.tareaAdjuntoPreService.transformResponse(
                            adjuntoTareaActual
                        )
                    )
                ),
                catchError((error: any) => throwError(error))
            );
    }

    deleteAdjuntoByTareaAccionPreventiva(
        data: AccionPreventivaTareaAdjuntoModel
    ): Observable<AccionPreventivaTareaAdjuntoModel> {
        return this.http
            .delete<AccionPreventivaTareaAdjuntoModel>(
                `${
                environment.apiUrl
                }/acciones/acciones-preventivas/detalle/delete-tarea-adjunto/${
                data.id
                }`
            )
            .pipe(
                map(response =>
                    this.tareaAdjuntoPreService.transformResponse(response)
                ),
                catchError((error: any) => throwError(error))
            );
    }

    realizarAccionPreventivaTarea(
        data: AccionPreventivaTareaModel
    ): Observable<AccionPreventivaTareaModel> {
        return this.http
            .post<AccionPreventivaTareaModel>(
                `${
                environment.apiUrl
                }/acciones/acciones-preventivas/detalle/realizar-tarea/${
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
    getDocumentosObsoletos(filtros) {
        return this.http
            .post(`${environment.apiUrl}/bandeja-entrada/be-documentos-obsoletos`, filtros)
            .pipe(
                map((response: any) => {
                    return {
                        ...response,
                        documentos: response.documentos
                            .map(documento => this.documentoService.transformDocumentoResponse(documento))
                    }
                }),
                catchError(error => throwError(error.json())));
    }

    getDocumentosProxVencer(filtros) {
        return this.http
            .post(`${environment.apiUrl}/bandeja-entrada/be-documentos-prox-vencer`, filtros)
            .pipe(
                map((response: any) => {
                    return {
                        ...response,
                        documentos: response.documentos
                            .map(documento => this.documentoService.transformDocumentoResponse(documento))
                    }
                }),
                catchError(error => throwError(error.json())));
    }

    getDocumentosVistoBueno(filtros) {
        return this.http
            .post(`${environment.apiUrl}/bandeja-entrada/be-documentos-visto-bueno`, filtros)
            .pipe(
                map((response: any) => {
                    return {
                        ...response,
                        documentos: response.documentos
                            .map(documento => this.documentoService.transformDocumentoResponse(documento))
                    }
                }),
                catchError(error => throwError(error.json())));
    }

    getCapacitacionesLazyAsc(
        data
    ): Observable<{ totalRows: number; data: any[] }> {
        return this.http.post<{ totalRows: number; data: any[] }>(
            `${environment.apiUrl}/capacitacion/get-capacitaciones-lazy-asoc`,
            data
        );
    }
}
