import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

//environment
import { environment } from "../../../environments/environment";
import { catchError, map } from "rxjs/operators";
import { CapacitacionAdjuntoModel } from "../../models/capacitacion-adjunto.model";

@Injectable()
export class CapacitacionDocumentoService {
    constructor(private http: HttpClient) {}
    getDocumentoCapacitacion(id): Observable<CapacitacionAdjuntoModel> {
        return this.http
            .get<CapacitacionAdjuntoModel>(
                `${environment.apiUrl}/capacitacion-documento/${id}`
            )
            .pipe(
                map(response => this.transformResponse(response)),
                catchError(error => throwError(error))
            );
    }

    transformResponse(
        data: CapacitacionAdjuntoModel
    ): CapacitacionAdjuntoModel {
        return {
            ...data,
            fecha_carga: data.fecha_carga * 1000
        };
    }
}
