import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { environment } from "../../../environments/environment";
import { map, catchError } from "rxjs/operators";
import { AccionPreventivaAdjuntoModel } from "../../models/accion-preventiva-adjunto.model";

@Injectable()
export class AccionPreventivaAdjuntoService {
    constructor(private http: HttpClient) {}

    getAccionPreventivaAdjunto(id): Observable<AccionPreventivaAdjuntoModel> {
        return this.http
            .get<AccionPreventivaAdjuntoModel>(
                `${environment.apiUrl}/accion-preventiva-adjuntos/${id}`
            )
            .pipe(
                // map(response => this.transformResponse(response)),
                catchError(error => throwError(error))
            );
    }

    transformResponse(
        data: AccionPreventivaAdjuntoModel
    ): AccionPreventivaAdjuntoModel {
        return {
            ...data,
            fecha_carga: data.fecha_carga * 1000
        };
    }
}
