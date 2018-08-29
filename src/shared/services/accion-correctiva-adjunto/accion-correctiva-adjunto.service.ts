import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { environment } from "../../../environments/environment";
import { map, catchError } from "rxjs/operators";
import { AccionCorrectivaAdjuntoModel } from "../../models/accion-correctiva-adjunto.model";

@Injectable()
export class AccionCorrectivaAdjuntoService {
    constructor(private http: HttpClient) {}

    getAccionCorrectivaAdjunto(id): Observable<AccionCorrectivaAdjuntoModel> {
        return this.http
            .get<AccionCorrectivaAdjuntoModel>(
                `${environment.apiUrl}/accion-correctiva-adjuntos/${id}`
            )
            .pipe(
                // map(response => this.transformResponse(response)),
                catchError(error => throwError(error))
            );
    }

    transformResponse(
        data: AccionCorrectivaAdjuntoModel
    ): AccionCorrectivaAdjuntoModel {
        return {
            ...data,
            fecha_carga: data.fecha_carga * 1000
        };
    }
}
