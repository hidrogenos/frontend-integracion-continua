import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { environment } from "../../environments/environment.prod";
import { AccionPreventivaAdjuntoModel } from "../../shared/models/accion-preventiva-adjunto.model";

const url_Point_Api = "/acciones/accion-preventiva-documento";

@Injectable()
export class AccionesPreventivasDocumentoService {
    constructor(private http: HttpClient) {}

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

    transformAccionPreventivaDocumento(data: AccionPreventivaAdjuntoModel) {
        const accionPreventivaDocumento: AccionPreventivaAdjuntoModel = {
            ...data,
            fecha_carga: data.fecha_carga * 1000
        };

        return accionPreventivaDocumento;
    }
}
