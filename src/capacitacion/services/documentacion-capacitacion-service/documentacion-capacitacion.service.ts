import { environment } from "../../../environments/environment";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { CapacitacionAdjuntoModel } from "../../../shared/models/capacitacion-adjunto.model";
import { CapacitacionDocumentoService } from "../../../shared/services/capacitacion-documento/capacitacion-documento-.service";

@Injectable()
export class DocumentacionCapacitacionService {
    constructor(
        private http: HttpClient,
        private capacitacionDocumentoService: CapacitacionDocumentoService
    ) {}
    uploadDocumentos(id: number, data): Observable<CapacitacionAdjuntoModel[]> {
        return this.http
            .post<CapacitacionAdjuntoModel[]>(
                `${
                    environment.apiUrl
                }/capacitacion/capacitacion-documento/upload-documentos/${id}`,
                data
            )
            .pipe(
                map(documentos =>
                    documentos.map(documento =>
                        this.capacitacionDocumentoService.transformResponse(
                            documento
                        )
                    )
                ),
                catchError((error: any) => throwError(error))
            );
    }

    deleteDocumento(id: number): Observable<CapacitacionAdjuntoModel> {
        return this.http
            .get<CapacitacionAdjuntoModel>(
                `${
                    environment.apiUrl
                }/capacitacion/capacitacion-documento/delete-documento/${id}`
            )
            .pipe(catchError((error: any) => throwError(error)));
    }

    downloadDocumento(data: { path: string }) {
        return this.http
            .post(`${environment.apiUrl}/utils/get-adjunto`, data, {
                responseType: "blob"
            })
            .pipe(catchError((error: any) => throwError(error)));
    }
}
