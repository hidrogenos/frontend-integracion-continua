import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AccionPreventivaTareaAdjuntoModel } from "../../models/accion-preventiva-tarea-adjunto.model";
import { Observable, throwError } from "rxjs";
import { environment } from "../../../environments/environment";
import { catchError, map } from "rxjs/operators";

@Injectable()
export class AccionPreventivaTareaAdjuntoService {
    constructor(private http: HttpClient) {}

    getAccionPreventivaTareaAdjunto(
        id
    ): Observable<AccionPreventivaTareaAdjuntoModel> {
        return this.http
            .get<AccionPreventivaTareaAdjuntoModel>(
                `${environment.apiUrl}/accion-preventiva-tarea-adjuntos/${id}`
            )
            .pipe(
                map(response => this.transformResponse(response)),
                catchError(error => throwError(error))
            );
    }

    transformResponse(
        data: AccionPreventivaTareaAdjuntoModel
    ): AccionPreventivaTareaAdjuntoModel {
        return {
            ...data,
            fecha_creacion: data.fecha_creacion * 1000,
            fecha_carga: data.fecha_carga * 1000
        };
    }
}
