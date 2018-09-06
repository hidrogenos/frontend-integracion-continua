import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { CalidadModel } from "../../../shared/models/calidad.model";
import { environment } from "../../../environments/environment";
import { CalidadOrganigramaModel } from "../../../shared/models/calidad-organigrama.model";
import { CalidadMapaProcesoModel } from "../../../shared/models/calidad-mapa-proceso.model";
import { MapaProcesoHijoModel } from "../../../shared/models/mapa_proceso_hijo.model";
import { UsuarioModel } from "../../../shared/models/usuario.model";

@Injectable()
export class NuestraEmpresaService {
    constructor(private http: HttpClient) { }

    getDetalleCalidad(): Observable<CalidadModel> {
        return this.http
            .get<CalidadModel>(
                `${environment.apiUrl}/calidad/get-detalle-calidad`
            )
            .pipe(catchError((error: any) => throwError(error)));
    }

    getUsuariosJefes(): Observable<UsuarioModel[]> {
        return this.http.
            get<UsuarioModel[]>(
                `${environment.apiUrl}/calidad/get-usuarios-jefes`)
            .pipe(
                catchError((error: any) => throwError(error))
            );
    }

    createCargo(data: CalidadOrganigramaModel) {
        return this.http
            .post<CalidadOrganigramaModel>(
                `${environment.apiUrl}/calidad/create-cargo`,
                data
            )
            .pipe(catchError((error: any) => throwError(error)));
    }

    createProceso(
        data: MapaProcesoHijoModel
    ): Observable<MapaProcesoHijoModel> {
        return this.http
            .post<MapaProcesoHijoModel>(
                `${environment.apiUrl}/calidad/create-proceso`,
                data
            )
            .pipe(catchError((error: any) => throwError(error)));
    }

    deleteCargo(id): Observable<CalidadOrganigramaModel> {
        return this.http
            .get<CalidadOrganigramaModel>(
                `${environment.apiUrl}/calidad/delete-cargo/${id}`
            )
            .pipe(catchError((error: any) => throwError(error)));
    }

    deleteProceso(id): Observable<CalidadMapaProcesoModel> {
        return this.http
            .delete<CalidadMapaProcesoModel>(
                `${environment.apiUrl}/calidad/delete-proceso/${id}`
            )
            .pipe(catchError((error: any) => throwError(error.json())));
    }

    updateMapaProcesos(
        id: number,
        data: {
            entrada: string;
            salida: string;
        }
    ): Observable<CalidadMapaProcesoModel> {
        return this.http
            .post<CalidadMapaProcesoModel>(
                `${environment.apiUrl}/calidad/update-mapa-procesos/${id}`,
                data
            )
            .pipe(catchError((error: any) => throwError(error)));
    }

    updateCargo(
        id: number,
        data: CalidadOrganigramaModel
    ): Observable<CalidadOrganigramaModel> {
        return this.http
            .post<CalidadOrganigramaModel>(
                `${environment.apiUrl}/calidad/update-cargo/${id}`,
                data
            )
            .pipe(catchError((error: any) => throwError(error)));
    }

    updateEmpresaNombre(
        id,
        data: { empresa_nombre: string }
    ): Observable<CalidadModel> {
        return this.http
            .post<CalidadModel>(
                `${environment.apiUrl}/calidad/update-empresa-nombre/${id}`,
                data
            )
            .pipe(catchError((error: any) => throwError(error)));
    }

    updateLogoEmpresa(id: number, data: any): Observable<CalidadModel> {
        return this.http
            .post<CalidadModel>(
                `${environment.apiUrl}/calidad/update-logo-empresa/${id}`,
                data
            )
            .pipe(catchError((error: any) => throwError(error)));
    }

    updateManual(id: number, data: any): Observable<CalidadModel> {
        return this.http
            .post<CalidadModel>(
                `${environment.apiUrl}/calidad/update-manual/${id}`,
                data
            )
            .pipe(catchError((error: any) => throwError(error)));
    }

    updateMision(
        id: number,
        data: { mision: string }
    ): Observable<CalidadModel> {
        return this.http
            .post<CalidadModel>(
                `${environment.apiUrl}/calidad/update-mision/${id}`,
                data
            )
            .pipe(catchError((error: any) => throwError(error)));
    }

    updatePolitica(
        id: number,
        data: { politica: string }
    ): Observable<CalidadModel> {
        return this.http
            .post<CalidadModel>(
                `${environment.apiUrl}/calidad/update-politica/${id}`,
                data
            )
            .pipe(catchError((error: any) => throwError(error)));
    }

    updateProceso(
        id: number,
        data: MapaProcesoHijoModel
    ): Observable<MapaProcesoHijoModel> {
        return this.http
            .post<MapaProcesoHijoModel>(
                `${environment.apiUrl}/calidad/update-proceso/${id}`,
                data
            )
            .pipe(catchError((error: any) => throwError(error)));
    }

    updateValores(
        id: number,
        data: { valores: string }
    ): Observable<CalidadModel> {
        return this.http
            .post<CalidadModel>(
                `${environment.apiUrl}/calidad/update-valores/${id}`,
                data
            )
            .pipe(catchError((error: any) => throwError(error)));
    }

    updateVision(
        id: number,
        data: { vision: string }
    ): Observable<CalidadModel> {
        return this.http
            .post<CalidadModel>(
                `${environment.apiUrl}/calidad/update-vision/${id}`,
                data
            )
            .pipe(catchError((error: any) => throwError(error)));
    }

    downloadAdjunto(data: { path: string }) {
        return this.http
            .post(`${environment.apiUrl}/utils/get-adjunto`, data, {
                responseType: "blob"
            })
            .pipe(catchError((error: any) => throwError(error)));
    }
}
