import { environment } from "../../../environments/environment";
import { AccionPreventivaModel } from "../../../shared/models/accion-preventiva.model";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { AccionImportanciaModel } from "../../../shared/models/accion-importancia.model";
import { AccionPreventivaEstadoModel } from "../../../shared/models/accion-preventiva-estado.model";
import { MapaProcesoHijoModel } from "../../../shared/models/mapa_proceso_hijo.model";
import { AccionPreventivaService } from "../../../shared/services/accion-preventiva/accion-preventiva.service";

const url_Point_Api = "/acciones/acciones-preventivas/lista";

@Injectable()
export class AccionPreventivaListaService {
    constructor(
        private http: HttpClient,
        private accionPreventivaService: AccionPreventivaService
    ) {}

    getAccionesPreventivas(): Observable<AccionPreventivaModel[]> {
        return this.http
            .get<AccionPreventivaModel[]>(
                `${environment.apiUrl}${url_Point_Api}/get-acciones-preventivas`
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    /**
     * @param data los campos necesarios para hacer un lazy loading
     * @return AccionPreventivaModel[] lista de acciones preventivas preparada para mostrar al usuario
     */
    getLazyAccionesPreventivas(
        data
    ): Observable<{ cantidad: number; data: AccionPreventivaModel[] }> {
        return this.http
            .post<{ cantidad: number; data: AccionPreventivaModel[] }>(
                `${
                    environment.apiUrl
                }${url_Point_Api}/get-async-acciones-preventivas`,
                data
            )
            .pipe(
                map(response => {
                    return {
                        cantidad: response.cantidad,
                        data: response.data.map(accionPreventiva =>
                            this.accionPreventivaService.transformAccionPreventiva(
                                accionPreventiva
                            )
                        )
                    };
                }),
                catchError((error: any) => Observable.throw(error.json()))
            );
    }

    getImportancias(): Observable<AccionImportanciaModel[]> {
        return this.http
            .get<AccionImportanciaModel[]>(
                `${environment.apiUrl}${url_Point_Api}/get-importancias`
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    getProcesos(): Observable<MapaProcesoHijoModel[]> {
        return this.http
            .get<MapaProcesoHijoModel[]>(
                `${environment.apiUrl}${url_Point_Api}/get-procesos`
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    getEstados(): Observable<AccionPreventivaEstadoModel[]> {
        return this.http
            .get<AccionPreventivaEstadoModel[]>(
                `${environment.apiUrl}${url_Point_Api}/get-estados`
            )
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    // /** transforma y ajusta los cambios de un response a una accion preventiva */
    // transformResponseAccion(accionPreventiva: AccionPreventivaModel): AccionPreventivaModel {
    //     return {
    //         ...accionPreventiva,
    //         responsable : accionPreventiva.responsable ?  accionPreventiva.responsable.nombre : null,
    //         accion_estado : accionPreventiva.accion_estado ? accionPreventiva.accion_estado.nombre : null,
    //         importancia: accionPreventiva.importancia ? accionPreventiva.importancia.nombre : null

    //     }
    // }
}
