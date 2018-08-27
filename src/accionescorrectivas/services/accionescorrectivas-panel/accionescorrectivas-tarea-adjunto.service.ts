import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { AccionCorrectivaTareaAdjuntoModel } from "../../../shared/models/accion-correctiva-tarea-adjunto.model";
import { catchError, map } from "rxjs/operators";
import { AccionCorrectivaTareaAdjuntoService } from "../../../shared/services";

const Url_Point_Api = "/acciones/accion-correctiva-tarea-adjunto";

@Injectable()
export class AccionesCorrectivasTareaAdjuntoService {
    constructor(
        private http: HttpClient,
        private tareaAdjuntoService: AccionCorrectivaTareaAdjuntoService
    ) {}

    downloadAdjuntoByTarea(data: { path: string }) {
        return this.http
            .post(`${environment.apiUrl}/utils/get-adjunto`, data, {
                responseType: "blob"
            })
            .pipe(catchError((error: any) => throwError(error)));
    }

    uploadAdjuntosByTarea(
        idAccionCorrectivaTarea: number,
        data
    ): Observable<AccionCorrectivaTareaAdjuntoModel[]> {
        return this.http
            .post<AccionCorrectivaTareaAdjuntoModel[]>(
                `${
                    environment.apiUrl
                }${Url_Point_Api}/upload-tarea-adjunto/${idAccionCorrectivaTarea}`,
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
