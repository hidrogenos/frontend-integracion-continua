import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AccionCorrectivaTareaAdjuntoModel } from "../../models/accion-correctiva-tarea-adjunto.model";
import { Observable, throwError } from "rxjs";
import { environment } from "../../../environments/environment";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class AccionCorrectivaTareaAdjuntoService {
    constructor(private http: HttpClient) {}

    getAccionCorrectivaTareaAdjunto(
        id
    ): Observable<AccionCorrectivaTareaAdjuntoModel> {
        return this.http
            .get<AccionCorrectivaTareaAdjuntoModel>(
                `${environment.apiUrl}/accion-correctiva-tarea-adjuntos/${id}`
            )
            .pipe(
                map(response => this.transformResponse(response)),
                catchError(error => throwError(error))
            );
    }

    transformResponse(
        data: AccionCorrectivaTareaAdjuntoModel
    ): AccionCorrectivaTareaAdjuntoModel {
        return {
            ...data,
            fecha_creacion: data.fecha_creacion * 1000,
            fecha_carga: data.fecha_carga * 1000
        };
    }
}
