import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { AccionPreventivaTareaAdjuntoModel } from "../../shared/models/accion-preventiva-tarea-adjunto.model";
import { AccionPreventivaTareaAdjuntoService } from "../../shared/services";

const Url_Point_Api = "/acciones/accion-preventiva-tarea-adjunto";

@Injectable()
export class AccionesPreventivasTareaAdjuntoService {
    constructor(
        private http: HttpClient,
        private tareaAdjuntoService: AccionPreventivaTareaAdjuntoService
    ) {}

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
                }${Url_Point_Api}/upload-tarea-adjunto/${idAccionPreventivaTarea}`,
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
                `${environment.apiUrl}${Url_Point_Api}/delete-tarea-adjunto/${
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
}
